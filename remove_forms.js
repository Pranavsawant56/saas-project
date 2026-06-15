const fs = require('fs');
const path = require('path');

const dir = 'e:/pranav/muti-templetes-project/multi-templetes/my-app/frontend/src/components/templates';
const files = fs.readdirSync(dir).filter(f => f.startsWith('EventTemplate') && f.endsWith('.js') && f !== 'EventTemplate1.js');

let replacedCount = 0;
for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace the grid class if any
  content = content.replace(/className="grid lg:grid-cols-2[^"]*"/, 'className="max-w-2xl mx-auto"');
  content = content.replace(/className="grid-2col-start"/, 'className="max-w-2xl mx-auto"');
  
  // Find {/* Form */} and remove it and the following <motion.div> ... </motion.div>
  // Wait, in some templates it might be a regular <div>. Let's handle <motion.div> and <div>
  const regex = /\{\/\*\s*Form\s*\*\/\}\s*<(motion\.div|div)[^>]*>[\s\S]*?<\/\1>/g;
  
  if (regex.test(content)) {
    content = content.replace(regex, '');
    fs.writeFileSync(filePath, content, 'utf8');
    replacedCount++;
    console.log('Replaced in ' + file);
  } else {
    console.log('Form not found in ' + file);
    // Let's try alternative names like {/* Right: Form */}
    const altRegex = /\{\/\*\s*Right:\s*Form\s*\*\/\}\s*<(motion\.div|div|Reveal)[^>]*>[\s\S]*?<\/\1>/g;
    if (altRegex.test(content)) {
      content = content.replace(altRegex, '');
      fs.writeFileSync(filePath, content, 'utf8');
      replacedCount++;
      console.log('Replaced in ' + file + ' using altRegex');
    }
  }
}

console.log('Total files modified: ' + replacedCount);
