const form = document.querySelector('#upload-form');
const input = document.querySelector('#photo-input');
const display = document.querySelector('#photo-display');
const prevButton = document.querySelector('#prev-button');
const nextButton = document.querySelector('#next-button');
const fullscreenButton = document.querySelector('#fullscreen-button');
const zoomInButton = document.querySelector('#zoom-in-button');
const zoomOutButton = document.querySelector('#zoom-out-button');

let currentPhoto = 0;
let photos = [];

form.addEventListener('submit', function(e) {
    e.preventDefault(); // prevent default form submission behavior
  
    // Validate file type
    const file = input.files[0];
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }
  
    // Add photo to array
    photos.push(file);
  
    // Display uploaded photo
    const formData = new FormData();
    formData.append('photo', file);
    fetch('/upload', {
      method: 'POST',
      body: formData
    })
      .then(response => response.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        display.style.backgroundImage = `url(${url})`;
      });
  });  
  

prevButton.addEventListener('click', e => {
  // Decrement current photo index
  // If at the beginning of the array, loop to the end
  currentPhoto = (currentPhoto - 1 + photos.length) % photos.length;
  displayPhoto();
});

nextButton.addEventListener('click', e => {
  // Increment current photo index
  // If at the end of the array, loop to the beginning
  currentPhoto = (currentPhoto + 1) % photos.length;
  displayPhoto();
});

fullscreenButton.addEventListener('click', e => {
  // Toggle full screen mode
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    display.requestFullscreen();
  }
});

zoomInButton.addEventListener('click', e => {
  // Increase photo size by 10%
  display.style.backgroundSize = `${1.1 * parseInt(display.style.backgroundSize)}%`;
});

zoomOutButton.addEventListener('click', e => {
  // Decrease photo size by 10%
  display.style.backgroundSize = `${0.9 * parseInt(display.style.backgroundSize)}%`;
});

function displayPhoto() {
  // Display current photo in the photo display div
  const reader = new FileReader();
  reader.onload = e => {
    display.style.backgroundImage = `url(${e.target.result})`;
  };
  reader.readAsDataURL(photos[currentPhoto]);
}
