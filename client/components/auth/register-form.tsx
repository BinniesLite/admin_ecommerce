"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form"

import { CardWrapper } from "../card-wrapper"

import { 
    Form, 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel,
    FormMessage
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const formSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address."
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters long."
    }),
    repeatedPassword: z.string()
}).refine(data => data.password === data.repeatedPassword, {
    message: "Passwords do not match.", 
    path: ["repeatedPassword"] // This helps to associate the error with the repeatedPassword field specifically
});

type RegisterFormValues = z.infer<typeof formSchema> 

export const RegisterForm = () => {
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onSubmit = async (data: RegisterFormValues) => {
        // router.push("/")
        try {
            setIsLoading(true)
            const user = await axios.post(`http://localhost:4000/api/auth/register`, data, { withCredentials: true});
            console.log(user)
          
            // if (user) {
            //     router.push("/");
            // }
            // else {
        //     toast.error("User Error you no slay")
            // }
        } catch (error) {
            toast.error("Something is wrong yuhhh")
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    } 

    return (
        <CardWrapper
            headerLabel="Register"
            headerDescription="Welcome back!"
            showSocial={true}
            hrefBackLink="/auth/login"
            hrefBackLabel="Have an account?"
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Username or Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="...email or username" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

<FormField
                        control={form.control}
                        name="repeatedPassword"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Re-enter Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <Button className="w-full" type="submit">Login</Button>
                </form>

            </Form>
        </CardWrapper>
    ) 
}
