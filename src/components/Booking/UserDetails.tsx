"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CartContext } from "@/context/userOrder";
import FoodList from "../meal/FoodList";
import { ShoppingCartIcon } from "lucide-react";
const isValidSLNIC = (nic: string) => {
  // Remove any spaces or special characters
  nic = nic.trim().replace(/[^0-9vVxX]/g, '');
  
  // Old format: 9 digits + V/X
  const oldFormatRegex = /^[0-9]{9}[vVxX]$/;
  // New format: 12 digits
  const newFormatRegex = /^[0-9]{12}$/;
  
  return oldFormatRegex.test(nic) || newFormatRegex.test(nic);
};

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  index: z
  .string()
  .refine((val) => isValidSLNIC(val), {
    message: "Please enter a valid NIC number (old format: 982345678V or new format: 199823456780)",
  })
  .transform(val => {
    // Normalize NIC format (remove spaces, uppercase V)
    val = val.trim().replace(/\s/g, '');
    return val.length === 10 ? val.toUpperCase() : val;
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  whatsapp: z
    .string()
    .regex(/^\d{10}$/, {
      message: "Please enter a valid 10-digit phone number.",
    }),
  department: z.string().min(1, { message: "Please select a department." }),
  foodList: z.union([
    z.string().min(0, { message: "Food item must be provided." }),
    z.array(z.string()).min(0, { message: "At least one food item must be added." })
  ]),
  totalprice: z.number(),
  // batch: z.string().min(1, { message: "Please select a batch." }),
  // faculty: z.string().min(1, { message: "Please select a faculty." })
});

type FormSchemaType = z.infer<typeof FormSchema>;

// interface UserDetailsProps {
//   onConfirm: () => void;
//   isLastUser: boolean;
// }

