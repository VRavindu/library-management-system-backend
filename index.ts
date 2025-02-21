import express from 'express';
import userRoutes from "./routes/user-routes";
import bookRoutes from "./routes/book-routes";
import memberRoutes from "./routes/member-routes";
import borrowRoutes from "./routes/borrow-routes";

const app = express();

app.use('/', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, content-type');
    next();
});

app.use(express.json());

app.use('/user', userRoutes)
app.use('/book', bookRoutes)
app.use('/member', memberRoutes)
app.use('/borrow', borrowRoutes)

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
