"use server"


import prisma from "@/lib/prismadb"


export async function createBooking(data : {
    username : string
    date : Date
    timeSlot : string
    guestName : string
    guestEmail : string
}) {
    try {
        const host = await prisma.user.findFirst({
            where : { name : { contains : data.username.replace("-", " "), mode : 'insensitive'}}
        })

        if ( !host ) throw new Error("host not found")

        const booking = await prisma.booking.create({
            data : {
                userId: host.id,
                date: data.date,
                timeSlot: data.timeSlot,
                guestName: data.guestName,
                guestEmail: data.guestEmail,
            }
        })

        return { success: true, booking };
    } catch (error) {
        console.error("Booking Error:", error);
        return { success: false };
    }
}