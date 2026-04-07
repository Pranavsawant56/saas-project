const http = require('http');

const testRoute = (path) => {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:8000${path}`, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data }));
    }).on('error', reject);
  });
};

const runTests = async () => {
    try {
        console.log("Testing /ping...");
        const ping = await testRoute('/ping');
        console.log("Ping Status:", ping.status, "Data:", ping.data);

        console.log("\nTesting /api/templates/my-templates...");
        const templ = await testRoute('/api/templates/my-templates');
        console.log("Templates Status:", templ.status, "Data:", templ.data);
        
        console.log("\nTesting /api/auth/me...");
        const auth = await testRoute('/api/auth/me');
        console.log("Auth Status:", auth.status, "Data:", auth.data);

    } catch (e) {
        console.error("Test failed:", e.message);
    }
};

runTests();
