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
import { useContext, useEffect } from "react";
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

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: userOrder?.name || "",    
      index: userOrder?.index || "",      
      email: userOrder?.email || "",      
      seats: userOrder?.seats || "1",     
    },
  });

  useEffect(() => {
    form;

    console.log(userOrder?.name ,userOrder?.index)
  }, [])

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });

    // Update context with form data
    if (userOrder) {
      userOrder.index = data.index;
      userOrder.email = data.email;
      userOrder.name = data.username;
      userOrder.seats = data.seats.toString();
    }

    router.push("/bookseat/selectmeal");
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
                <FormLabel className="text-secondary">Number of Seats</FormLabel>
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

          <div className="flex  items-end justify-center  sm:justify-end">
          <Button
            type="submit"
            className="relative px-8 py-1 rounded-full isolation-auto z-10 border-2 border-secondary before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full hover:text-white before:-right-full before:hover:right-0 before:rounded-full before:bg-secondary before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700 inline-flex items-center justify-center text-sm font-semibold text-black bg-white shadow-sm gap-x-2 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
          >
            Next
          </Button>
          </div>

       
        </form>
      </Form>
    </main>
  );
}
