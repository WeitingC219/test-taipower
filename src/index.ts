import http from 'http';

const server = http.createServer((req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dbPassword = 'SuperSecret123';

  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('hello world7');
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

if (require.main === module) {
  server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
  });
}

export default server;
