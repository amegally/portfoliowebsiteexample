const fs = require('fs');
const path = require('path');

// Load projects data
let projectsData = {};
try {
    const projectsFile = fs.readFileSync(path.join(__dirname, '..', 'data', 'projects.json'), 'utf8');
    projectsData = JSON.parse(projectsFile);
} catch (error) {
    console.error('Error loading projects:', error);
    projectsData = { projects: [] };
}

// Helper function to read and inject partials and data
const processTemplate = async (html, data = {}) => {
    try {
        const headerContent = await fs.promises.readFile(path.join(__dirname, '..', 'views', 'partials', 'header.html'), 'utf8');
        const footerContent = await fs.promises.readFile(path.join(__dirname, '..', 'views', 'partials', 'footer.html'), 'utf8');
        
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
                        onerror="this.onerror=null; this.src='/images/placeholder.jpg';"
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

exports.handler = async (event, context) => {
    try {
        const path_info = event.path.replace('/.netlify/functions/server', '');

        // Handle CSS files
        if (path_info.startsWith('/css/')) {
            const filePath = path.join(__dirname, '..', 'public', path_info);
            try {
                const content = await fs.promises.readFile(filePath, 'utf8');
                return {
                    statusCode: 200,
                    headers: { 'Content-Type': 'text/css' },
                    body: content
                };
            } catch (error) {
                console.error('Error serving CSS file:', error);
                return { statusCode: 404, body: '404 Not Found' };
            }
        }

        // Handle images
        if (path_info.startsWith('/images/')) {
            const filePath = path.join(__dirname, '..', 'public', path_info);
            try {
                const content = await fs.promises.readFile(filePath);
                const ext = path.extname(filePath);
                const contentType = getMimeType(ext);
                return {
                    statusCode: 200,
                    headers: { 'Content-Type': contentType },
                    body: content.toString('base64'),
                    isBase64Encoded: true
                };
            } catch (error) {
                console.error('Error serving image:', error);
                return { statusCode: 404, body: '404 Not Found' };
            }
        }

        let filePath;
        let templateData = {};

        // Route handling
        switch(path_info) {
            case '':
            case '/':
                filePath = path.join(__dirname, '..', 'views', 'index.html');
                templateData.PROJECTS = generateProjectsHtml(projectsData.projects);
                break;
            case '/about':
                filePath = path.join(__dirname, '..', 'views', 'about.html');
                break;
            case '/contact':
                filePath = path.join(__dirname, '..', 'views', 'contact.html');
                break;
            default:
                return { statusCode: 404, body: '404 Not Found' };
        }

        // Read and process template files
        const content = await fs.promises.readFile(filePath, 'utf8');
        const processedContent = await processTemplate(content, templateData);
        
        return {
            statusCode: 200,
            headers: { 'Content-Type': 'text/html' },
            body: processedContent
        };

    } catch (error) {
        console.error('Server error:', error);
        return {
            statusCode: 500,
            body: '500 Internal Server Error'
        };
    }
}; 