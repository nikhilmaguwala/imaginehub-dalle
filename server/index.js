import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from "./mongodb/connect.js";
import postRoutes from './routes/postRoutes.js';
import imagineHubRoutes from './routes/imagineHubRoutes.js';

dotenv.config()

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/imagine', imagineHubRoutes);

app.get('/', (req, res) => {
    res.send('Hello from ImagineHub API');
});



const startServer = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(8080, () => {
            console.log(`Server is listening on http://localhost:8080`);
        });
    } catch (error) {
        console.log(error);
    }
}

startServer();