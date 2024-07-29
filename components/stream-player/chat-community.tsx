"use client"

import { useParticipants } from "@livekit/components-react";
import { useMemo, useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { CommunityItem } from "./community-item";
import { LocalParticipant, RemoteParticipant } from "livekit-client";

interface ChatCommunityProps{
    hostName: string;
    viewerName: string;
    isHidden: boolean;
};

export const ChatCommunity =({
    hostName,
    viewerName,
    isHidden,
}:ChatCommunityProps) => {
    const [value , setValue] = useState("");
    const [debouncedValue,setDebouncedValue] = useDebounceValue<string>(value, 500);
    const participants = useParticipants();

    const onChange =(newValue: string) => {
        setValue(newValue);    
        setDebouncedValue(newValue); 
    };

    const filteredParticipants = useMemo(() => {
        const deduped = participants.reduce((acc,participants) => {
            const hostAsViewer = `host-${participants.identity}`;
            if(!acc.some((p) => p.identity === hostAsViewer)){
                acc.push(participants);
            }
            return acc;
        },[] as (RemoteParticipant | LocalParticipant)[]);

        return deduped.filter((participant) =>{
            return participant.name?.toLowerCase().includes(debouncedValue.toLowerCase());
        });
    },[participants, debouncedValue]);

    if(isHidden){
        return (
            <div className="flex flex-1 items-center justify-center">
                <p className="text-sm text-muted-foreground">
                    Community is disabled
                </p>
            </div>
        );
    };

return(
    <div className="p-4">
        <Input 
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search community"
        className="border-white/10"/>
        <ScrollArea className="gap-y-4 mt-4">
            <p className="text-center text-sm text-muted-foreground hidden last:block p-2">
                No results found
            </p>
            {filteredParticipants.map(participant =>(
                <CommunityItem
                key={participant.identity}
                hostName={hostName}
                viewerName={viewerName}
                participantName={participant.name}
                participantIdentity={participant.identity}
                />
            ))}
        </ScrollArea>
    </div>
)
}