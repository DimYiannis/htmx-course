const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const multer = require('multer'); 

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Define the upload directory
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Use the original filename
    }
});

const upload = multer({ storage: storage });

app.get('/', (req, res) => {
    setTimeout(() => {
        res.send('<h2> Welcome to the Node Hypermedia </h2>');
    }, 7000)
    
});

app.post('/message', async (req, res)=> {
    // setTimeout(()=> {
    //     res.send(`<div><h3>Hello World</h3></div>`)
    // }, 5000);
    res.set({
        "Last-Modified": "Thursday, 11 Jan 2024"
    })
    res.send(`<div><h3>Hello World</h3></div>`)

})

app.post('/echo', async (req, res)=> {
    const email = req.body.email;
    const pass = req.body.pass;

    res.send(`<div><b>Email:</b> ${email}, <b>Password:</b> ${pass} </div>`);
})

app.post('/upload', upload.single("file"), async (req, res)=> {
    const filePath = req.file.path;
    console.log(filePath);

    res.send(`<div>Upload successful</div>: ${filePath}`);
})

app.post('/oob', async (req, res)=> {
   
    res.send(`<div><h3 id="target2" hx-swap-oob="true">Hello World</h3>
    to the main target</div>`)

})

app.post('/oob2', async (req, res)=> {
   
    res.send(`<div><h3 id="target2">Hello World</h3>
    to the main target</div>`)

})

app.get('/bigbox', (req,res) => {
    res.send(`
    <div id="growingbox" class="grow" 
    style="height:300px; width:300px; background-color: blue;">
        big box
    </div>
    `)
})

app.get('/users', (req,res) => {
    res.json([
        {
            id: 1,
            name: 'Rose'
        },
        {
            id: 2,
            name: 'lebron'
        },
        {
            id: 3,
            name: 'kobe'
        },
        {
            id: 4,
            name: 'curry'
        },
    ])
})

const PORT = process.env.PORT || 1330

app.listen (PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})