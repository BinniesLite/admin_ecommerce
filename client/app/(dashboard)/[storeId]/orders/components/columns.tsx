"use client"

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./self-actions";

export type OrderColumn = {
    id: string,
    phone: string,
    address: string,
    isPaid: boolean,
    products: string[],
    totalPrice: string,
    createdAt: string
}

export const columns: ColumnDef<OrderColumn>[] = [
    {
        accessorKey: "products",
        header: "Products"
    },
    {
        accessorKey: "phone",
        header: "Phone"
    },
    {
        accessorKey: "address",
        header: "Address"
    },
    {
        accessorKey: "price",
        header: "Price"
    },
    {
        accessorKey: "isPaid",
        header: "Paid"
    },
    {
        accessorKey: "createdAt",
        header: "Date"
    }
]