import { notFound } from "next/navigation";

import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-service";
import { isBlockedByUser } from "@/lib/block-service";
import { StreamPlayer } from "@/components/stream-player";

type UserPageProps = {
    params: Promise<{ username: string }>;
  };
  

  async function UserPage({ params }: UserPageProps) {
    const resolvedParams = await params;
    const { username } = resolvedParams;
    const user = await getUserByUsername(username);
    if(!user || !user.stream){
        notFound();
    }

    const isFollowing = await isFollowingUser(user.id);
    const isBlocked = await isBlockedByUser(user.id)
    
    if(isBlocked){
        notFound();
    }

    return ( 
        <StreamPlayer 
            user={user}
            stream={user.stream}
            isFollowing={isFollowing}
        />
     );
}
 
export default UserPage;