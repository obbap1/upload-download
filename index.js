const http = require('http');
const fs = require('fs');
const path = require('path');
const Busboy = require('busboy');
const shell = require('shelljs');

const port = 3000;

const server = http.createServer((req, res) => {
  const { url, method, headers } = req;

  // Upload songs
  if (url === '/upload' && method === 'POST') {
    const busboy = new Busboy({ headers });

    busboy.on('file', (__, file, filename, ___, mimetype) => {
      console.log(`file found ${filename}`);

      fs.open(`${path.join(__dirname, './songs', filename)}`, 'r', (err, _) => {
        if (err && err.code === 'ENOENT') {
          const saveTo = path.join(__dirname, './songs', filename);
          file.pipe(fs.createWriteStream(saveTo));
        } else {
          console.log('already here');
          res.write('File already exists!');
        }
      });

      if (mimetype !== 'audio/mp3') {
        res.statusCode = 403;
        res.end('Only mp3 files are accepted');
      }
    });

    busboy.on('finish', () => {
      console.log('Done parsing form!!!');
      res.setHeader('Content-Type', 'text/plain');
      res.end('Your File has been uploaded successfully');
    });

    req.pipe(busboy);
  }

  // See songs
  if (url === '/list' && method === 'GET') {
    res.writeHead(200);
    shell.cd('songs');
    shell.ls('*.mp3').forEach((file) => {
      res.write(`<button>${file}</button>`);
    });
    shell.cd('..');

    res.end();
  }

  // Download songs
});

server.listen(port, () => console.log(`This server runs on ${port}`));
