"use client"

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form"

import { CardWrapper } from "../card-wrapper"

import { Separator } from "@/components/ui/separator";

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
import axios from "axios";
import toast from "react-hot-toast";

const formSchema = z.object({
    email: z.string().email({
        message: "This is not an email you slut"
    }),
    password: z.string().min(8, {
        message: "Password is too short"
    })
})


type LoginFormValues = z.infer<typeof formSchema> 

export const LoginForm = () => {
    const [isPending, startTransition] = useTransition();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const router = useRouter(); 

    const onSubmit = async (data: LoginFormValues) => {
        // router.push("/")
        try {
            setIsLoading(true)
            const user = await axios.post(`${process.env.BASE_URL}/auth/login`, data, { withCredentials: true});
            
            toast.error(user.data.message)

            console.log(user)
            console.log("Get into it yuhhhh")
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
            headerLabel="Login"
            headerDescription="Welcome back!"
            showSocial={true}
            hrefBackLink="/auth/register"
            hrefBackLabel="Don't have an account?"
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
                                    <Input disabled={isLoading} placeholder="...email or username" {...field} />
                                </FormControl>
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
                                    <Input disabled={isLoading} type="password" placeholder="" {...field} />
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
