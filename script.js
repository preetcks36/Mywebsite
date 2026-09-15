const opening = document.querySelector('#opening');
const beginStory = document.querySelector('#beginStory');
const finalSection = document.querySelector('#finale');
const revealFinal = document.querySelector('#revealFinal');
const menuToggle = document.querySelector('#menuToggle');
const navLinks = document.querySelector('#navLinks');
const lightbox = document.querySelector('#lightbox');
const lightboxImage = document.querySelector('.lightbox__image');
const lightboxCaption = document.querySelector('#lightboxCaption');

beginStory.addEventListener('click', () => {
	opening.classList.add('is-dismissed');
	document.body.classList.add('is-open');
	document.querySelector('#childhood').scrollIntoView({ behavior: 'smooth' });
});

revealFinal.addEventListener('click', () => finalSection.classList.add('revealed'));

menuToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => navLinks.classList.remove('open')));

const revealObserver = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.classList.add('visible');
			revealObserver.unobserve(entry.target);
		}
	});
}, { threshold: 0.14 });
document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

// Add local images to the paths in index.html. Missing files keep their intentional memory-card placeholder.
document.querySelectorAll('[data-photo]').forEach((frame) => {
	const imagePath = frame.dataset.photo;
	const image = new Image();
	image.src = imagePath;
	image.onload = () => {
		image.alt = frame.querySelector('strong')?.textContent || 'A memory';
		frame.appendChild(image);
	};
});

document.querySelectorAll('.gallery-card').forEach((card) => {
	card.addEventListener('click', () => {
		const image = card.querySelector('img');
		if (!image) return;
		lightboxImage.style.backgroundImage = `url("${image.src}")`;
		lightboxCaption.textContent = card.dataset.caption || '';
		lightbox.classList.add('is-open');
		lightbox.setAttribute('aria-hidden', 'false');
	});
});

function closeLightbox() {
	lightbox.classList.remove('is-open');
	lightbox.setAttribute('aria-hidden', 'true');
}
document.querySelector('#lightboxClose').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (event) => { if (event.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeLightbox(); });

const cursorGlow = document.querySelector('.cursor-glow');
window.addEventListener('pointermove', (event) => {
	cursorGlow.style.left = `${event.clientX}px`;
	cursorGlow.style.top = `${event.clientY}px`;
});
