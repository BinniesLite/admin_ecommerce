import { UserButton, auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { MainNav } from "@/components/main-nav";
import StoreSwitcher from "@/components/store-switcher";
import prismaDB from "@/lib/prisma";

const Navbar = async () => {
    const { userId } = auth(); 

    if (!userId) {
        redirect("/sign-in");
    }

    const stores = await prismaDB.store.findMany({
        where: {
            userId
        }
    })


    return <div className="border-b">
        <div className="flex h-16 items-center px-4 gap-2">
            <StoreSwitcher items={stores} />
            <MainNav />
            <div className="ml-auto flex items-center space-x-4">
                <UserButton afterSignOutUrl="/" />
            </div>
        </div>
    </div>;
}
 
export default Navbar;