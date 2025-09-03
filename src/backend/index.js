import express from 'express';
import cors from 'cors';
import connectToMongoDb from './db/db.js';
import authRouter from './routes/auth.js';
import adminRouter from './routes/admin.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRouter);       // Auth API: login/register
app.use('/api/admin', adminRouter);     // Admin API: get users, expenses, etc.

// Default route to check server
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Error handling for unknown routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start server
app.listen(5000, () => {
  connectToMongoDb();
  console.log("Server is running on http://localhost:5000");
});
