const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send('<h2> Welcome to the Node Hypermedia </h2>');
});

app.post('/message', async (req, res)=> {
    // setTimeout(()=> {
    //     res.send(`<div><h3>Hello World</h3></div>`)
    // }, 5000);
    res.send(`<div><h3>Hello World</h3></div>`)

})

app.post('/echo', async (req, res)=> {
    const email = req.body.email;
    const pass = req.body.pass;

    res.send(`<div><b>Email:</b> ${email}, <b>Password:</b> ${pass} </div>`);
})

const PORT = process.env.PORT || 1330

app.listen (PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})