import React from 'react';

interface FoodCardProps {
  food: {
    id: number;
    name: string;
    price: number;
  };
  onAddToCart: (food: { id: number; name: string; price: number }) => void;
}

const FoodCard: React.FC<FoodCardProps> = ({ food, onAddToCart }) => {
  return (
 

      <div className="w-64 border border-secondary h-72 bg-white m-2 shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
        <a href="#">
            <img src="https://images.unsplash.com/photo-1649261191606-cb2496e97eee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NDR8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                    alt="Product" className="h-40 w-full  object-cover rounded-t-xl" />
            <div className="px-4 py-3 w-64">
               
                <p className="text-lg font-bold text-black truncate block capitalize">{food.name}</p>
              
                    <p className="text-lg font-semibold text-black cursor-auto ">Rs:{food.price.toFixed(2)}</p>
            


            <div className="flex w-full  justify-center items-center">
            <button
        onClick={() => onAddToCart(food)}
        className="hover:bg-secondary text-white px-4 py-2 w-full rounded-md bg-primary transition duration-200"
      >
        Add to Cart
      </button>
            </div>


           
            </div>
 

        </a>
    </div>
  
  );
};

export default FoodCard;