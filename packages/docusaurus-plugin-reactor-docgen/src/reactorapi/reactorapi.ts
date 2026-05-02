import * as dotenv from "dotenv";
import * as path from "path";
import * as zlib from "zlib";
import { AllReactors } from "./types";

// Load environment variables from .env file
dotenv.config({ path: './.env.local' });
dotenv.config({ path: './.env' });

// Helper function to determine if a string is a URL or file path
function isUrl(str: string): boolean {
    console.log('Checking if string is a URL:', str);
    return str.startsWith('http://') || str.startsWith('https://');
}

// Helper function to resolve file paths
function resolveFilePath(filePath: string): string {
    if (path.isAbsolute(filePath)) {
        return filePath;
    }
    // For relative paths, resolve them relative to the current working directory
    // Since the command runs from the docusaurus directory, relative paths should be resolved from there
    return path.resolve(filePath);
}

export async function fetchReactorDetails(reactorsResourceLocator: string): Promise<AllReactors> {
    // Check if reactorsResourceLocator is a file path or a URL
    const isUrlPath = isUrl(reactorsResourceLocator);
    
    if (!isUrlPath) {
        console.log('Reading reactor details from static file:', reactorsResourceLocator);
        try {
            const resolvedPath = resolveFilePath(reactorsResourceLocator);
            console.log('Resolved file path:', resolvedPath);
            return await readReactorDetailsFromFile(resolvedPath);
        } catch (error) {
            console.error('Error reading reactor details from file:', error);
            return {
                error: []
            };
        }
    }

    // Original URL-based fetching logic
    try {
        const username = process.env.SEMOSS_USERNAME;
        const password = process.env.SEMOSS_PASSWORD;

        if (!username || !password) {
            throw new Error('SEMOSS_USERNAME and SEMOSS_PASSWORD environment variables are required');
        }

        console.log('Using username:', username);
        const credentials = Buffer.from(`${username}:${password}`).toString('base64');
        console.log('calling fetchReactorDetails with URL:', `${reactorsResourceLocator}/api/engine/reactors/all`);

        const response = await fetch(`${reactorsResourceLocator}/api/engine/reactors/all`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${credentials}`,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Fetched reactor details:', data);

        /* Return the full response instead of just the output
        return {
            name: data.name || '',
            description: data.description || '',
            requiredKeys: data.requiredKeys || [],
            optionalKeys: data.optionalKeys || [],
            usage: data.usage || '',
            status: 'success'
        };*/
        return data;
    } catch (error) {
        console.error('Error fetching reactor details:', error);
        return {
            error: []
        };
    }
}


export async function readReactorDetailsFromFile(filePath: string): Promise<AllReactors> {
    const fs = await import('fs/promises');
    const fileContents = await fs.readFile(filePath, 'utf-8');
    const data: AllReactors = JSON.parse(fileContents);
    return data;
}



export async function fetchReactorNames(reactorsResourceLocator: string): Promise<any> {
    // Check if reactorsResourceLocator is a file path or a URL
    const isUrlPath = isUrl(reactorsResourceLocator);
    
    if (!isUrlPath) {
        console.log('Reading reactor names from static file:', reactorsResourceLocator);
        try {
            const resolvedPath = resolveFilePath(reactorsResourceLocator);
            console.log('Resolved file path:', resolvedPath);
            const reactorData = await readReactorDetailsFromFile(resolvedPath);
            // Extract reactor names from the static file data
            const reactorNames: string[] = [];
            for (const [category, reactorList] of Object.entries(reactorData)) {
                if (Array.isArray(reactorList)) {
                    reactorList.forEach(reactor => {
                        if (reactor.name) {
                            reactorNames.push(reactor.name);
                        }
                    });
                }
            }
            return reactorNames;
        } catch (error) {
            console.error('Error reading reactor names from file:', error);
            throw error;
        }
    }

    // Original URL-based fetching logic
    try {
        const username = process.env.SEMOSS_USERNAME;
        const password = process.env.SEMOSS_PASSWORD;

        if (!username || !password) {
            throw new Error('SEMOSS_USERNAME and SEMOSS_PASSWORD environment variables are required');
        }

        console.log('Using username:', username);
        const credentials = Buffer.from(`${username}:${password}`).toString('base64');
        console.log('calling fetchReactorData with URL:', `${reactorsResourceLocator}/api/engine/runPixel`);

        const response = await fetch(`${reactorsResourceLocator}/api/engine/runPixel`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${credentials}`,
            },
            body: 'expression=HelpJson()'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.pixelReturn[0].output;
    } catch (error) {
        console.error('Error fetching reactor data:', error);
        throw error;
    }
}

