//middleware
//routing
import express from 'express';
import cookieparser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import admin from 'firebase-admin';
const app = express();
import dotenv from 'dotenv';
import cors from 'cors';
import connectMongodb from './config/db.js';
app.use(cookieparser());
app.use(express.json());

//used to parse the cookie from req

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173',
  })
);

dotenv.config();
connectMongodb();

const serviceAccount = {
  type: process.env.TYPE,
  project_id: process.env.PROJECT_ID,
  private_key_id: process.env.PRIVATE_KEY_ID,
  private_key: process.env.PRIVATE_KEY,
  client_email: process.env.CLIENT_EMAIL,
  client_id: process.env.CLIENT_ID,
  auth_uri: process.env.AUTH_URI,
  token_uri: process.env.TOKEN_URI,
  auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
  universe_domain: process.env.UNIVERSE_DOMAIN,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.use('/api/auth', authRoutes);

//health check
app.get('/health', (req, res) => {
  res.send('server is running');
});

export default app;
