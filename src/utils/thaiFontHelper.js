// Thai font helper for jsPDF
// Since embedding a full Thai font as base64 is very large (~500KB+),
// we use a workaround: render Thai text to canvas, then embed as image in PDF.

export function addThaiText(doc, text, x, y, options = {}) {
  const {
    fontSize = 12,
    fontWeight = 'normal',
    color = '#000000',
    align = 'left',
    maxWidth = null
  } = options;

  // Create an offscreen canvas
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  // Set font
  const fontFamily = 'Sarabun, Noto Sans Thai, Tahoma, sans-serif';
  ctx.font = `${fontWeight === 'bold' ? 'bold ' : ''}${fontSize * 2}px ${fontFamily}`;

  // Measure text
  const textToRender = String(text || '-');
  const metrics = ctx.measureText(textToRender);
  const textWidth = metrics.width;
  const textHeight = fontSize * 2.4;

  // Set canvas size
  canvas.width = Math.ceil(textWidth) + 4;
  canvas.height = Math.ceil(textHeight) + 4;

  // Clear and redraw with proper settings
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = `${fontWeight === 'bold' ? 'bold ' : ''}${fontSize * 2}px ${fontFamily}`;
  ctx.fillStyle = color;
  ctx.textBaseline = 'top';
  ctx.fillText(textToRender, 0, 2);

  // Convert to image and add to PDF
  const imgData = canvas.toDataURL('image/png');
  const imgWidth = canvas.width / 2; // Scale back down
  const imgHeight = canvas.height / 2;

  let finalX = x;
  if (align === 'center' && maxWidth) {
    finalX = x + (maxWidth - imgWidth) / 2;
  } else if (align === 'right' && maxWidth) {
    finalX = x + maxWidth - imgWidth;
  }

  doc.addImage(imgData, 'PNG', finalX, y - imgHeight * 0.65, imgWidth, imgHeight);

  return { width: imgWidth, height: imgHeight };
}

export function getThaiTextWidth(text, fontSize = 12, fontWeight = 'normal') {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const fontFamily = 'Sarabun, Noto Sans Thai, Tahoma, sans-serif';
  ctx.font = `${fontWeight === 'bold' ? 'bold ' : ''}${fontSize * 2}px ${fontFamily}`;
  return ctx.measureText(String(text || '-')).width / 2;
}
