import express from 'express';
import { Record } from '../models/returnModel.js';

const router = express.Router();

// Route for saving a new return
router.post('/', async (request, response) => {
    try {
        const { ID, productName, Description, UploadImage } = request.body;

        if (!ID || !productName || !Description || !UploadImage) {
            return response.status(400).send({
                message: 'Please send all required fields: ID, productName, Description, UploadImage',
            });
        }

        const newReturn = { ID, productName, Description, UploadImage };
        const savedReturn = await Return.create(newReturn);

        return response.status(201).send(savedReturn);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for getting all returns from the database
router.get('/', async (request, response) => {
    try {
        const returns = await Return.find({});

        return response.status(200).json({
            count: returns.length,
            data: returns
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for getting one return from the database by ID
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const returnItem = await Return.findById(id);

        if (!returnItem) {
            return response.status(404).json({ message: 'Return not found' });
        }

        return response.status(200).json(returnItem);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for updating a return
router.put('/:id', async (request, response) => {
    try {
        const { ID, productName, Description, UploadImage } = request.body;

        if (!ID || !productName || !Description || !UploadImage) {
            return response.status(400).send({
                message: 'Please send all required fields: ID, productName, Description, UploadImage',
            });
        }

        const { id } = request.params;
        const updatedReturn = await Return.findByIdAndUpdate(id, request.body, { new: true });

        if (!updatedReturn) {
            return response.status(404).json({ message: 'Return not found' });
        }

        return response.status(200).send({
            message: 'Return updated successfully',
            data: updatedReturn
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for deleting a return
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const result = await Return.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: 'Return not found' });
        }

        return response.status(200).send({ message: 'Return deleted successfully' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;
