"use client"

import Image from "next/image";

import google from "@/assets/google.png";
import github from "@/assets/github.png";

import { Button } from "./ui/button";

import { signIn } from "@/auth.config"



export const Social = () => {

    const onSignInGoogle = async () => {
        await signIn("google")
    }   
    

    return <div className="flex items-center w-full gap-x-2">
        <Button
            size="icon"
            className="w-[8rem]"
            variant="outline"
            onClick={onSignInGoogle}
        >
            <Image
                src={google}
                alt="google"
                className="h-4 w-4"
            />

        </Button>

        <Button
            className="w-[8rem]"
            variant="outline"
        >
            <Image
                src={github}
                alt="github"
                className="h-4 w-4"
            />

        </Button>

    </div>
}