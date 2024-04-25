
import { MainNav } from "@/components/main-nav";
import StoreSwitcher from "@/components/store-switcher";

import axios from "axios";
import { Store } from "@prisma/client";
import { httpClient } from "@/lib/axios";

export const Navbar = async () => {
    // const { userId } = auth(); 

    console.log(`${process.env.NEXT_PUBLIC_BASE_URL}/store`)
    

    const response = await httpClient.get(`/store`)
    const stores: Store[] = response.data;
    // if (!userId) {
    //     redirect("/sign-in");
    // }
    
    // const stores = await prismaDB.store.findMany({
    //     where: {
    //         userId
    //     }
    // })


    return <div className="border-b">
        <div className="flex h-16 items-center px-4 gap-2">
            <StoreSwitcher items={stores} />
            <MainNav />
            <div className="ml-auto flex items-center space-x-4">
                {/* <UserButton afterSignOutUrl="/" /> */}
            </div>
        </div>
    </div>;
}
 
