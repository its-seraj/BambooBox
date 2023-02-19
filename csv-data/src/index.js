const express = require('express')
const multer = require('multer')
const papa = require('papaparse')
const fs = require('fs')
const {putFile} = require('./StreamParser')


const app = express()
const upload = multer({
    dest: 'files',
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
    }
})


const port = process.env.PORT || 8080
const static_path = './public'
app.use(express.static(static_path))


app.post('/csv-uploaded', upload.single('file'), async (req, res) => {
    const csvStream = fs.readFileSync(`./${req.file.destination}/${req.file.filename}`, 'utf8')

    let rows;
    papa.parse(csvStream, {
        header: true,
        delimiter: ',',
        complete: (result) => {
            rows = result.data;
        }
    })
    
    const filteredData = putFile(rows);
    
    res.send(filteredData)
    // res.send({body: req.body, file: req.file})
}, (error, req, res, next) => {
    res.status(400).send({
        error: error.message
    })
})



app.listen(port, () => {
    console.log(`server is up on port ${port}`)
})