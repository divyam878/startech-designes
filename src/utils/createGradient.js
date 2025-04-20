const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 256;
canvas.height = 256;

const gradient = ctx.createRadialGradient(
  128, 128, 0,    // inner circle center (x, y, radius)
  128, 128, 128   // outer circle center (x, y, radius)
);

gradient.addColorStop(0, 'rgba(0, 0, 0, 0.2)');
gradient.addColorStop(0.5, 'rgba(0, 0, 0, 0.1)');
gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

ctx.fillStyle = gradient;
ctx.fillRect(0, 0, 256, 256);

// Save as PNG
const link = document.createElement('a');
link.download = 'radial-gradient.png';
link.href = canvas.toDataURL('image/png');
link.click();