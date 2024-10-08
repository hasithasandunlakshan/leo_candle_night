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
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { CartContext } from "@/context/userOrder";
import FoodList from "../meal/FoodList";

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  index: z
    .string()
    .regex(/^\d{6}[A-Za-z]$/, {
      message: "Index must be in the format 220356R (6 digits followed by a letter).",
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
  foodList: z.array(z.string()).min(1, { message: "At least one food item must be added." }),
  totalprice: z.number(),
  batch: z.string().min(1, { message: "Please select a batch." }),
  faculty: z.string().min(1, { message: "Please select a faculty." })
});

type FormSchemaType = z.infer<typeof FormSchema>;

interface UserDetailsProps {
  onConfirm: () => void;
  isLastUser: boolean;
}

export function UserDetails({ onConfirm, isLastUser }: UserDetailsProps) {
  
  const router = useRouter();
  const useOrder = useContext(CartContext);
  const [isSeatOpen, setSeatOpen] = useState(false);
  const [selectedFoods, setSelectedFoods] = useState<any[]>([]);
  const [price, setPrice] = useState(0);

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      index: "",
      email: "",
      whatsapp: "",
      department: "",
      foodList: [],
      totalprice: 0,
      batch: "",
      faculty: ""
    },
  });

  const handleFoodSelect = (cart: any[]) => {
    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
   
    setSelectedFoods(cart);
    setPrice(totalPrice);
    form.setValue("totalprice", totalPrice); // Set the total price in the form
    form.setValue("foodList", cart.map(item => item.name)); // Set food list based on selected items
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
        <pre className="bg-black rounded-md p-4">
          <p className="text-white">Your Index Saved {data.index}</p>
          <p className="text-white">Food List: {foodList.join(", ")}</p>
          <p className="text-white">Total Price: {totalPrice}</p>
        </pre>
      ),
    });

    console.log("Submitted food list:", foodList);
    console.log("Total Price:", totalPrice);

    useOrder?.addUser(data);

    if (isLastUser) {
      router.push("/orderdetails"); // Navigate to order details if it's the last user
    }

    onConfirm();
  }

  return (
    <main className="flex min-h-screen w-screen bg-primary items-center justify-center">

      
      <div className="flex flex-col py-20 mt-10 container w-[100%] lg:w-[50%]">
      <h1 className="text-3xl sm:text-4xl  font-bold mb-4 md:text-7xl py-0 text-secondary ">User Details</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
            {/* Username Field */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-secondary">Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Hasitha Sandun Lakshan" className="text-white bg-black border" {...field} />
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
                  <FormLabel className="text-secondary">Index</FormLabel>
                  <FormControl>
                    <Input placeholder="220356R" className="text-white bg-black border" {...field} />
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
                  <FormLabel className="text-secondary">Email</FormLabel>
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
                    <Input placeholder="0761343793" className="text-white bg-black border" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Food List Field */}
            <FormField
              control={form.control}
              name="foodList"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-secondary">Select Food</FormLabel>
                  <FormControl>
                    <div className="flex items-end flex-col gap-2">
                      <p className="w-full py-2  align-middle border-secondary rounded-md justify-start items-center flex text-white bg-black border">
                        <span className="ml-3">{selectedFoods.length > 0 ? selectedFoods.map(food => food.name).join(", ") : "No food selected"}</span>
                      </p>
                      <Button
                        onClick={() => setSeatOpen(!isSeatOpen)}
                        type="button"
                        className="relative w-[40%] px-10   rounded-full isolation-auto z-10 border-2 border-secondary hover:text-white"
                      >
                        Select Meal
                      </Button>
                      {isSeatOpen && (
                        <div className="absolute top-0 right-0 flex items-center justify-center w-full min-h-[200vh]  bg-gray-800 bg-opacity-100 z-30">
                          <FoodList FinalFood={handleFoodSelect} />
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Department Field */}
            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-secondary">Department</FormLabel>
                  <FormControl>
                    <Select value={field.value || ""} onValueChange={(value) => field.onChange(value)} >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Departments</SelectLabel>
                          <SelectItem value="CS">Computer Science</SelectItem>
                          <SelectItem value="IT">Information Technology</SelectItem>
                          <SelectItem value="ENG">Engineering</SelectItem>
                          <SelectItem value="MATH">Mathematics</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Batch Field */}
            <FormField
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
                          <SelectItem value="19">Batch 19</SelectItem>
                          <SelectItem value="20">Batch 20</SelectItem>
                          <SelectItem value="21">Batch 21</SelectItem>
                          <SelectItem value="22">Batch 22</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Faculty Field */}
            <FormField
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
            />

           

      
<div className="flex items-end justify-end">
              <Button type="submit" className="px-8 py-1 rounded-full bg-secondary text-white">
                {isLastUser ? "Submit" : "Next"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </main>
  );
}

export default UserDetails;