export function UserDetails() {
  
  const router = useRouter();
  const useOrder = useContext(CartContext);
  const [isSeatOpen, setSeatOpen] = useState(false);
  const [selectedFoods, setSelectedFoods] = useState<any[]>(useOrder?.cartLocal || []);
  const [price, setPrice] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);

 

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: useOrder?.name,
      index: useOrder?.index,
      email: "",
      whatsapp: "",
      department: "",
      foodList: useOrder?.cartLocal?.map(item => item.name),
      totalprice: 0,
      // batch: "",
      // faculty: ""
    },
  });

  const handleFoodSelect = (cart: any[]) => {
    const totalPrice = useOrder?.totalPrice||0;
   
    setSelectedFoods(useOrder?.cartLocal ?? cart);
    setPrice(totalPrice);
    form.setValue("totalprice", totalPrice); // Set the total price in the form
    form.setValue("foodList", useOrder?.cartLocal?.map(item => item.name) || []); // Set food list based on selected items
    setSeatOpen(false);
  };

  function onSubmit(data: FormSchemaType) {
    const foodList = data.foodList;
    const totalPrice = data.totalprice;

    if(useOrder?.name === ""){
      useOrder.setName(data.username);
      useOrder.setIndex(data.index);
    }

    toast({
      className: "bg-primary",
      description: (
        <pre className="bg-black   flex gap-2 items-center justify-center align-middle  rounded-md p-1">
          <ShoppingCartIcon className="w-6 h-6 text-secondary" />
          <p className="text-secondary">Order Created</p>
          {/* <p className="text-white">Food List: {foodList.join(", ")}</p>
          <p className="text-white">Total Price: {totalPrice}</p> */}
        </pre>
      ),
    });

    //console.log("Submitted food list:", foodList);
    //console.log("Total Price:", totalPrice);

    useOrder?.addUser(data);

   
      router.push("/orderdetails/ordersummery"); // Navigate to order details if it's the last user
    

   
  }

  useEffect(() => {
    // When food list is open, prevent body scrolling
    if (isSeatOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isSeatOpen]);

  if(isSeatOpen){
    return(

<div className=" bg-primary flex flex-col min-h-screen absolute    z-[1000] w-screen">
          <div className="sticky top-0   flex justify-between items-center p-4 bg-primary border-b border-secondary">
            <h2 className="text-xl font-bold text-secondary">Select Your Meals</h2>
            <Button
              onClick={() => setSeatOpen(false)}
              className="bg-secondary text-primary hover:bg-secondary/90"
            >
              Close
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <div className="container mx-auto p-4">
              <FoodList FinalFood={handleFoodSelect} />
            </div>
          </div>
        </div>
    )
  }
  return (
    <main className="flex min-h-screen w-screen items-center justify-center">


      <div className="flex flex-col py-20 mt-10 container w-[100%] lg:w-[50%]">
      <h1 className="text-3xl sm:text-4xl  font-bold mb-4 md:text-7xl py-0 text-secondary ">Guest Information</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
            {/* Username Field */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-secondary">Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Full name" className="text-white bg-black border" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Index Field */}
            <FormField
              control={form.control}
              name="index"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-secondary">National Identity Card Number</FormLabel>
                  <FormControl>
                    <Input placeholder="***********" className="text-white bg-black border" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-secondary">Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" className="text-white bg-black border" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* WhatsApp Field */}
            <FormField
              control={form.control}
              name="whatsapp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-secondary">WhatsApp</FormLabel>
                  <FormControl>
                    <Input placeholder="0000000000" className="text-white bg-black border" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Food List Field */}
           



            {/* Department Field */}
            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-secondary">Membership Status</FormLabel>
                  <FormControl>
                    <Select value={field.value || ""} onValueChange={(value) => field.onChange(value)} >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Membership Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>select one</SelectLabel>
                          <SelectItem value="LeoClubMora">Member of Leo Club of University of Moratuwa</SelectItem>
                          <SelectItem value="AnotherLeo">Member of Another Leo Club</SelectItem>
                          <SelectItem value="Student">Student at University of Moratuwa</SelectItem>
                          
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Batch Field */}
            {/* <FormField
              control={form.control}
              name="batch"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-secondary">Batch</FormLabel>
                  <FormControl>
                    <Select value={field.value || ""} onValueChange={(value) => field.onChange(value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a batch" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Batch</SelectLabel>
                          <SelectItem value="20">Batch 20</SelectItem>
                          <SelectItem value="21">Batch 21</SelectItem>
                          <SelectItem value="22">Batch 22</SelectItem>
                          <SelectItem value="23">Batch 23</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            {/* Faculty Field */}
            {/* <FormField
              control={form.control}
              name="faculty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-secondary">Faculty</FormLabel>
                  <FormControl>
                    <Select value={field.value || ""} onValueChange={(value) => field.onChange(value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a faculty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Faculty</SelectLabel>
                          <SelectItem value="Science">Faculty of Science</SelectItem>
                          <SelectItem value="Engineering">Faculty of Engineering</SelectItem>
                          <SelectItem value="IT">Faculty of Information Technology</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

           
<FormField
              control={form.control}
              name="foodList"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-secondary">Choose Your Meal</FormLabel>
                  <FormControl>
                    <div className="flex items-end flex-col gap-2">
                      <p className="w-full py-2 align-middle border-secondary rounded-md items-center flex text-white bg-black border">
                        <span className="ml-3 break-words">
                          {selectedFoods.length > 0 
                            ? selectedFoods.map(food => food.name).join(", ") 
                            : "No food selected"}
                        </span>
                      </p>
                      <Button
                        onClick={() => setSeatOpen(true)}
                        type="button"
                        className="relative w-48 px-10 rounded-lg isolation-auto z-10 border-2 border-secondary hover:text-white"
                      >
                        Select Meal
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
      
<div className="flex items-end justify-center md:justify-end">
              <Button type="submit" className="px-10 py-1 rounded-lg hover:bg-secondary hover:text-primary bg-transparent border border-white w-48 text-white">
          NEXT
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </main>
  );
}

export default UserDetails;
