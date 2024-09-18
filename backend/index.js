import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from 'mongoose';
import { Record } from "./models/returnModel.js";
import returnRoute from './routes/returnRoute.js';
import cors from 'cors';

const app = express();

//middleware for parsing request body
//option 1: Allow All origins with default of cors(*)
app.use(cors());
//option 2: allow custom origins
//app.use(
//....cors({
//.....origin: 'http://localhost:3000',
//......methods: ['get','post','put','delete'],
//......allowedHeaders: ['content-Type'],
//....})
//  ); 

// Middleware for parsing request body
app.use(express.json());

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome to MERN Stack Tutorial');
});

// Route for save a new return record
app.post('/records', async (request, response) => {
    try {
        if (
            !request.body.pid ||
            !request.body.productName ||
            !request.body.description ||
            !request.body.uploadImage
            ) {
            return response.status(400).send({
                message: 'Please send all required fields: pid, name, description, image',
            });
        }
        const newRecords = {
            pid: request.body.pid,
            productName: request.body.productName,
            description: request.body.description,
            uploadImage: request.body.uploadImage,
        };
        const savedRecords = await Record.create(newRecords);

        return response.status(201).send(savedRecords);
    } catch (error) {
        console.log(error.message)
        response.status(500).send({ message: error.message });
    }
});

// Route for all Records from DB
app.get('/records', async (request, response) => {
    try {
        const records = await Record.find({});
        return response.status(200).json(
            {
                count: records.length,
                data: records
            }
        );
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for Get one record from DB by pid
app.get('/records/:id', async (request, response) => {
    try {

        const { id } = request.params;

        const record = await Record.findById(id);
        return response.status(200).json(record);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for Update a record in DB
app.put('/records/:id', async (request, response) => {
    try {
        if (
            !request.body.pid ||
            !request.body.productName ||
            !request.body.description ||
            !request.body.uploadImage
            ) {
            return response.status(400).send({
                message: 'Please send all required fields: pid, name, description, image',
            });
        }
        const { id } = request.params;

        const updatedRecord = await Record.findByIdAndUpdate(id, request.body);

        if (!updatedRecord) {
            return response.status(404).json({ message: 'Record not found' });
        }

        return response.status(200).json({
            message: 'Record updated successfully'
        });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for Delete a record from DB

app.delete('/records/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const deletedRecord = await Record.findByIdAndDelete(id);

        if (!deletedRecord) {
            return response.status(404).json({ message: 'Record not found' });
        }

        return response.status(200).json({
            message: 'Record deleted successfully'
        });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// app.use('/return', returnRoute);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to the database');
        app.listen(PORT, () => {
            console.log(`App is listening on port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Database connection failed:', error.message);
    });

