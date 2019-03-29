const http = require('http');
const url = require('url');

const port = 3000;

const server = http.createServer((req, res) => {
  console.log(url.parse(req.url));

  if (req.url === '/upload' && req.method === 'GET') {
    console.log(req);
    res.end('sure G');
  }

  res.end('hello');
});

server.listen(port, () => console.log(`This server runs on ${port}`));
