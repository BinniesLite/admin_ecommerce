"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form"

import { CardWrapper } from "./card-wrapper"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import { Button } from "./ui/button";
import { FormError } from "./form-error";


const formSchema = z.object({
    email: z.string().min(2).email({
        message: "This is not an email"
    }),
    password: z.string().min(6, {
        message: "Password should be longer"
    })
})


type LoginFormValues = z.infer<typeof formSchema>

export const LoginForm = () => {
    const form = useForm<LoginFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const onSubmit = (data: LoginFormValues) => {
        console.log(data)
    }


    return (
        <CardWrapper
            headerLabel="Login"
            headerDescription="Welcome back!"
            showSocial={true}
        >

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    {/*  */}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email or Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="...username" {...field}></Input>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email or Username</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="...username" {...field}></Input>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button className="w-full" type="submit">Log In</Button>
                    <FormError message="something is wrong"/>
                </form>

            
            </Form>
        </CardWrapper>
    )
}
