import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import prisma from "../../../lib/prismadb";
import { Day } from "@prisma/client"
import { authOptions } from "../../../lib/auth";


export const POST = async (req: Request) => {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    try {
        const body = await req.json()
        const { startTime, endTime } = body

        const user = await prisma.user.findFirst({ where: { email: session.user.email } })

        if (!user) {
            return new NextResponse("User not found", { status: 404 })
        }

        const availability = await prisma.availability.upsert({
            where: { userId: user.id },
            update: { 
                startTime, 
                endTime,
                days: ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"] as Day[],
            },
            create: {
                userId: user.id,
                startTime,
                endTime,
                days: ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"] as Day[],

            },
        })

        return NextResponse.json(availability)
    } catch (error) {
        console.error("ERROR_SAVING_AVAILABILITY", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}


export const GET = async () => {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
        return new NextResponse(" Unauthorized", { status: 401 })
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
            include: { availability: true }
        })

        if (!user || !user.availability) {
            return NextResponse.json({ startTime: "09:00", endTime: "17:00" })
        }

        return NextResponse.json(user.availability)
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}

