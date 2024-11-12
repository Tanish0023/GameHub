"use client"

import { toast } from "sonner";
import { useTransition } from "react";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";

import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { onFollow, onUnfollow } from "@/actions/follow";
import { Skeleton } from "../ui/skeleton";


interface ActionsProps{
    hostIdentity: string;
    isFollowing: boolean;
    isHost: boolean;
}

const Actions = ({
    hostIdentity,
    isFollowing,
    isHost
}: ActionsProps) => {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const {userId} = useAuth();

    const handleFollow = () => {
        startTransition(() => {
            onFollow(hostIdentity)
                .then((data) => toast.success(`You are now following ${data.following.username}`))
                .catch(() => toast.error("Something went wrong"))
        })
    }

    const handleUnfollow = () => {
        startTransition(() => {
            onUnfollow(hostIdentity)
                .then((data) => toast.success(`You have unfollowed ${data.following.username}`))
                .catch(() => toast.error("Something went wrong"))
        })
    }

    const toggleFollow = () => {
        if(!userId){
            return router.push("/sign-up")
        }

        if(isHost) return;

        if(isFollowing){
            handleUnfollow()
        }else{
            handleFollow()
        }
    }

    return ( 
        <Button
            disabled={isPending || isHost}
            onClick={toggleFollow}
            variant={"primary"}
            size={"sm"}
            className="w-full lg:w-auto"
        >
            <Heart className={cn(
                "h-4 w-4 mr-auto",
                isFollowing ? "fill-white" : "fill-none"
            )} />
            {isFollowing ? "Unfollow" : "Follow"}
        </Button>
     );
}
 
export default Actions;

export const ActionsSkeleton = () => {
    return(
        <Skeleton className="h-10 w-full lg:w-24" />
    )
}