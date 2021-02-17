const express = require('express');
const app = express(),
      bodyParser = require('body-parser');

const appPath = process.env.APP_PATH || '/dist/apps/kredul/';
const port = process.env.PORT || 4200;
const hostname = process.env.HOSTNAME || '127.0.0.1';

app.use(bodyParser.json());
app.use(express.static(process.cwd() + appPath));

app.get('/', (req,res) => {
  res.sendFile(process.cwd() + appPath + 'index.html')
});

app.listen(port, hostname, () => {
    console.log(`Server listening on the port:${port}`);
});
