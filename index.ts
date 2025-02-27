import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes, { authenticateToken } from "./routes/user-routes";
import bookRoutes from "./routes/book-routes";
import memberRoutes from "./routes/member-routes";
import borrowRoutes from "./routes/borrow-routes";
import returnRoutes from "./routes/return-routes";

const app = express();
dotenv.config();

const allowedOrigin = 'http://localhost:5173';

app.use(cors({
    origin: allowedOrigin,
    methods: 'GET,PUT,POST,DELETE',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    credentials: true,
}));

app.use('/uploads', express.static('uploads'));

app.use(express.json());

app.use('/auth', userRoutes);
app.use('/book', bookRoutes);
app.use('/member', memberRoutes);
app.use('/borrow', borrowRoutes);
app.use('/return', returnRoutes);

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
