"use server" 

import { prisma } from "@/lib/prismadb"


export async function getUserAvailability( username : string ) {
    const user = await prisma.user.findUnique({
        where : {  username },
        include : { availability : true,}
    })

    return user?.availability || []
}