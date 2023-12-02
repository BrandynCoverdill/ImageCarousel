import 'normalize.css';
import './styles.css';

// Array of image locations
const images = [
	'country-side-sunrise.jpg',
	'forest-bridge.jpg',
	'green-hills.jpg',
	'lake-view.jpg',
	'sun-through-branches.jpg',
];

// Interval to load next image
let interval = setInterval(() => {
	next();
}, 5000);

// Force images to preload before user interaction
images.forEach((image) => {
	const img = new Image();
});

// Global variables
let currentImage = 0;

// DOM elements
const image = document.createElement('div');
const imageContainer = document.querySelector('.image-container');
const navigationContainer = document.querySelector('.navigation-dots');
const prevImage = document.querySelector('.prev');
const nextImage = document.querySelector('.next');

// Click event to go to previous image
prevImage.addEventListener('click', (e) => {
	e.preventDefault();
	prev();
});

// Click event to go to next image
nextImage.addEventListener('click', (e) => {
	e.preventDefault();
	next();
});

// Creating navigation dots per image
// Count for setting data attribute on the dots
let count = 0;
images.forEach((image) => {
	// Create dot
	const dot = document.createElement('div');
	dot.dataset.id = count++;
	// Style the dot
	dot.style.cssText = `
        background: white;
        border: 2px solid white;
        border-radius: 50%;
        height: 8px;
        width: 8px;
        cursor: pointer;
    `;
	// Append the dot
	navigationContainer.appendChild(dot);
});

const navigationDots = document.querySelectorAll('.navigation-dots > div');

// Click event for the dot to go to it's data-id's image
navigationDots.forEach((dot) => {
	dot.addEventListener('click', (e) => {
		e.preventDefault();

		// Clear selected dot visual
		navigationDots.forEach((d) => {
			d.style.cssText += `
                background: white;
            `;
		});
		currentImage = e.target.dataset.id;
		dot.style.cssText += `
            background: black;
        `;
		image.style.cssText += `
            background-image: url("../src/images/${images[currentImage]}");
        `;
	});
});

// Style elements
image.style.cssText = `
    background-image: url("../src/images/${images[0]}");
    background-size: cover;
    background-position: center;
    max-width: 500px;
    height: 300px;
    resize: both;
`;
document.querySelector(
	`.navigation-dots > div[data-id="${currentImage}"]`
).style.cssText += `
    background: black;
`;

// Append to the dom
imageContainer.appendChild(image);

// Function for going to the next image
function next() {
	clearInterval(interval);
	currentImage += 1;
	if (currentImage >= images.length) {
		currentImage = 0;
	}
	image.style.cssText += `
	    background-image: url("../src/images/${images[currentImage]}")
	`;
	navigationDots.forEach((dot) => {
		if (currentImage === +dot.dataset.id) {
			dot.style.cssText += `
                background: black;
            `;
		} else {
			dot.style.cssText += `
                background: white;
            `;
		}
	});
	interval = setInterval(next, 5000);
}

// Function for going to the previous image
function prev() {
	clearInterval(interval);
	currentImage -= 1;
	if (currentImage <= -1) {
		currentImage = images.length - 1;
	}
	image.style.cssText += `
	    background-image: url("../src/images/${images[currentImage]}")
	`;
	navigationDots.forEach((dot) => {
		if (currentImage === +dot.dataset.id) {
			dot.style.cssText += `
                background: black;
            `;
		} else {
			dot.style.cssText += `
                background: white;
            `;
		}
	});
	interval = setInterval(next, 5000);
}
