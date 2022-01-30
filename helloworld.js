const http = require('http');
const port = process.env.PORT || 3000;
const fs = require('fs');

const server = http.createServer((req, res) => {
  // console.log(req.url)
  const path = req.url.replace("/\/?(?:\?.**)?$/", '').toLowerCase();
  console.log(path)
  switch (path) {
    case '/index':
      serveStaticFiles(res, '/pubic/home.html', 'text/html');
      break;
    case '/about':
      serveStaticFiles(res, '/pubic/about.html', 'text/html');
      break;
    default:
      serveStaticFiles(res, '/pubic/404.html', 'text/html');
      break;
  }
});

function serveStaticFiles(res, path, contentType, responseCode = 200) { //
  fs.readFile(__dirname + path, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('500 - Internal Error');
    }
      res.writeHead(responseCode, {
      'Content-Type': contentType
    })
    res.end(data);
  })
}
  

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
})