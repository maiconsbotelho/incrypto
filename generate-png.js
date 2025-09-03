const fs = require('fs');
const { createCanvas } = require('canvas');

// Create a 192x192 canvas
const canvas = createCanvas(192, 192);
const ctx = canvas.getContext('2d');

// Fill background
ctx.fillStyle = '#000000';
ctx.fillRect(0, 0, 192, 192);

// Draw outer circle
ctx.strokeStyle = '#00ffc3';
ctx.lineWidth = 4;
ctx.beginPath();
ctx.arc(96, 96, 80, 0, 2 * Math.PI);
ctx.stroke();

// Draw lock body
ctx.fillStyle = '#00ffc3';
ctx.fillRect(76, 91, 40, 30);

// Draw lock shackle
ctx.strokeStyle = '#00ffc3';
ctx.lineWidth = 4;
ctx.beginPath();
ctx.arc(96, 81, 15, Math.PI, 0, false);
ctx.stroke();

// Draw keyhole
ctx.fillStyle = '#000000';
ctx.beginPath();
ctx.arc(96, 101, 4, 0, 2 * Math.PI);
ctx.fill();
ctx.fillRect(95, 101, 2, 8);

// Save as PNG
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync('./public/icon-192x192.png', buffer);
console.log('PNG icon generated successfully!');