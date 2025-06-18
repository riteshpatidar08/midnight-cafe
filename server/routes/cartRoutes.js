import express from 'express' ;
import { AddToCart } from '../controllers/cartController';


const router = express.Router ;


router.post('/addToCart' , AddToCart ) ;

export default router