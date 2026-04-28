const fs = require('fs');
const path = require('path');
const https = require('https');

const dataFile = path.join(__dirname, 'frontend/src/data/templates.js');
const componentsDir = path.join(__dirname, 'frontend/src/components/templates');
const outDir = path.join(__dirname, 'frontend/public/images/templates');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Ensure unique images
const imageMap = new Map();
let imageCounter = 1;

function extractUrls(content) {
  const regex = /https:\/\/images\.unsplash\.com\/[^"'\s`]+/g;
  const matches = content.match(regex) || [];
  return matches;
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const urls = extractUrls(content);
  
  for (const url of urls) {
    if (!imageMap.has(url)) {
      const ext = 'jpg'; // Unsplash images are typically jpg
      const filename = `template-img-${imageCounter++}.${ext}`;
      imageMap.set(url, filename);
    }
    const newUrl = `/images/templates/${imageMap.get(url)}`;
    content = content.split(url).join(newUrl);
  }
  
  fs.writeFileSync(filePath, content, 'utf8');
  return urls;
}

async function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const dest = path.join(outDir, filename);
    if (fs.existsSync(dest)) {
      resolve();
      return;
    }
    
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      // Follow redirects if necessary, though Unsplash direct links might not need it
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        https.get(response.headers.location, (redirectResponse) => {
          redirectResponse.pipe(file);
          file.on('finish', () => file.close(resolve));
        }).on('error', (err) => {
          fs.unlink(dest, () => {});
          reject(err);
        });
      } else {
        response.pipe(file);
        file.on('finish', () => {
          file.close(resolve);
        });
      }
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function run() {
  console.log('Processing templates.js...');
  processFile(dataFile);
  
  const files = fs.readdirSync(componentsDir);
  for (const file of files) {
    if (file.endsWith('.js')) {
      const p = path.join(componentsDir, file);
      processFile(p);
    }
  }
  
  console.log(`Found ${imageMap.size} unique images. Downloading...`);
  
  for (const [url, filename] of imageMap.entries()) {
    console.log(`Downloading ${filename}...`);
    try {
      await downloadImage(url, filename);
    } catch (e) {
      console.error(`Failed to download ${url}:`, e);
    }
  }
  
  console.log('Done!');
}

run();
