import express from 'express';
import bodyParser from 'body-parser';
import bugsRouter from './routes/api/bugs.js';
import axios from 'axios';

const port = 3000;
const app = express();

app.use(express.static('./public'));
app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/bugs', bugsRouter);

app.get('/', (req, res) => {
    axios.get('http://localhost:3000/api/bugs').then(response => {
        if (response.data.success)
            var result = {
                success: true,
                data: response.data.data
            };
        else 
            var result = {
                success: false,
                data: []
            };
        // console.log(result);
        res.render('main', {result})
    }).catch(err => {
        console.log(err);
        var result = {
            success: false,
            data: []
        };
        res.render('main', {result})
    })
})

app.listen(port, (err) => {
    if (err) console.log(err);
    else {
        console.log('Server listening on port', port);
    }
})