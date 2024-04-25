import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import prismaDB from '@/lib/prisma';
import Navbar from '@/components/navbar';

export default async function DashboardLayout({
    children,
    params
}: {
    children: React.ReactNode,
    params: {storeId: string}
}) {
    // const { userId } = auth();
    // // console.log("[Dasboard]/[store_Id]","User",userId);
    // if (!userId) {
    //     redirect("/sign-in");
    // };

    // const store = await prismaDB.store.findFirst({
    //     where: {
    //         id: params.storeId,
    //         userId
    //     }
    // })
    
    // // console.log("[Dasboard]/[store_Id]", "Store", store);
    // if (!store) {
    //     redirect("/");
    // }

    return <>
        <Navbar/>
        {children}
        </>
}