import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'; // Import the cors middleware
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import collabRoutes from './routes/collabRoutes.js';
import planningRoutes from './routes/planningRoutes.js'

const port = process.env.PORT || 5000;
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Configure CORS
const allowedOrigins = ['http://localhost:3000'];
app.use(
  cors({
    origin: allowedOrigins,
    changeOrigin: true,
    credentials: true,
    secure: false,
  })
);

app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/collabs', collabRoutes);
app.use('/api/planning', planningRoutes);

if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, '/frontend/dist')));
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));