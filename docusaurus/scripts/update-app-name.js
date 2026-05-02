const fs = require('node:fs');
const path = require('node:path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env'), override: false });

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const APP_NAME = process.env.APP_NAME;
const CURRENT_APP_NAME = process.env.CURRENT_APP_NAME;

const getCandidateCurrentNames = () => {
    const candidates = [CURRENT_APP_NAME, 'AI Core'].filter(Boolean);
    const unique = [...new Set(candidates)];
    return APP_NAME ? unique.filter((name) => name !== APP_NAME) : unique;
};

const updateHeadings = (content, fromName, toName) => {
    const appNamePattern = new RegExp(`^(#+.*)\\b${escapeRegExp(fromName)}\\b(.*)$`, 'gm');
    return content.replace(appNamePattern, (line) => line.replace(fromName, toName));
};

const updateFileContent = (folderPath) =>{
    fs.readdirSync(folderPath).forEach((file) => {
        const filePath = path.join(folderPath, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            updateFileContent(filePath);
            return;
        }

        const fileContent = fs.readFileSync(filePath, 'utf-8');

            if(!APP_NAME){
                return;
            }

            const candidateCurrentNames = getCandidateCurrentNames();
            let updatedContent = fileContent;
            candidateCurrentNames.forEach((fromName) => {
                updatedContent = updateHeadings(updatedContent, fromName, APP_NAME);
            });

        if(updatedContent !== fileContent){
            fs.writeFileSync(filePath, updatedContent, 'utf-8');
        }
    });
}
const appNameUpdate = ()=>{
const appFolders = [
    "Advanced Installation",
    "Building Apps",
    "Getting Started",
    "Integrating with SEMOSS",
    "Platform Navigation",
    "Cookbook Recipes"
];

    appFolders.forEach((folder)=>{
        const folderPath = path.join(__dirname, '..', 'docs', folder);
        updateFileContent(folderPath);
    });
}

appNameUpdate();
console.log('App Name Update completed, {}', APP_NAME);