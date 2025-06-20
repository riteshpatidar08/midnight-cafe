import express from 'express' ;
import { AddToCart, getCart ,removeItemFromCart } from '../controllers/cartController.js';


const router = express.Router() ;


router.post('/addToCart' , AddToCart ) ;
router.post('/getCart' , getCart) ;
router.post('/removeItem' , removeItemFromCart)
export default router