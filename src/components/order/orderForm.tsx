"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

export function  OrderForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // })

    router.push(`/orderdetails/${data.username}`)
  }


  const router=useRouter();

  return (

    <div className="flex min-h-screen bg-primary items-center justify-center">
  <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6  flex  flex-col">
       
      
         <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem >
              <FormLabel className=" text-secondary">Username</FormLabel>
              <FormControl className="border-secondary">
                <Input placeholder="220356R" className="  text-white bg-black  border" {...field} />
              </FormControl>
            
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-end justify-center  sm:justify-end">
        <button type="submit"
  className="relative px-8 py-1 max-w-48 rounded-full  isolation-auto z-10 border-2 border-secondary before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full hover:text-white before:-right-full before:hover:right-0 before:rounded-full before:bg-secondary before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700 inline-flex items-center justify-center  text-sm font-semibold text-black bg-white   shadow-sm gap-x-2 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
>
  Get Ticket Details
</button>
        </div>
      

      </form>
    </Form>
    </div>
  
  )
}
