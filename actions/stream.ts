"use server"

import { Stream } from "@prisma/client"
import { revalidatePath } from "next/cache"

import { db } from "@/lib/db"
import { getSelf } from "@/lib/auth-service"

export const updateStream = async (values: Partial<Stream>) => {
    try {
        const self = await getSelf();
        const selfStream = await db.stream.findUnique({
            where:{
                userId: self!.id
            }
        })
        console.log("Hellooo1");
        
        if(!selfStream){
            throw new Error("Stream not found")
        }
        console.log("Hellooo2");

        const validData = {
            thumbnailUrl: values.thumbnailUrl,
            name: values.name,
            isChatEnabled: values.isChatEnabled,
            isChatFollowersOnly: values.isChatFollowersOnly,
            isChatDelayed: values.isChatDelayed
        };
        console.log("Hellooo3");

        const stream = await db.stream.update({
            where:{
                id: selfStream.id
            },
            data:{
                ...validData
            }
        })
        console.log("Hellooo4");

        revalidatePath(`/u/${self?.username}/chat`)
        revalidatePath(`/u/${self?.username}`)
        revalidatePath(`/${self?.username}`)
        console.log(stream);
        
        return stream;
    } catch{
        throw new Error("[STREAM]: Internal Server Error")
    }
}