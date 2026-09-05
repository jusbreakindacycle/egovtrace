import http from 'node:http';
const port = Number(process.env.PORT || 3001);
http.createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, {'content-type':'application/json'});
    return res.end(JSON.stringify({status:'ok', mode:'synthetic'}));
  }
  res.writeHead(404, {'content-type':'application/json'});
  res.end(JSON.stringify({error:'not_found'}));
}).listen(port, () => console.log(`eGovTrace API scaffold listening on ${port}`));
