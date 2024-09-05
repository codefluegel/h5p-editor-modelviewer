(async function () {
  // Add viewport meta tag
  addViewportMetaTag();
  
  const modelViewerModuleUrl = 'https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js';
  await import(modelViewerModuleUrl);
  
})();

function addViewportMetaTag() {
  const metaTag = document.createElement('meta');
  metaTag.name = 'viewport';
  metaTag.content = 'width=device-width, initial-scale=1';
  document.head.appendChild(metaTag);
}