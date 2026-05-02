#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';
import { generateReactorApiMetadata, createReactorFileTemplate } from './src/components/ReactorDocgen/yamlTemplateUtils.js';

interface ReactorInfo {
  id: string;
  title: string;
  description: string;
  requiredKeys: string[];
  optionalKeys: string[];
  usage: string;
}

/**
 * Parses an existing reactor MDX file to extract reactor information
 */
function parseExistingReactorFile(filePath: string): ReactorInfo | null {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Extract frontmatter
    const frontMatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---/);
    if (!frontMatterMatch) {
      console.warn(`No frontmatter found in ${filePath}`);
      return null;
    }
    
    const frontMatter = yaml.load(frontMatterMatch[1]) as any;
    
    // Extract required keys
    const requiredKeysMatch = content.match(/## Required Keys\s*((?:- \*\*.*?\*\*\s*)+)/);
    const requiredKeys: string[] = [];
    if (requiredKeysMatch) {
      const keys = requiredKeysMatch[1].match(/\*\*(.*?)\*\*/g);
      if (keys) {
        requiredKeys.push(...keys.map(key => key.replace(/\*\*/g, '')));
      }
    }

    // Extract optional keys
    const optionalKeysMatch = content.match(/## Optional Keys\s*((?:- \*\*.*?\*\*\s*)+)/);
    const optionalKeys: string[] = [];
    if (optionalKeysMatch) {
      const keys = optionalKeysMatch[1].match(/\*\*(.*?)\*\*/g);
      if (keys) {
        optionalKeys.push(...keys.map(key => key.replace(/\*\*/g, '')));
      }
    }

    // Extract usage
    const usageMatch = content.match(/## Usage\s*```javascript\s*(.*?)\s*```/s);
    const usage = usageMatch ? usageMatch[1].trim() : '';

    return {
      id: frontMatter.id || path.basename(filePath, '.mdx'),
      title: frontMatter.title || frontMatter.sidebar_label || '',
      description: frontMatter.description || '',
      requiredKeys,
      optionalKeys,
      usage
    };
  } catch (error) {
    console.error(`Error parsing ${filePath}:`, error);
    return null;
  }
}

/**
 * Converts an existing reactor file to use the new compressed API format
 */
async function convertReactorFile(inputPath: string, outputPath?: string): Promise<void> {
  console.log(`Converting ${inputPath}...`);
  
  const reactorInfo = parseExistingReactorFile(inputPath);
  if (!reactorInfo) {
    console.error(`Failed to parse reactor information from ${inputPath}`);
    return;
  }
  
  console.log(`Parsed reactor info:`, {
    id: reactorInfo.id,
    title: reactorInfo.title,
    requiredKeys: reactorInfo.requiredKeys,
    optionalKeys: reactorInfo.optionalKeys
  });
  
  // Generate compressed API metadata
  const apiMetadata = await generateReactorApiMetadata(reactorInfo);
  if (!apiMetadata) {
    console.error(`Failed to generate API metadata for ${reactorInfo.title}`);
    return;
  }
  
  console.log(`Generated compressed API metadata (${apiMetadata.length} characters)`);
  
  // Create the new file template
  const fileContent = createReactorFileTemplate(reactorInfo, apiMetadata);
  
  // Determine output path
  const finalOutputPath = outputPath || inputPath.replace('.mdx', '-updated.mdx');
  
  // Write the file
  fs.writeFileSync(finalOutputPath, fileContent, 'utf-8');
  console.log(`✅ Converted reactor file saved to: ${finalOutputPath}`);
}

/**
 * Batch convert all reactor files in a directory
 */
async function convertReactorDirectory(inputDir: string, outputDir?: string): Promise<void> {
  const files = fs.readdirSync(inputDir);
  const reactorFiles = files.filter(file => file.endsWith('.mdx') && file.startsWith('prerna-reactor-'));
  
  console.log(`Found ${reactorFiles.length} reactor files to convert`);
  
  for (const file of reactorFiles) {
    const inputPath = path.join(inputDir, file);
    const outputPath = outputDir ? path.join(outputDir, file) : undefined;
    
    try {
      await convertReactorFile(inputPath, outputPath);
    } catch (error) {
      console.error(`Error converting ${file}:`, error);
    }
  }
}

/**
 * Create a sample reactor file from scratch
 */
async function createSampleReactor(outputPath: string): Promise<void> {
  const sampleInfo: ReactorInfo = {
    id: 'sample-reactor',
    title: 'SampleReactor',
    description: 'A sample reactor for demonstration purposes',
    requiredKeys: ['input', 'mode'],
    optionalKeys: ['format', 'verbose'],
    usage: 'SampleReactor(input=[<input>], mode=[<mode>], format=[<format>], verbose=[<verbose>])'
  };
  
  const apiMetadata = await generateReactorApiMetadata(sampleInfo);
  const fileContent = createReactorFileTemplate(sampleInfo, apiMetadata);
  
  fs.writeFileSync(outputPath, fileContent, 'utf-8');
  console.log(`✅ Sample reactor file created: ${outputPath}`);
}

// CLI interface
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log(`
Usage:
  node generateReactors.js convert <input-file> [output-file]
  node generateReactors.js convert-dir <input-directory> [output-directory]
  node generateReactors.js sample <output-file>

Examples:
  node generateReactors.js convert docs/Reactors/prerna-reactor-model-llm.mdx
  node generateReactors.js convert-dir docs/Reactors/
  node generateReactors.js sample sample-reactor.mdx
`);
    return;
  }
  
  const command = args[0];
  
  switch (command) {
    case 'convert':
      if (args.length < 2) {
        console.error('Please provide an input file path');
        return;
      }
      await convertReactorFile(args[1], args[2]);
      break;
      
    case 'convert-dir':
      if (args.length < 2) {
        console.error('Please provide an input directory path');
        return;
      }
      await convertReactorDirectory(args[1], args[2]);
      break;
      
    case 'sample':
      if (args.length < 2) {
        console.error('Please provide an output file path');
        return;
      }
      await createSampleReactor(args[1]);
      break;
      
    default:
      console.error(`Unknown command: ${command}`);
      break;
  }
}

if (require.main === module) {
  main().catch(console.error);
}

export { convertReactorFile, convertReactorDirectory, createSampleReactor };