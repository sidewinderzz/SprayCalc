const fs = require('fs');
const path = require('path');

// Simple PNG generator - creates a solid color PNG with minimal header
// This creates a valid PNG that's a solid color square

function createSimplePNG(width, height, r, g, b) {
  // PNG signature
  const signature = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);

  // IHDR chunk
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // bit depth
  ihdrData[9] = 2; // color type (RGB)
  ihdrData[10] = 0; // compression
  ihdrData[11] = 0; // filter
  ihdrData[12] = 0; // interlace

  const ihdrChunk = createChunk('IHDR', ihdrData);

  // Create raw image data (RGB for each pixel)
  const rawData = [];
  for (let y = 0; y < height; y++) {
    rawData.push(0); // filter byte
    for (let x = 0; x < width; x++) {
      // Create a simple gradient/pattern for visual interest
      const centerX = width / 2;
      const centerY = height / 2;
      const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
      const maxDist = Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerY, 2));

      // Draw a droplet shape in white on green background
      const normalizedY = (y - height * 0.15) / (height * 0.7);
      const normalizedX = (x - centerX) / (width * 0.35);

      let isDroplet = false;
      if (normalizedY >= 0 && normalizedY <= 1) {
        // Droplet shape: wider at bottom, pointed at top
        const dropletWidth = normalizedY < 0.3
          ? normalizedY / 0.3
          : Math.sqrt(1 - Math.pow((normalizedY - 0.3) / 0.7, 2));

        if (Math.abs(normalizedX) < dropletWidth * 0.8) {
          isDroplet = true;
        }
      }

      if (isDroplet) {
        rawData.push(255, 255, 255); // White droplet
      } else {
        rawData.push(r, g, b); // Green background
      }
    }
  }

  // Compress with zlib
  const zlib = require('zlib');
  const compressed = zlib.deflateSync(Buffer.from(rawData), { level: 9 });

  const idatChunk = createChunk('IDAT', compressed);

  // IEND chunk
  const iendChunk = createChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function createChunk(type, data) {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length, 0);

  const typeBuffer = Buffer.from(type, 'ascii');
  const crcData = Buffer.concat([typeBuffer, data]);
  const crc = crc32(crcData);

  const crcBuffer = Buffer.alloc(4);
  crcBuffer.writeUInt32BE(crc >>> 0, 0);

  return Buffer.concat([length, typeBuffer, data, crcBuffer]);
}

// CRC32 implementation
function crc32(data) {
  let crc = 0xFFFFFFFF;
  const table = makeCRCTable();

  for (let i = 0; i < data.length; i++) {
    crc = (crc >>> 8) ^ table[(crc ^ data[i]) & 0xFF];
  }

  return crc ^ 0xFFFFFFFF;
}

function makeCRCTable() {
  const table = new Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      if (c & 1) {
        c = 0xEDB88320 ^ (c >>> 1);
      } else {
        c = c >>> 1;
      }
    }
    table[n] = c;
  }
  return table;
}

// Generate icons
const iconsDir = path.join(__dirname, '..', 'public', 'icons');

// Ensure directory exists
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Green color from the app theme (#498a5a)
const r = 73, g = 138, b = 90;

// Generate 192x192 icon
const icon192 = createSimplePNG(192, 192, r, g, b);
fs.writeFileSync(path.join(iconsDir, 'icon-192x192.png'), icon192);
console.log('Created icon-192x192.png');

// Generate 512x512 icon
const icon512 = createSimplePNG(512, 512, r, g, b);
fs.writeFileSync(path.join(iconsDir, 'icon-512x512.png'), icon512);
console.log('Created icon-512x512.png');

console.log('Icon generation complete!');
