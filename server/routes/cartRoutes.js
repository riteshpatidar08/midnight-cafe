import express from 'express' ;
import { AddToCart, getCart } from '../controllers/cartController.js';


const router = express.Router() ;


router.post('/addToCart' , AddToCart ) ;
router.post('/getCart' , getCart)
export default router