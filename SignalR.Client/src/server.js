const path = require('path');
const express = require('express');
const app = express();
const port = 3000;

const staticPath = path.join(__dirname, "../public");


app.use(express.static(staticPath));

app.get('/', (req, res) => {
    res.sendFile('/pages/index.html', { root: __dirname });
});

app.listen(port, () => console.log(`listening on port ${port}!`));