const http = require('http');
const fs = require('fs');
const path = require('path');
const Busboy = require('busboy');
const shell = require('shelljs');

const port = 3000;

const server = http.createServer((req, res) => {
  const { url, method } = req;

  // Upload songs
  if (url === '/upload' && method === 'POST') {
    const busboy = new Busboy({ headers: req.headers });

    busboy.on('file', (__, file, filename, ___, mimetype) => {
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
      res.end('Your File has been uploaded successfully');
      res.writeHead(303, { Connection: 'close', Location: '/' });
    });

    req.pipe(busboy);
  }

  // See songs
  if (url === '/list' && method === 'GET') {
    const allSongs = [];
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    shell.cd('songs');
    shell.ls('*.mp3').forEach((file) => {
      res.write(file);
    });
    shell.cd('..');

    res.end();
  }

  // Download songs
});

server.listen(port, () => console.log(`This server runs on ${port}`));
