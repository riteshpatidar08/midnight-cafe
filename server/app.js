//middleware
//routing
import express from 'express';

import authRoutes from './routes/authRoutes.js';
import admin from 'firebase-admin';
const app = express();
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import CartRoutes from './routes/cartRoutes.js';
import connectMongodb from './config/db.js';

import Product from './models/product.js';

app.use(cookieParser());
app.use(express.json());

const bypassCORS = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Cross-Origin-Embedder-Policy', 'unsafe-none')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
};

// Use the middleware
// app.use(bypassCORS);
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

// async function populateRowData() {
//   const product = await Product.create(data);
//   console.log(product);
// }

// const data = {
//   name: 'Cappuccino',
//   description: 'Rich espresso with steamed milk and foam',
//   category: 'coffee',
//   price: 120,
// };

// populateRowData(data)


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.use('/api/auth', authRoutes);
app.use('/api', CartRoutes);
//health check
app.get('/health', (req, res) => {
  res.send('server is running');
});

export default app;





