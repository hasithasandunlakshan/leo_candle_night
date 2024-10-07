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
});

type FormSchemaType = z.infer<typeof FormSchema>;
interface UserDetailsProps {
  onConfirm: () => void;
}

export function UserDetails({ onConfirm }: UserDetailsProps) {
  const router = useRouter();
  const useOrder = useContext(CartContext);
  const [isSeatOpen, setSeatOpen] = useState(false);
  const [selectedFoods, setSelectedFoods] = useState<string[]>([]);

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      index: "",
      email: "",
      whatsapp: "",
      department: "",
      foodList: [],
    },
  });

  const handleFoodSelect = (cart: any[]) => {
    const selectedFoodNames = cart.map((item) => item.name);
    setSelectedFoods(selectedFoodNames);
    form.setValue("foodList", selectedFoodNames);
    setSeatOpen(false);
  };

  function onSubmit(data: FormSchemaType) {
    toast({
      className: "bg-primary",
      description: (
        <pre className="bg-secondary rounded-md p-4">
          <p className="text-white">Your Index Saved {data.index}</p>
        </pre>
      ),
    });

    console.log("Submitted data:", data);
    useOrder?.addUser(data);
    onConfirm();
  }

  return (
    <main className="flex min-h-screen bg-primary items-center justify-center">
      <div className="flex py-20 mt-10 container w-[50%]">
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
                  <FormLabel className="text-secondary">Select Seat</FormLabel>
                  <FormControl>
                    <div className="flex gap-2">
                      <p className="w-full align-middle border-secondary rounded-md justify-start items-center flex text-white bg-black border">
                        <span className="ml-3">{selectedFoods.length > 0 ? selectedFoods.join(", ") : "No food selected"}</span>
                      </p>
                      <Button
                        onClick={() => setSeatOpen(!isSeatOpen)}
                        type="button"
                        className="relative px-8 py-1 rounded-full isolation-auto z-10 border-2 border-secondary hover:text-white"
                      >
                        Select Meal
                      </Button>
                      {isSeatOpen && (
                        <div className="absolute top-0 right-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-80 z-30">
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
                    <Select value={field.value || ""} onValueChange={(value) => field.onChange(value)}>
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

            <div className="flex items-end justify-center sm:justify-end">
              <Button type="submit" className="px-8 py-1 rounded-full bg-secondary text-white">
                Confirm
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </main>
  );
}
