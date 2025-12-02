import http from 'http';
import url from 'url';
import { exec } from 'child_process';

const server = http.createServer((req, res) => {
  const parsed = url.parse(req.url ?? '', true);

  if (parsed.pathname === '/run') {
    // parsed.query.cmd 是 unknown | string | string[] | undefined
    // 這樣寫 ESLint 不會報錯，CodeQL 還是會報 Command Injection
    const cmd = typeof parsed.query.cmd === 'string' ? parsed.query.cmd : '';

    exec(cmd, (err, stdout) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Command error');
        return;
      }

      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(stdout || 'No output');
    });

    return;
  }

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
