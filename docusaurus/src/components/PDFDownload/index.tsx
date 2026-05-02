import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './styles.css';

interface PDFDownloadProps {
  className?: string;
}

const DownloadIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7,10 12,15 17,10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const PDFDownload: React.FC<PDFDownloadProps> = ({ className = '' }) => {
  const handleDownloadPDF = async () => {
    try {
      // Find the main content area - be more specific about Docusaurus structure
      const element = document.querySelector('[role="main"]') || 
                    document.querySelector('main') || 
                    document.querySelector('.main-wrapper') || 
                    document.querySelector('article') ||
                    document.body;
      
      if (!element) {
        console.error('Could not find main content area');
        return;
      }

      // Show loading state
      const button = document.querySelector('.pdf-download-btn') as HTMLButtonElement;
      if (button) {
        button.disabled = true;
        button.textContent = 'Generating PDF...';
      }

      // Store original styles and scroll position
      const originalScrollX = window.scrollX;
      const originalScrollY = window.scrollY;
      const originalOverflow = document.body.style.overflow;
      
      // Temporarily scroll to top and prevent scrolling during capture
      window.scrollTo(0, 0);
      document.body.style.overflow = 'visible';

      // Wait for any dynamic content to load
      await new Promise(resolve => setTimeout(resolve, 500));

      // Get computed styles to preserve theme
      const computedStyle = window.getComputedStyle(document.documentElement);
      const backgroundColor = computedStyle.getPropertyValue('--ifm-background-color') || 
                            computedStyle.getPropertyValue('background-color') || 
                            '#ffffff';

      // Generate canvas from the content with improved options
      const canvas = await html2canvas(element as HTMLElement, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        allowTaint: false,
        backgroundColor: backgroundColor,
        scrollX: 0,
        scrollY: 0,
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
        width: element.scrollWidth,
        height: element.scrollHeight,
        ignoreElements: (el) => {
          // Ignore elements that shouldn't be in PDF
          return el.classList.contains('pdf-download-btn') ||
                 el.classList.contains('navbar') ||
                 el.classList.contains('docusaurus-highlight-code-line') ||
                 el.tagName === 'SCRIPT' ||
                 el.tagName === 'NOSCRIPT';
        },
        onclone: (clonedDoc) => {
          // Ensure all fonts are loaded in the cloned document
          const clonedElement = clonedDoc.querySelector('[role="main"]') || 
                               clonedDoc.querySelector('main') || 
                               clonedDoc.querySelector('.main-wrapper') || 
                               clonedDoc.querySelector('article');
          
          if (clonedElement) {
            // Apply inline styles to preserve appearance
            const htmlElement = clonedElement as HTMLElement;
            htmlElement.style.maxWidth = 'none';
            htmlElement.style.margin = '0';
            htmlElement.style.padding = '20px';
            
            // Ensure code blocks are properly styled
            const codeBlocks = clonedElement.querySelectorAll('pre, code');
            codeBlocks.forEach((block, index) => {
              const originalBlock = element.querySelector(`pre:nth-of-type(${index + 1})`) as HTMLElement ||
                                   element.querySelector(`code:nth-of-type(${index + 1})`) as HTMLElement;
              if (originalBlock) {
                const styles = window.getComputedStyle(originalBlock);
                (block as HTMLElement).style.cssText = styles.cssText;
              }
            });
          }
        }
      });

      // Restore original scroll position and overflow
      document.body.style.overflow = originalOverflow;
      window.scrollTo(originalScrollX, originalScrollY);

      // Create PDF with better sizing
      const imgData = canvas.toDataURL('image/png', 0.95);
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      // Calculate dimensions to fit content properly on PDF
      const pdfWidth = 210; // A4 width in mm
      const pdfHeight = 297; // A4 height in mm
      const margin = 10; // 10mm margin
      const contentWidth = pdfWidth - (margin * 2);
      const contentHeight = pdfHeight - (margin * 2);
      
      const imgWidth = contentWidth;
      const imgHeight = (canvas.height * contentWidth) / canvas.width;
      
      let yPosition = margin;
      let remainingHeight = imgHeight;
      let sourceY = 0;
      
      // Add content page by page
      while (remainingHeight > 0) {
        const pageHeight = Math.min(remainingHeight, contentHeight);
        const sourceHeight = (pageHeight * canvas.width) / contentWidth;
        
        // Create a temporary canvas for this page
        const pageCanvas = document.createElement('canvas');
        const pageCtx = pageCanvas.getContext('2d');
        
        if (!pageCtx) {
          throw new Error('Could not get canvas context');
        }
        
        pageCanvas.width = canvas.width;
        pageCanvas.height = sourceHeight;
        
        // Draw the portion of the image for this page
        pageCtx.drawImage(canvas, 0, sourceY, canvas.width, sourceHeight, 0, 0, canvas.width, sourceHeight);
        
        const pageImgData = pageCanvas.toDataURL('image/png', 0.95);
        
        if (sourceY > 0) {
          pdf.addPage();
        }
        
        pdf.addImage(pageImgData, 'PNG', margin, yPosition, imgWidth, pageHeight);
        
        sourceY += sourceHeight;
        remainingHeight -= pageHeight;
        yPosition = margin; // Reset Y position for subsequent pages
      }

      // Get page title for filename
      const pageTitle = document.title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
      const filename = `${pageTitle}_${new Date().toISOString().split('T')[0]}.pdf`;

      // Download the PDF
      pdf.save(filename);

      // Reset button state
      if (button) {
        button.disabled = false;
        button.innerHTML = '<svg class="download-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7,10 12,15 17,10" /><line x1="12" y1="15" x2="12" y2="3" /></svg> Download PDF';
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      
      // Restore styles in case of error
      document.body.style.overflow = '';
      
      // Reset button state on error
      const button = document.querySelector('.pdf-download-btn') as HTMLButtonElement;
      if (button) {
        button.disabled = false;
        button.innerHTML = '<svg class="download-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7,10 12,15 17,10" /><line x1="12" y1="15" x2="12" y2="3" /></svg> Download PDF';
      }
    }
  };

  return (
    <button
      className={`pdf-download-btn ${className}`}
      onClick={handleDownloadPDF}
      title="Download this page as PDF"
      type="button"
    >
      <DownloadIcon className="download-icon" />
      Download
    </button>
  );
};

export default PDFDownload;
