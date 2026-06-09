const fs = require('fs');
const path = require('path');

const outputFile = 'mon_projet_complet.txt';
if (fs.existsSync(outputFile)) fs.unlinkSync(outputFile);

// On liste les dossiers à ignorer STRICTEMENT pour que OneDrive ne bloque pas
const ignoredDirs = ['node_modules', '.next', '.git', 'dist', 'build'];
const allowedExtensions = ['.tsx', '.ts', '.jsx', '.js', '.json', '.css', '.prisma'];
const ignoredFiles = ['package-lock.json', 'yarn.lock', '.env', outputFile, 'dump.js'];

function pipeline(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        
        if (stat && stat.isDirectory()) {
            // Si le dossier est à ignorer, on n'entre même pas dedans !
            if (!ignoredDirs.includes(file)) {
                results = results.concat(pipeline(fullPath));
            }
        } else {
            const ext = path.extname(file);
            if (allowedExtensions.includes(ext) && !ignoredFiles.includes(file)) {
                results.push(fullPath);
            }
        }
    });
    return results;
}

console.log("🔍 Analyse des fichiers en cours (sans toucher à node_modules)...");
const files = pipeline('.');
let outputContent = '';

files.forEach(file => {
    try {
        const content = fs.readFileSync(file, 'utf8');
        outputContent += `\n\n// ==================================================\n`;
        outputContent += `// FICHIER : ${file}\n`;
        outputContent += `// ==================================================\n\n`;
        outputContent += content;
    } catch (e) {
        // En cas de fichier verrouillé par OneDrive, on passe la suite sans crash
    }
});

fs.writeFileSync(outputFile, outputContent);
console.log(`🎉 Terminé ! Tout ton code est dans le fichier : ${outputFile}`);