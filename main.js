const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.use(express.static(__dirname));


// app.get('/', (req, res) => {
//     res.render('index');
// });

app.get('/', (rey, res) => {
   res.render('furnitureConfiguration');
});

app.listen(3000);