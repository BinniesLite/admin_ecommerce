"use client"

import { Heading } from "@/components/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

import { OrderColumn, columns } from "./columns";


interface OrderClientProps {
    data: OrderColumn[] 
}

export const OrderClient: React.FC<OrderClientProps> = ({ data }) => {


    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Orders (${data?.length})`}
                    description="Manage orders for your store"
                />
            </div>
            <Separator />
            <DataTable data={data} columns={columns} searchKey="label" />
            
        </>
    )
}
