const http = require('http');
const fs = require('fs');
const path = require('path');

// Load projects data
let projectsData = {};
try {
    const projectsFile = fs.readFileSync(path.join(__dirname, 'data', 'projects.json'), 'utf8');
    projectsData = JSON.parse(projectsFile);
} catch (error) {
    console.error('Error loading projects:', error);
    projectsData = { projects: [] };
}

// Helper function to read and inject partials and data
const processTemplate = async (html, data = {}) => {
    try {
        const headerContent = await fs.promises.readFile(path.join(__dirname, 'views', 'partials', 'header.html'), 'utf8');
        const footerContent = await fs.promises.readFile(path.join(__dirname, 'views', 'partials', 'footer.html'), 'utf8');
        
        // Replace template variables
        let processedHtml = html
            .replace('{{HEADER}}', headerContent)
            .replace('{{FOOTER}}', footerContent);

        // Replace any data placeholders
        Object.entries(data).forEach(([key, value]) => {
            processedHtml = processedHtml.replace(`{{${key}}}`, value);
        });

        return processedHtml;
    } catch (error) {
        console.error('Error processing template:', error);
        return html;
    }
};

// MIME type helper
const getMimeType = (ext) => {
    const mimeTypes = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'text/javascript',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.gif': 'image/gif',
        '.json': 'application/json'
    };
    return mimeTypes[ext] || 'text/plain';
};

const server = http.createServer(async (req, res) => {
    try {
        // Handle favicon.ico request
        if (req.url === '/favicon.ico') {
            res.writeHead(204);
            res.end();
            return;
        }

        // Handle CSS files
        if (req.url.startsWith('/css/')) {
            const filePath = path.join(__dirname, 'public', req.url);
            try {
                const content = await fs.promises.readFile(filePath);
                res.writeHead(200, { 'Content-Type': 'text/css' });
                res.end(content);
                return;
            } catch (error) {
                console.error('Error serving CSS file:', error);
                res.writeHead(404);
                res.end('404 Not Found');
                return;
            }
        }

        // Handle images
        if (req.url.startsWith('/images/')) {
            const filePath = path.join(__dirname, 'public', req.url);
            try {
                const content = await fs.promises.readFile(filePath);
                const ext = path.extname(filePath);
                const contentType = getMimeType(ext);
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content);
                return;
            } catch (error) {
                console.error('Error serving image:', error);
                res.writeHead(404);
                res.end('404 Not Found');
                return;
            }
        }

        let filePath;
        let templateData = {};

        // Route handling
        switch(req.url) {
            case '/':
                filePath = path.join(__dirname, 'views', 'index.html');
                templateData.PROJECTS = generateProjectsHtml(projectsData.projects);
                break;
            case '/about':
                filePath = path.join(__dirname, 'views', 'about.html');
                break;
            case '/contact':
                filePath = path.join(__dirname, 'views', 'contact.html');
                break;
            default:
                res.writeHead(404);
                res.end('404 Not Found');
                return;
        }

        // Read and process template files
        const content = await fs.promises.readFile(filePath, 'utf8');
        const processedContent = await processTemplate(content, templateData);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(processedContent);

    } catch (error) {
        console.error('Server error:', error);
        res.writeHead(500);
        res.end('500 Internal Server Error');
    }
});

// Helper function to generate HTML for projects
function generateProjectsHtml(projects) {
    return projects
        .filter(project => project.featured)
        .map(project => `
            <article class="project-card" data-id="${project.id}">
                <div class="project-image">
                    <img 
                        src="${project.image}" 
                        alt="${project.title}"
                        onerror="this.onerror=null; this.src='/public/images/placeholder.jpg';"
                        loading="lazy"
                    >
                </div>
                <div class="project-content">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-technologies">
                        ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                </div>
            </article>
        `).join('');
}

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
}); 