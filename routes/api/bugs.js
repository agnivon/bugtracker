import express from 'express';
import mongoose from 'mongoose';

const uri = `mongodb://localhost:27017/edureka-nodejs`;
let bugsRouter = express.Router();

const bugsSchema = new mongoose.Schema({
    title: String,
    description: String,
    time: {type: Number, default: Date.now()},
    date: {type: Date, default: Date.now},
    assignee: String
});

const Bugs = mongoose.model('Bugs', bugsSchema)

mongoose.connect(uri, (err) => {
    if(err) console.log(err);
    else {
        console.log('Successfully connected to MongoDB');
        bugsRouter.get('/', (req, res) => {
            Bugs.find({}, (err, data) => {
                //console.log('GET bugs')
                if(err) res.json({
                    success: false,
                    data: err
                });
                else res.json({
                    success: true,
                    data
                });
            })
        })

        bugsRouter.post('/', (req, res) => {
            Bugs.create(req.body, (err, data) => {
                if(err) res.json({
                    success: false,
                    data: err
                });
                else res.json({
                    success: true,
                    data
                });
            })
        })

        bugsRouter.put('/:id', (req, res) => {
            Bugs.updateOne({"_id": req.params.id},{$set: req.body},
            {upsert: true}, (err, data) => {
                if(err) res.json({
                    success: false,
                    data: err
                });
                else res.json({
                    success: true,
                    data
                });
            })
        })

        bugsRouter.delete('/:id', (req, res) => {
            Bugs.deleteOne({"_id": req.params.id}, (err, data) => {
                if(err) res.json({
                    success: false,
                    data: err
                });
                else res.json({
                    success: true,
                    data
                });
            })
        })

    }
})

export default bugsRouter;
