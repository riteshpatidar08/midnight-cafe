import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {Trash2, Coffee, Plus, Minus, ShoppingCart, Star, Trash } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { addToCart, getCart , removeItemFromCart } from '../redux/features/CartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getCookie } from './../../utils/utils.js';

const menuItems = [
  {
    id: '1',
    name: 'Cappuccino',
    description: 'Rich espresso with steamed milk and foam',
    price: 4.5,
    category: 'Coffee',
    rating: 4.8,
    popular: true,
  },
  {
    id: '2',
    name: 'Latte',
    description: 'Smooth espresso with steamed milk',
    price: 5.0,
    category: 'Coffee',
    rating: 4.7,
  },
  {
    id: '3',
    name: 'Americano',
    description: 'Bold espresso with hot water',
    price: 3.5,
    category: 'Coffee',
    rating: 4.5,
  },
  {
    id: '4',
    name: 'Croissant',
    description: 'Buttery, flaky French pastry',
    price: 3.0,
    category: 'Pastries',
    rating: 4.6,
  },
  {
    id: '5',
    name: 'Blueberry Muffin',
    description: 'Fresh baked muffin with blueberries',
    price: 4.0,
    category: 'Pastries',
    rating: 4.4,
  },
  {
    id: '6',
    name: 'Avocado Toast',
    description: 'Smashed avocado on sourdough bread',
    price: 8.5,
    category: 'Food',
    rating: 4.7,
    popular: true,
  },
];

const categories = ['All', 'Coffee', 'Pastries', 'Food'];

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const dispatch = useDispatch();
  const { cart, totalCartItems } = useSelector((state) => state.cart);
  console.log(cart, totalCartItems);
  const userId = getCookie('id');

  useEffect(() => {
    dispatch(getCart(userId));
  }, [dispatch, userId]);

  const addToCartt = (item) => {
    console.log(item);

    const payload = {
      userId,
      productId: '6853d475561f266080470239',
      quantity: 1,
    };
    dispatch(addToCart(payload))
      .unwrap()
      .then(() => dispatch(getCart(userId)));
  };
const removeCart  = () => {
 const payload = {userId  , productId: '6853d475561f266080470239'}
 dispatch(removeItemFromCart(payload)).unwrap().then(()=>dispatch(getCart(userId)))
}
  return (
    <div className="min-h-screen text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Coffee className="w-12 h-12 text-orange-500" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              MIDNIGHT CAFE BLOOM
            </h1>
          </div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Welcome to our coffee paradise. Discover handcrafted beverages and
            freshly baked treats.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-8">
          <div className="flex gap-2 p-1 bg-gray-900/50 rounded-xl backdrop-blur-sm">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? 'default' : 'ghost'}
                className={`transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-orange-500 hover:bg-orange-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Menu Items */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-8">
          {menuItems.map((item) => (
            <Card
              key={item.id}
              className="bg-gray-900/50 border-gray-800 backdrop-blur-sm hover:bg-gray-800/50 transition-all duration-300 hover:scale-105 hover:shadow-xl group"
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-white text-lg font-semibold">
                        {item.name}
                      </CardTitle>
                      {item.popular && (
                        <Badge className="bg-orange-500/20 text-orange-400 text-xs border-orange-500/30">
                          Popular
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-yellow-400 text-sm font-medium">
                        {item.rating}
                      </span>
                    </div>
                  </div>
                  <Coffee className="w-8 h-8 text-orange-400/50 group-hover:text-orange-400 transition-colors" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300 text-sm leading-relaxed">
                  {item.description}
                </p>

                <div className="flex justify-between items-center">
                  <span className="text-orange-400 font-bold text-xl">
                    ${item.price.toFixed(2)}
                  </span>
                  <Button
                    onClick={() => addToCartt(item)}
                    className="bg-orange-500 hover:bg-orange-600 text-white transition-all duration-200 hover:scale-105"
                    size="sm"
                  >
                    <Plus className="w-4 h-4" />
                    Add
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Floating Cart Button */}
        {cart?.items?.length > 0 && (
          <Sheet>
            <SheetTrigger asChild>
              <Button className="fixed bottom-6 right-6 bg-orange-500 hover:bg-orange-600 text-white rounded-full p-4 shadow-2xl hover:scale-110 transition-all duration-200 z-50">
                <ShoppingCart className="w-6 h-6" />
                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs min-w-[1.5rem] h-6 rounded-full flex items-center justify-center">
                  {totalCartItems}
                </Badge>
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-gray-900 border-gray-800 text-white">
              <SheetHeader>
                <SheetTitle className="text-white text-xl">
                  Your Order
                </SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                {cart?.items?.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg"
                  >
                    <div className="flex-1">
                      <h3 className="font-medium text-white">
                        {item.productId.name}
                      </h3>
                      <p className="text-orange-400 font-semibold">
                        ${item.productId.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Trash2 onClick={()=>removeCart()} className='text-red-500 hover:scale-110 transition-all duration-150 ease-in-out cursor-pointer'/>
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-8 h-8 p-0 border-gray-600 text-gray-300 hover:bg-gray-700"
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="w-8 text-center text-white font-medium">
                        {item.quantity}
                      </span>
                      <Button
                        size="sm"
                        variant="outline"
                        // onClick={() => updateQuantity(item.id, 1)}
                        className="w-8 h-8 p-0 border-gray-600 text-gray-300 hover:bg-gray-700"
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
                <div className="border-t border-gray-700 pt-4">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span className="text-white">Total:</span>
                    <span className="text-orange-400">
                      ${cart.totalPrice.toFixed(2)}
                    </span>
                  </div>
                  <Button className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white">
                    Place Order
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        )}
      </div>
    </div>
  );
};

export default Menu;
