"use server";

import { blockUser, unBlockUser } from "@/lib/block-service"
import { revalidatePath } from "next/cache";

export const onBlock = async (id: string) => {
    //TODO: Adapt to disconnect from livestream
    //TODO: Allow ability to kick the user

    const blockedUser = await blockUser(id);

    if(blockedUser){
        revalidatePath(`/${blockedUser.blocked.username}`)
    }

    return blockedUser;
}

export const onUnblock = async (id: string) => {
    const unblockedUser = await unBlockUser(id);

    if(unblockedUser){
        revalidatePath(`/${unblockedUser.blocked.username}`)
    }

    return unblockedUser;
}