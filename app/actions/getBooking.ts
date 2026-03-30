"use server"

import prisma from "@/lib/prismadb"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

export async function getUpcomingBookings() {
    const session = await getServerSession(authOptions)

    if (  !session?.user?.email ) return []

    const user = await prisma.user.findUnique({
        where : { email : session.user.email },
        include : { bookings : { orderBy : { date : 'asc' }}}
    })

    return user?.bookings || []
}