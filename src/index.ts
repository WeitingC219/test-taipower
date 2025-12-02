import http from 'http';

const server = http.createServer((req, res) => {
  const API_KEY = 'ghp_rESxjhJmRWlNG61Axc9z1heH4Mhxxxxxxxxx';
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`hello world7 ${API_KEY}`);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

// Only start the server if this file is run directly
if (require.main === module) {
  server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
  });
}

export default server;
