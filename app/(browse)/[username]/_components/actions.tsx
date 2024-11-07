"use client"

import { onBlock, onUnblock } from "@/actions/block";
import { onFollow, onUnfollow } from "@/actions/follow"
import { Button } from "@/components/ui/button"
import { useTransition } from "react";
import { toast } from "sonner";

interface ActionsProps{
    isFollowing: boolean;
    userId: string
}

export const Actions = ({
    isFollowing,
    userId
}: ActionsProps) => {
    const [isPending, startTransition] = useTransition();

    const handleFollow = () => {
        startTransition(()=>{
            onFollow(userId)
                .then((data) => toast.success(`You are now following ${data.following.username}`))
                .catch(()=> toast.error("Something went wrong"))
        })
    }
    
    const handleUnFollow = () => {
        startTransition(()=>{
            onUnfollow(userId)
                .then((data) => toast.success(`You have unfollowed ${data.following.username}`))
                .catch(()=> toast.error("Something went wrong"))
        })
    }

    const onClick = () => {
        if(isFollowing){
            handleUnFollow();
        }else{
            handleFollow();
        }
    }

    const handleBlock = () => {
        startTransition(() => {
            onBlock(userId)
                .then((data)=> toast.success(`You have Blocked ${data.blocked.username}`))
                .catch(()=> toast.error("Something Went Wrong"))
        })
    }

    const handleUnblock = () => {
        startTransition(() => {
            onUnblock(userId)
                .then((data)=> toast.success(`You have Unblocked ${data.blocked.username}`))
                .catch(()=> toast.error("Something Went Wrong"))
        })
    }

    return(
        <>
            <Button
                disabled={isPending}
                onClick={onClick} 
                variant={"primary"}
            >
                {isFollowing ? "Unfollow" : "Follow"}
            </Button>
            <Button
                disabled={isPending}
                onClick={handleBlock} 
                variant={"destructive"}
            >
                {/* {isFollowing ? "Unfollow" : "Follow"} */}
                Block
            </Button>
           
        </>
    )
}