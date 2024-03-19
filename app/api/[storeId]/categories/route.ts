import prismaDB from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {
        const { userId } = auth();

        const body = await req.json();

        const { name, billboardId } = body;

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 403 });
        }

        if (!name) {
            return new NextResponse("Name is required", { status: 400 });
        }


        if (!billboardId) {
            return new NextResponse("BillboardId is required", { status: 400 });
        }

        if (!params.storeId) {
            return new NextResponse("Store id is required", { status: 400 });
        }

        const storeByUserId = prismaDB.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })

        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 403 })
        }


        const category = await prismaDB.category.create({
            data: {
                name,
                billboardId,
                storeId: params.storeId
            }
        });

        return NextResponse.json(category);
    } catch (error) {
        console.log("[BILLBOARD_POST]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

// Need to have request and params
export async function GET(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {
      


        const billboard = await prismaDB.billboard.findMany({
            where: { 
                storeId: params.storeId
            }
        })

        return NextResponse.json(billboard);
    } catch (error) {
        console.log("[BILLBOARD_GET]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}