import React from 'react';
import { createRoot } from 'react-dom/client';
import rawPage from '../code.html?raw';
import redCollar from '../assets/red-collar.png';
import greenCollar from '../assets/green-collar.png';
import yellowCollar from '../assets/yellow-collar.png';
import airtagCollar from '../assets/airtag-collar.png';
import streetCat from '../assets/street-cat.png';
import './tailwind.css';
import './styles.css';

const localPage = rawPage
  .replaceAll('/assets/red-collar.png', redCollar)
  .replaceAll('/assets/green-collar.png', greenCollar)
  .replaceAll('/assets/yellow-collar.png', yellowCollar)
  .replaceAll('/assets/airtag-collar.png', airtagCollar)
  .replaceAll('/assets/street-cat.png', streetCat);

const bodyMarkup = localPage
  .replace(/^[\s\S]*<body[^>]*>/i, '')
  .replace(/<script[\s\S]*?<\/script>/gi, '')
  .replace(/<\/body>[\s\S]*$/i, '');

function installLegacyInteractions() {
  const scriptMatch = localPage.match(/<script>\s*\/\/ BILINGUAL DICTIONARY([\s\S]*?)<\/script>/i);
  if (!scriptMatch) {
    throw new Error('Kedibul interaction script was not found in code.html.');
  }

  window.eval(scriptMatch[1]);
  if (typeof window.renderProfile === 'function') {
    window.renderProfile();
  }
}

function startHeroCarousel() {
  const image = document.querySelector('.hero-collar-image');
  if (!image) {
    throw new Error('Hero collar image was not found.');
  }

  const images = [redCollar, greenCollar, yellowCollar, airtagCollar];
  let index = 0;
  const interval = window.setInterval(() => {
    image.classList.add('is-changing');
    window.setTimeout(() => {
      index = (index + 1) % images.length;
      image.src = images[index];
      image.alt = `Kedibul ${['Red', 'Green', 'Yellow', 'AirTag'][index]} Collar`;
      image.classList.remove('is-changing');
    }, 300);
  }, 3600);

  return () => window.clearInterval(interval);
}

function App() {
  React.useEffect(() => {
    installLegacyInteractions();
    const stopHeroCarousel = startHeroCarousel();

    return () => {
      stopHeroCarousel();
      delete window.toggleLanguage;
      delete window.selectColor;
      delete window.prevCatProfile;
      delete window.nextCatProfile;
      delete window.scrollProductCarousel;
      delete window.updateProductCounter;
      delete window.handleSubscribe;
      delete window.renderProfile;
    };
  }, []);

  return <main dangerouslySetInnerHTML={{ __html: bodyMarkup }} />;
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
