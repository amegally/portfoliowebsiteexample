const fs = require('fs').promises;
const path = require('path');

// Load projects data
async function loadProjects() {
    const projectsFile = await fs.readFile(path.join(__dirname, 'data', 'projects.json'), 'utf8');
    return JSON.parse(projectsFile);
}

// Helper function to read and inject partials and data
async function processTemplate(html, data = {}) {
    const headerContent = await fs.readFile(path.join(__dirname, 'views', 'partials', 'header.html'), 'utf8');
    const footerContent = await fs.readFile(path.join(__dirname, 'views', 'partials', 'footer.html'), 'utf8');
    
    // Replace template variables
    let processedHtml = html
        .replace('{{HEADER}}', headerContent)
        .replace('{{FOOTER}}', footerContent);

    // Replace any data placeholders
    Object.entries(data).forEach(([key, value]) => {
        processedHtml = processedHtml.replace(`{{${key}}}`, value);
    });

    return processedHtml;
}

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

async function build() {
    try {
        // Create dist directory
        await fs.mkdir('dist', { recursive: true });
        
        // Copy public directory
        await fs.cp('public', 'dist/public', { recursive: true });
        
        // Load projects data
        const projectsData = await loadProjects();
        
        // Build pages
        const pages = {
            'index.html': { template: 'views/index.html', data: { PROJECTS: generateProjectsHtml(projectsData.projects) } },
            'about.html': { template: 'views/about.html', data: {} },
            'contact.html': { template: 'views/contact.html', data: {} }
        };
        
        for (const [outputFile, { template, data }] of Object.entries(pages)) {
            const content = await fs.readFile(template, 'utf8');
            const processedContent = await processTemplate(content, data);
            await fs.writeFile(path.join('dist', outputFile), processedContent);
        }
        
        console.log('Build completed successfully!');
    } catch (error) {
        console.error('Build failed:', error);
        process.exit(1);
    }
}

build(); 