import { StreamPlayer } from "@/components/stream-player";
import { getUserByUsername } from "@/lib/user-service";
import { currentUser } from "@clerk/nextjs/server";

interface CreatorPageProps{
    params:{
        username: string;
    }
}

const CreatorPage = async ({
    params
}: CreatorPageProps) => {
    const externalUser = await currentUser();

    const {username} = await params;
    const user = await getUserByUsername(username);

    if(!user || user.externalUserId !== externalUser?.id || !user.stream){
        throw new Error("Unauthorized");
    }

    return ( 
        <div className="h-full">
            <StreamPlayer 
                user={user}
                stream={user.stream}
                isFollowing={true}
            />
        </div>
     );
}
 
export default CreatorPage;