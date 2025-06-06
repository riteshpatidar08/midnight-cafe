//middleware
//routing
import express from 'express';
import cookieparser from 'cookie-parser';
import authRoutes from './routes/authRoutes';
const app = express();

app.use(express.json())
app.use(cookieparser());

app.use('/api/auth', authRoutes);

//health check
app.get('/health' , (req,res) => {
    res.send('server is running')
})

export default app;
