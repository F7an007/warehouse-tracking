export function addThaiText(doc, text, x, y, options = {}) {
  const {
    fontSize = 12,
    fontWeight = 'normal',
    color = '#000000',
    align = 'left',
    maxWidth = null
  } = options;

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  // Use system fonts that guarantee perfect Thai rendering on Windows
  const fontFamily = '"Tahoma", "Leelawadee UI", sans-serif';
  
  // High DPI scale for crisp PDF rendering
  const scale = 4; 
  
  // Set font using 'pt' to match jsPDF sizing accurately
  const fontString = `${fontWeight === 'bold' ? 'bold ' : ''}${fontSize * scale}pt ${fontFamily}`;
  ctx.font = fontString;

  const textToRender = String(text || '-');
  const metrics = ctx.measureText(textToRender);
  const textWidthPx = metrics.width;
  
  // Approximate height based on font size (1 pt = 1.333 px)
  const textHeightPx = (fontSize * scale) * 1.5;

  // Add padding to prevent clipping of tone marks (วรรณยุกต์)
  canvas.width = Math.ceil(textWidthPx) + (10 * scale);
  canvas.height = Math.ceil(textHeightPx) + (10 * scale);

  // Context resets after canvas resize, re-apply styles
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = fontString;
  ctx.fillStyle = color;
  ctx.textBaseline = 'top';
  
  // Draw text with padding offset
  ctx.fillText(textToRender, 2 * scale, 2 * scale);

  const imgData = canvas.toDataURL('image/png');
  
  // Convert CSS pixels to jsPDF mm units
  // 1 px = 0.264583 mm
  const pxToMm = 0.264583;
  const finalImgWidth = (canvas.width / scale) * pxToMm;
  const finalImgHeight = (canvas.height / scale) * pxToMm;

  let finalX = x;
  if (align === 'center') {
    finalX = x - (finalImgWidth / 2);
  } else if (align === 'right') {
    finalX = x - finalImgWidth;
  }

  // Adjust Y upward slightly to align visual baseline perfectly
  doc.addImage(imgData, 'PNG', finalX, y - (finalImgHeight * 0.15), finalImgWidth, finalImgHeight);

  return { width: finalImgWidth, height: finalImgHeight };
}
