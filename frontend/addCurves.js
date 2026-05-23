const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'templates', 'BusinessTemplate5.js');
let content = fs.readFileSync(filePath, 'utf8');

const curvesCode = `
              {/* Animated Curved Lines (Left to Right) */}
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.6, zIndex: 0 }}>
                <defs>
                  <linearGradient id="curveGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="transparent" />
                    <stop offset="50%" stopColor="#00E5FF" />
                    <stop offset="100%" stopColor="transparent" />
                  </linearGradient>
                  <linearGradient id="curveGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="transparent" />
                    <stop offset="50%" stopColor="#B026FF" />
                    <stop offset="100%" stopColor="transparent" />
                  </linearGradient>
                  <linearGradient id="curveGrad3" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="transparent" />
                    <stop offset="50%" stopColor="#FF0055" />
                    <stop offset="100%" stopColor="transparent" />
                  </linearGradient>
                </defs>
                {[
                  { d: "M-10 20 C 30 10, 70 40, 110 30", grad: 1, duration: 12, delay: 0 },
                  { d: "M-10 40 C 40 60, 60 20, 110 50", grad: 2, duration: 15, delay: 2 },
                  { d: "M-10 60 C 20 80, 80 40, 110 70", grad: 3, duration: 10, delay: 4 },
                  { d: "M-10 80 C 50 90, 50 10, 110 40", grad: 1, duration: 18, delay: 1 },
                  { d: "M-10 10 C 20 50, 80 10, 110 20", grad: 2, duration: 14, delay: 3 },
                  { d: "M-10 50 C 30 20, 70 80, 110 60", grad: 3, duration: 11, delay: 5 },
                  { d: "M-10 30 C 40 10, 60 90, 110 80", grad: 1, duration: 16, delay: 0.5 },
                  { d: "M-10 70 C 20 30, 80 60, 110 90", grad: 2, duration: 13, delay: 2.5 }
                ].map((curve, i) => (
                  <motion.path
                    key={i}
                    d={curve.d}
                    fill="none"
                    stroke={\`url(#curveGrad\${curve.grad})\`}
                    strokeWidth="0.6"
                    initial={{ x: -1000, opacity: 0 }}
                    animate={{ x: [ -500, 0, 500 ], opacity: [0, 1, 0] }}
                    transition={{ 
                      duration: curve.duration, 
                      repeat: Infinity, 
                      ease: "linear",
                      delay: curve.delay
                    }}
                    vectorEffect="non-scaling-stroke"
                  />
                ))}
              </svg>
`;

// Insert it right after the Bouncing Balls in the hero background
content = content.replace(
  /\{\/\*\s*Bouncing \/ Floating Solid Balls\s*\*\/\}.*?<\/div>\s*<\/div>/s,
  match => match.replace("</div>\n            </div>", `</div>\n${curvesCode}\n            </div>`)
);

fs.writeFileSync(filePath, content, 'utf8');
console.log("Added curve lines successfully!");
