import express from 'express'
import cors from 'cors';

const app = express();
const PORT = 6900;

app.use(cors());
app.use(express.json())

const startServer = async () => {
    try {
        app.listen(PORT, () => console.log(`Server running on on port ${PORT} `));
    } catch (error) {
        console.error(`Error starting server: ${error}`);
    }
}

startServer();
