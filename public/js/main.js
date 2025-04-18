// Handle image loading
document.addEventListener('DOMContentLoaded', () => {
    // Handle project images
    const projectImages = document.querySelectorAll('.project-image img');
    projectImages.forEach(handleImageLoad);

    // Handle about page image
    const aboutImage = document.querySelector('.about-image img');
    if (aboutImage) {
        handleImageLoad(aboutImage);
    }
});

function handleImageLoad(img) {
    // Add loaded class when image loads
    img.addEventListener('load', () => {
        img.classList.add('loaded');
    });
    
    // If image is already cached, add loaded class immediately
    if (img.complete) {
        img.classList.add('loaded');
    }
} 