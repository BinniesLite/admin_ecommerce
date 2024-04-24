import { cookies } from "next/headers";

const AuthLayout =  ({
    children
}: {
    children: React.ReactNode
}) => {

    console.log(cookies);

    return (<div className="h-[100vh] w-full flex justify-center items-center bg-[#CDB4DB] overflow-hidden">
        {children}
    </div>)
}

export default AuthLayout;