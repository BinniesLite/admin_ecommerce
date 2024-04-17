import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Separator } from "./ui/separator"

import { Social } from "./social"

import Link from "next/link"

interface CardWrapperProps {
    headerLabel: string,
    headerDescription: string,
    showSocial?: boolean,
    children: React.ReactNode,
    hrefBackLabel?: string,
    hrefBackLink: string
}

export const CardWrapper: React.FC<CardWrapperProps> = ({
    headerLabel,
    headerDescription,
    showSocial,
    children,
    hrefBackLabel,
    hrefBackLink
}) => {

    return (<Card>
        <CardHeader>
            <CardTitle>{headerLabel}</CardTitle>
            <CardDescription>{headerDescription}</CardDescription>
        </CardHeader>

        <CardContent>
            {children}
            <Separator className="my-2" />
        </CardContent>

        <CardFooter className="flex flex-col space-y-2">
            {showSocial &&
                <Social />
            }
            <Link className="text-gray-500 hover:font-bold" href={hrefBackLink}>{hrefBackLabel}</Link>
        </CardFooter>
    </Card>)
}