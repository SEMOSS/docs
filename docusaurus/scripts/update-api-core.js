const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
//const CURRENT_APP_NAME = process.env.CURRENT_APP_NAME || 'AI Core';
const serverUrl = process.env.MONOLITH_API_URL || 'http://localhost:8080';

// Function to update API servers in .mdx files
const updateApiServers = (folderPath) => {
    const files = fs.readdirSync(folderPath);
    const folderName = path.basename(folderPath);
    
    // Check if current folder is 'ai-core-api'
    const isApiCoreFolder = folderName === 'ai-core-api';
    
    for (const file of files) {
        const filePath = path.join(folderPath, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
            // Recurse into subdirectories to find 'ai-core-api' folders
            updateApiServers(filePath);
            continue;
        }
        
        // Only process .api.mdx files if we're inside an 'ai-core-api' folder
        if (!isApiCoreFolder || !file.endsWith('.api.mdx')) {
            continue;
        }
        
        let fileContent = fs.readFileSync(filePath, 'utf-8');
        
        // Match the api field in YAML frontmatter
        const apiPattern = /(api:\s*)(\{.*?\})\n/s;
        const match = fileContent.match(apiPattern);
        
        if (match && match[2]) {
            try {
                // Parse the JSON object
                const apiObject = JSON.parse(match[2]);
                
                // Update the first server URL if servers array exists
                if (apiObject.servers && apiObject.servers.length > 0) {
                    apiObject.servers[0].url = serverUrl + '/Monolith/api';
                    
                    // Convert back to JSON string (compact format)
                    const updatedApiJson = JSON.stringify(apiObject);
                    
                    // Replace in file content
                    fileContent = fileContent.replace(match[2], updatedApiJson);
                    
                    // Write back to file
                    fs.writeFileSync(filePath, fileContent, 'utf-8');
                    console.log(`Updated: ${filePath}`);
                }
            } catch (error) {
                console.error(`Error processing ${filePath}:`, error.message);
            }
        }
    }
};

const updateFileContent = (folderPath) =>{
        fs.readdirSync(folderPath).map(file => {
                const stat = fs.statSync(path.join(folderPath, file));
                if( stat.isDirectory()){
                    updateFileContent( path.join(folderPath, file));
                return;
            }
            const fileContent = fs.readFileSync(path.join(folderPath, file), 'utf-8');

         
        }
    );
}
const appNameUpdate = ()=>{
const appFolders = [
    "developer"
];

    appFolders.forEach((folder)=>{
        const folderPath = path.join(__dirname, '..', 'docs', folder);
        updateFileContent(folderPath);
    });
}

// Main execution
console.log('Starting API Core update...');
console.log(`Server URL from env: ${serverUrl}`);

// Update API servers in all .api.mdx files in docs directory
const docsPath = path.join(__dirname, '..', 'docs');
console.log('Updating API servers in docs directory...');
updateApiServers(docsPath);

// Update API servers in versioned_docs directory
const versionedDocsPath = path.join(__dirname, '..', 'versioned_docs');
if (fs.existsSync(versionedDocsPath)) {
    console.log('Updating API servers in versioned_docs directory...');
    updateApiServers(versionedDocsPath);
}

console.log('API servers update completed');

// Update app name in markdown files
//appNameUpdate();
console.log('Server Url update completed: {}', serverUrl);