# Portfolio Website

A clean and responsive portfolio website built with vanilla Node.js, featuring project showcases, about page, and contact functionality.

## Features

- Clean, minimalist design
- Responsive layout
- Project showcase with filtering
- About page
- Contact page with direct email link
- Image lazy loading
- Smooth transitions and animations

## Tech Stack

- Backend: Node.js (Vanilla)
- Frontend: HTML, CSS, JavaScript (No frameworks)
- Storage: File-based (JSON for data)

## Project Structure

```
portfoliowebsite/
├── data/
│   └── projects.json       # Project data
├── public/
│   ├── css/
│   │   └── style.css      # Main stylesheet
│   ├── js/
│   │   └── main.js        # Client-side JavaScript
│   └── images/            # Image assets
├── views/
│   ├── partials/
│   │   ├── header.html    # Common header
│   │   └── footer.html    # Common footer
│   ├── index.html         # Homepage
│   ├── about.html         # About page
│   └── contact.html       # Contact page
└── server.js              # Node.js server
```

## Getting Started

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd portfoliowebsite
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

4. Visit `http://localhost:3000` in your browser

## Development

To run the server in development mode with auto-reload:
```bash
npm run dev
```

## Customization

1. Update project data in `data/projects.json`
2. Modify styles in `public/css/style.css`
3. Add your images to `public/images/`
4. Update content in the HTML files under `views/`

## License

ISC 