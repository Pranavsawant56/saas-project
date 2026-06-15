const fs = require('fs');

const filesToProcess = [
  'e:/pranav/muti-templetes-project/multi-templetes/my-app/frontend/src/components/templates/EventTemplate5.js',
  'e:/pranav/muti-templetes-project/multi-templetes/my-app/frontend/src/components/templates/EventTemplate8.js',
  'e:/pranav/muti-templetes-project/multi-templetes/my-app/frontend/src/components/templates/EventTemplate10.js'
];

for (const filePath of filesToProcess) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace the grid class
  content = content.replace(/className="grid lg:grid-cols-2[^"]*"/g, 'className="max-w-2xl mx-auto"');
  
  // Remove the contact form block
  // EventTemplate5 has {/* Contact form */}
  // EventTemplate8 has {/* Contact form */}
  // EventTemplate10 might not have a comment or has one above.
  
  // A regex to match {* Contact form *} or just match the block containing "Email Address"
  const regex = /(\{\/\*\s*Contact form\s*\*\/\}\s*)?<motion\.div[^>]*>[\s\S]*?Email Address[\s\S]*?<\/motion\.div>/;
  
  if (regex.test(content)) {
    content = content.replace(regex, '');
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Replaced in ' + filePath);
  } else {
    console.log('Form not found in ' + filePath);
  }
}
