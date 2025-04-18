# Portfolio Website

A clean and responsive portfolio website built with vanilla Node.js, featuring project showcases, about page, and contact functionality.

## Features

- Dynamic header and footer components
- Responsive design for all screen sizes
- Project showcase with filtering capabilities
  - Categories: AI Coding, Personal, Just for Fun
  - 4 featured projects on homepage
  - Project cards with thumbnails, titles, and descriptions
- About page with profile picture
- Contact form with email functionality
- No external frameworks, pure Node.js implementation

## Tech Stack

- Backend: Node.js (Vanilla)
- Frontend: HTML, CSS, JavaScript
- Email: Built-in Node.js mailer functionality
- Storage: File-based (JSON for data, local storage for images)

## Implementation Plan

### Phase 1: Basic Setup and Structure ✅
- [x] Create project directory structure
- [x] Initialize package.json
- [x] Set up basic Node.js server
- [x] Create basic routing system
- [x] Implement dynamic header/footer injection system

### Phase 2: Frontend Foundation ✅
- [x] Create responsive CSS base styles
- [x] Implement mobile-first design approach
- [x] Design and implement header/footer components
- [x] Create basic page layouts (home, about, contact)
- [x] Set up public assets directory (images, CSS, JS)

### Phase 3: Projects Implementation ✅
- [x] Create projects data structure (JSON)
- [x] Design project card component
- [x] Implement project grid layout
- [x] Create category filtering system
- [x] Add client-side JavaScript for instant filtering
- [x] Ensure responsive grid behavior

### Phase 4: About Page ✅
- [x] Design about page layout
- [x] Implement profile picture section
- [x] Add personal information section
- [x] Ensure responsive design for all screen sizes

### Phase 5: Contact Form ✅
- [x] Create contact form HTML structure
- [x] Implement form validation
- [x] Set up email functionality using Node.js
- [x] Add success/error handling
- [x] Implement security measures (rate limiting, input sanitization)

### Phase 6: Testing and Optimization
- [ ] Test responsive design across devices
- [ ] Optimize images and assets
- [ ] Test form submission and email functionality
- [ ] Cross-browser testing
- [ ] Performance optimization

### Phase 7: Final Polish
- [ ] Add loading states
- [ ] Implement error handling
- [ ] Add final styling touches
- [ ] Documentation
- [ ] Final testing and bug fixes

## Project Structure

```
portfolio-website/
├── public/
│   ├── css/
│   │   ├── style.css
│   │   ├── header.css
│   │   ├── footer.css
│   │   └── responsive.css
│   ├── images/
│   └── js/
│       └── filter.js
├── views/
│   ├── partials/
│   │   ├── header.html
│   │   └── footer.html
│   ├── index.html
│   ├── about.html
│   └── contact.html
├── data/
│   └── projects.json
├── server.js
├── package.json
└── README.md
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   node server.js
   ```
4. Visit `http://localhost:3000` in your browser

## Development Notes

- The project uses a simple file-based routing system
- Images are stored locally in the public/images directory
- Project data is stored in a JSON file for simplicity
- Email functionality uses built-in Node.js capabilities
- No database required - keeping it simple and portable 