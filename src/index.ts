import http from 'http';

const server = http.createServer((req, res) => {
  // Vulnerability 1: Gitleaks (Fake AWS Key)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const awsKey = 'AKIAIOSFODNN7EXAMPLE';

  // Vulnerability 2: CodeQL (Remote Code Execution via eval)
  const userInput = req.url?.split('?')[1] ?? '';

  eval(userInput);

  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('hello world7');
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

// Only start the server if this file is run directly
if (require.main === module) {
  server.listen(3000, () => {
    // eslint-disable-next-line no-console
    console.log('Server running at http://localhost:3000/');
  });
}

export default server;
