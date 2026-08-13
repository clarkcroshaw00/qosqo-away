async function loadGallery() {
  const container = document.getElementById('photo-gallery');
  if (!container) return;
  try {
    const response = await fetch('/api/gallery');
    const photos = await response.json();
    if (!photos.length) {
      container.innerHTML = '<p>No photos yet.</p>';
      return;
    }
    container.innerHTML = photos
      .map(
        (photo) => `
          <figure class="gallery-item">
            <img src="${photo.imageUrl}" alt="${escapeHtml(photo.caption)}" loading="lazy" />
            ${photo.caption ? `<figcaption>${escapeHtml(photo.caption)}</figcaption>` : ''}
          </figure>
        `
      )
      .join('');
  } catch (error) {
    console.error('Could not load gallery:', error);
    container.innerHTML = '<p>Gallery is temporarily unavailable.</p>';
  }
}
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
document.addEventListener('DOMContentLoaded', loadGallery);
