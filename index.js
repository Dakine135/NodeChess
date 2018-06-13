const express = require('express');
const app = express();
let port = 8000;

app.use(express.static('client'));

app.listen(port, () => {
  console.log('Node Chess listening on port ', port);
});
