import chokidar from 'chokidar';
import path from 'path';
import { promises as fs } from 'fs';

// Base directory (v1)
const baseDir = path.resolve(__dirname, '../v1');

// Directories to watch with their barrel files
const directories = {
    config: path.resolve(baseDir, 'config'),
    controllers: path.resolve(baseDir, 'controllers'),
    middlewares: path.resolve(baseDir, 'middlewares'),
    routes: path.resolve(baseDir, 'routes'),
    utils: path.resolve(baseDir, 'utils'),
};

// Function to update a barrel file for a given directory
async function updateBarrelFile(dirPath: string, barrelFile: string): Promise<void> {
    try {
        // Read all .ts files in the directory
        const files = await fs.readdir(dirPath);
        const tsFiles = files.filter(
            file => file.endsWith('.ts') && file !== 'index.ts'
        );

        // Generate export statements
        const exports = tsFiles
            .map(file => {
                const moduleName = path.basename(file, '.ts');
                return `export * from "./${moduleName}";`;
            })
            .join('\n');

        // Write to the barrel file
        const content = `${exports}\n`;
        await fs.writeFile(barrelFile, content, 'utf8');
        // console.log(`Updated ${barrelFile} with new exports`);
    } catch (error) {
        console.error(`Error updating barrel file ${barrelFile}:`, error);
    }
}

// Initialize watcher for all directories
const watcher = chokidar.watch(Object.values(directories), {
    ignored: /(^|[/\\])\..|index\.ts/, // Ignore dotfiles and index.ts
    persistent: true,
    ignoreInitial: false, // Process existing files on start
});

// Log events and update the corresponding barrel file
watcher
    .on('all', (event: string, filePath: string) => {
        // console.log(`Event: ${event}, Path: ${filePath}`);
        if (
            (event === 'add' || event === 'unlink') && 
            filePath.endsWith('.ts') && 
            !filePath.includes('index.ts')
        ) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            for (const [_key, dirPath] of Object.entries(directories)) {
                if (filePath.startsWith(dirPath)) {
                    const barrelFile = path.join(dirPath, 'index.ts');
                    updateBarrelFile(dirPath, barrelFile);
                    break;
                }
            }
        }
    });

// Keep process alive
process.stdin.resume();