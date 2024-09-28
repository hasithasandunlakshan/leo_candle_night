"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CartContext } from "@/context/userOrder";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
  seats: z
    .string()
    .min(1, {
      message: "You must book at least 1 seat.",
    })
    .max(10, {
      message: "You cannot book more than 10 seats.",
    }),
});

export function UserDetails() {
  const router = useRouter();
  const userOrder = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(true);
  const[food,selectfood]=useState();
  const [isSeatOpen, setSeatOpen] = useState(false)
  const [selectedSeat, setSelectedSeat] = useState<string | undefined>(userOrder?.seats || ""); // Default to an empty string

  const [meal,setMeal]=useState([]);

  const handleSeatSelection = (seatNumber: any) => {
    setSelectedSeat(seatNumber);
    setSeatOpen(false); // Close seat selection after selecting a seat
    form.setValue('seats', seatNumber.toString()); // Update the form's seats field
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: userOrder?.name || "",
      index: userOrder?.index || "",
      email: userOrder?.email || "",
      seats: userOrder?.seats || selectedSeat,
    },
  });

  useEffect(() => {
    if (userOrder) {
      console.log("User order data:", userOrder);
      form.reset({
        username: userOrder.name || "",
        index: userOrder.index || "",
        email: userOrder.email || "",
        seats: userOrder.seats || "",
      });
      setIsLoading(false); // Only proceed when data is available
    } else {
      console.log("UserOrder is null");
    }
  }, [userOrder, form]);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast ({
    className:"bg-primary ",
      description: (
        <pre className=" bg-secondary  rounded-md  p-4">
      <p  className=" text-white">Your Index Saved {data.index}</p>
        </pre>
      ),
    });

    // Update context using setter functions
    if (userOrder) {
      userOrder.setIndex(data.index);
      userOrder.setEmail(data.email);
      userOrder.setName(data.username);
      if (selectedSeat) {
        userOrder.setSeats(selectedSeat.toString());
      } else {
        // Handle the case when selectedSeat is undefined, e.g., set a default value or show a message
        userOrder.setSeats(""); // or however you want to handle it
      }
    }

    router.push("/bookseat/selectmeal");
  }

  if (isLoading) {
    return <div>Loading...</div>; // Show a loading state until the form is ready
  }

  return (
    <main className="flex min-h-screen bg-primary items-center justify-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-secondary">Username</FormLabel>
                <FormControl className="border-secondary">
                  <Input
                    placeholder="Hasitha Sandun Lakshan"
                    className="text-white bg-black border"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="index"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-secondary">Index</FormLabel>
                <FormControl className="border-secondary">
                  <Input
                    placeholder="220356R"
                    className="text-white bg-black border"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-secondary">Email</FormLabel>
                <FormControl className="border-secondary">
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    className="text-white bg-black border"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />



          <FormField
            control={form.control}
            name="seats"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-secondary">Select Seat</FormLabel>
                <FormControl className="border-secondary">
                <div className="flex gap-2">
  <p className="w-full align-middle border-secondary rounded-md  justify-start items-center flex text-white bg-black border">
   <span className="ml-3">
   {selectedSeat || "No seat selected"}
    </span>
  </p>
  <Button
    onClick={() => setSeatOpen(!isSeatOpen)}
    type="button"
    className="relative px-8 py-1 rounded-full isolation-auto z-10 border-2 border-secondary hover:text-white"
  >
    Select Seat
  </Button>
  {isSeatOpen && (
    <div className="absolute inset-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-80 z-30">
      {/* <div className="bg-white p-4 rounded shadow-lg">
        {[...Array(20).keys()].map((seatNumber) => (
          <Button
            key={seatNumber + 1}
            onClick={() => handleSeatSelection(seatNumber + 1)}
            className={`w-10 h-10 m-2 rounded ${
              selectedSeat === (seatNumber + 1).toString()
                ? 'bg-blue-500 text-white'
                : 'bg-gray-300 text-black'
            }`}
          >
            {seatNumber + 1}
          </Button>
        ))}
      </div> */}
    </div>
  )}
</div>


            
             

                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
{/* 

<FormField
            control={form.control}
            name="seats"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-secondary">Select Seat</FormLabel>
                <FormControl className="border-secondary">
                  <Input
                    placeholder="1"
                    className="text-white bg-black border"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
      




 */}
   <FormField
            control={form.control}
            name="seats"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-secondary">Select Seat</FormLabel>
                <FormControl className="border-secondary">
                <div className="flex gap-2">
  <p className="w-full align-middle border-secondary rounded-md  justify-start items-center flex text-white bg-black border">
   <span className="ml-3">
   {selectedSeat || "No seat selected"}
    </span>
  </p>
  <Button
    onClick={() => setSeatOpen(!isSeatOpen)}
    type="button"
    className="relative px-8 py-1 rounded-full isolation-auto z-10 border-2 border-secondary hover:text-white"
  >
    Select Food
  </Button>
  {isSeatOpen && (
    <div className="absolute inset-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-80 z-30">
      <div className="bg-white p-4 rounded shadow-lg">
        {[...Array(20).keys()].map((seatNumber) => (
          <Button
            key={seatNumber + 1}
            onClick={() => handleSeatSelection(seatNumber + 1)}
            className={`w-10 h-10 m-2 rounded ${
              selectedSeat === (seatNumber + 1).toString()
                ? 'bg-blue-500 text-white'
                : 'bg-gray-300 text-black'
            }`}
          >
            {seatNumber + 1}
          </Button>
        ))}
      </div>
    </div>
  )}
</div>


            
             

                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />









          <div className="flex items-end justify-center sm:justify-end">
            <Button
              type="submit"
              className="relative px-8 py-1 rounded-full isolation-auto z-10 border-2 border-secondary before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full hover:text-white before:-right-full before:hover:right-0 before:rounded-full before:bg-secondary before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700 inline-flex items-center justify-center text-sm font-semibold text-black bg-white shadow-sm gap-x-2 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
            >
              Confirm 
            </Button>
          </div>
        </form>
      </Form>


      
    </main>
  );
}
