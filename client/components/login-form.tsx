import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form"

import { CardWrapper } from "./card-wrapper"


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

    return (
        <CardWrapper
            headerLabel="Login"
            headerDescription="Welcome back!"
            showSocial={true}
        >
            Login Page
        </CardWrapper>
    ) 
}
