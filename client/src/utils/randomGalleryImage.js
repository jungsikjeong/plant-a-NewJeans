const randomGalleryImageData = [
  {
    url: '/images/about/about1.jpg',
  },
  {
    url: '/images/about/about2.jpg',
  },
  {
    url: '/images/about/about3.jpg',
  },
  {
    url: '/images/about/about4.jpg',
  },
  {
    url: '/images/about/about5.jpg',
  },
  {
    url: '/images/about/about6.jpg',
  },
];

function randomGalleryImage() {
  const randomIndex = Math.floor(Math.random() * randomGalleryImageData.length);
  return randomGalleryImageData[randomIndex];
}

export default randomGalleryImage;
