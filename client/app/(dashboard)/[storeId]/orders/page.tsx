import { format } from 'date-fns';

import prismaDB from "@/lib/prisma";
// components
import { OrderClient } from "./components/client";

// type
import { OrderColumn } from "./components/columns";

import { formatter } from '@/lib/utils';

const OrdersPage = async ({ params }: {params: { storeId: string}}) => {
  
  const orders = await prismaDB.order.findMany({
    where: {
      storeId: params.storeId
    },
    include: {
      orderItem: {  
        include: {
          product: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  })

  const formattedOrders: OrderColumn[] = orders.map((item) => ({
    id: item.id,
    phone: item.phone,
    address: item.address,
    products: item.orderItem.map((orderItem) => orderItem.product.name),
    totalPrice: formatter.format(item.orderItem.reduce((total, item) => {
      return total + Number(item.product.price)
    }, 0 )),
    isPaid: item.isPaid,
    createdAt: format(item.createdAt, "MMMM do, yyyy")
  }))

  return (
    <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
            <OrderClient data={formattedOrders}/>

        </div>
    </div>
  )
}

export default OrdersPage;