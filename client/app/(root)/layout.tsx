import { auth } from '@clerk/nextjs'; 

import { currentUser } from '@clerk/nextjs';

import { redirect } from 'next/navigation';


import prismaDB from '@/lib/prisma';

import { cookies } from 'next/headers';

import { allowUsersEmail } from '@/constants/allow-user';

import axios from 'axios';


export default async function SetupLayout({children}: {children: React.ReactNode}) {
    
    // return <>
    //     Hello World
    
    // </>



    
    // try {
        
    //     const storeDemo = await axios.get("http://localhost:4000/api/store", {
    //         headers: {
    //             "userId": userId
    //         }
    //     })

    //     console.log("ROOT STORE", storeDemo?.data)
    // } catch (error) {
    //     console.log(error )
    // } 
    


    // const store = await prismaDB.store.findFirst({
    //     where: {
    //         userId: userId
    //     }
    // });

    // if (store) {
    //     redirect(`/${store.id}`);
    // }

    // Let the thought flow to where it comes from nowhere
    return <>
        {children}
    </>
    
}