"use client"

import { useParticipants } from "@livekit/components-react";
import { useMemo } from "react";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { useDebounceValue } from "usehooks-ts";
import { CommunityItem } from "./community-item";
import { LocalParticipant, RemoteParticipant } from "livekit-client";

interface ChatCommunityProps{
    hostname: string;
    viewerName: string;
    isHidden: boolean;
}

const ChatCommunity = ({
    hostname,
    viewerName,
    isHidden
}: ChatCommunityProps) => {
    const value = "";
    const [debouncedValue, setValue] = useDebounceValue<string>(value, 500);

    const participants = useParticipants();

    const onChange = (newValue: string) => {
        setValue(newValue);
    };

    const filterParticipants = useMemo(() => {
        const deduped = participants.reduce((acc,participant) => {
            const hostAsViewer = `host-${participant.identity}`;
            if(!acc.some((p) => p.identity === hostAsViewer)){
                acc.push(participant);
            }
            return acc;
        },[] as (RemoteParticipant | LocalParticipant)[])

        return deduped.filter((participant) => {
            return participant.name?.toLowerCase().includes(debouncedValue.toLowerCase())
        })
    }, [participants, debouncedValue])

    if(isHidden){
        return(
            <div className="flex flex-1 items-center justify-center">
                <p className="text-sm text-muted-foreground">
                    Community is disabled
                </p>
            </div>
        )
    }

    return ( 
        <div className="p-4">
            <Input 
                onChange={(e) => onChange(e.target.value)}
                placeholder="Search Community"
                className="border-white/10"
            />
            <ScrollArea className="gap-y-2 mt-4">
                <p className="text-center text-sm text-muted-foreground hidden last:block p-2">
                    No Result
                </p>
                {
                    filterParticipants.map((participant) => (
                        <CommunityItem 
                            key={participant.identity}
                            hostname={hostname}
                            viewerName={viewerName}
                            participantName={participant.name}
                            participantIdentity={participant.identity}
                        />
                    ))
                }
            </ScrollArea>
        </div>
     );
}
 
export default ChatCommunity;