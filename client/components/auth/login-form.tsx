"use client"

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
    const form = useForm<LoginFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onSubmit = (data: LoginFormValues) => {
        console.log(data);
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
                                    <Input placeholder="...email or username" {...field} />
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
