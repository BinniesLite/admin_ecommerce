
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

interface CardWrapperProps {
    headerLabel: string,
    headerDescription: string,
    showSocial?: boolean,
    children: React.ReactNode
}

export const CardWrapper: React.FC<CardWrapperProps> = ({
    headerLabel,
    headerDescription,
    showSocial,
    children
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



        {showSocial && <CardFooter>
            <Social />
        </CardFooter>}
    </Card>)
}