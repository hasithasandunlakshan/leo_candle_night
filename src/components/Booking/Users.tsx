import React, { useContext, useState } from 'react';
import { CartContext } from '@/context/userOrder';
import { UserDetails } from './UserDetails';
import OrderSummary from '../OrderSummery/OrderSummary';
import { Button } from '../ui/button';
import FoodList from '../meal/FoodList';

export default function Users() {

  const useOrder = useContext(CartContext);
  const [isSeatOpen, setSeatOpen] = useState(false);
  const [selectedFoods, setSelectedFoods] = useState<any[]>(useOrder?.cartLocal || []);
  const [price, setPrice] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0); // This should work now
  const handleFoodSelect = (cart: any[]) => {
    const totalPrice = useOrder?.totalPrice||0;
   
    setSelectedFoods(useOrder?.cartLocal ?? cart);
    setPrice(totalPrice);
    // form.setValue("totalprice", totalPrice); // Set the total price in the form
    // form.setValue("foodList", useOrder?.cartLocal?.map(item => item.name) || []); // Set food list based on selected items
    setSeatOpen(false);
  };


  return (


          // <UserDetails />

          <div className=" absolute  top-0 right-0 left-0 z-50 bg-primary ">
          <div className="flex flex-col h-full">
            <div className="sticky top-0 z-10 flex justify-between items-center p-4 border-b border-secondary bg-primary">
              <h2 className="text-sm sm:text-xl font-semibold text-secondary">
                Select Your Meals
              </h2>
              <Button
                // onClick={() => setSeatOpen(false)}
                className="bg-secondary text-primary hover:bg-secondary/90"
              >
                Back
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto ">
              <div className=" mx-auto px-4 ">
                <FoodList FinalFood={handleFoodSelect} />
              </div>
            </div>
          </div>
        </div>

  );
}
