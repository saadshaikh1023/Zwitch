"use client";
import { ConnectionState } from "livekit-client";
import { ChatVariant, useChatSidebar } from "@/store/use-chat-sidebar";
import { useChat, useConnectionState, useRemoteParticipant } from "@livekit/components-react";
import { useMediaQuery } from "usehooks-ts";
import { useEffect, useMemo, useState } from "react";
import { ChatHeader, ChatHeaderSkeleton } from "./chat-header";
import { ChatForm, ChatFormSkeleton } from "./chat-form";
import { ChatList, ChatListSkeleton } from "./chat-list";
import { ChatCommunity } from "./chat-community";

interface ChatProps{
    hostName:string;
    hostIdentity:string;
    viewerName:string;
    isFollowing:boolean;
    isChatEnabled:boolean;
    isChatDelayed:boolean;
    isChatFollowersOnly:boolean;
};

export const Chat =({
    hostIdentity,
    hostName,
    viewerName,
    isFollowing,
    isChatDelayed,
    isChatEnabled,
    isChatFollowersOnly,
}: ChatProps) =>{

    const matches = useMediaQuery('(max-width: 1024px)');
    const {variant, onExpand} = useChatSidebar((state) => state);
    const connectionState = useConnectionState();
    const participant = useRemoteParticipant(hostIdentity);

    const isOnline = participant && connectionState === ConnectionState.Connected

    const isHidden  = !isChatEnabled || !isOnline;

    const [value, setValue] = useState("");
    const {chatMessages: messages, send} = useChat(); 

    useEffect(() => {
        if(matches){
            onExpand();
        }
    },[matches, onExpand]);

    const reversedMessage = useMemo(() => {
        return messages.sort((a,b) => b.timestamp - a.timestamp);
    },[messages]);

    const onSumbit = () => {
        if(!send)return;
        send(value);
        setValue("");
    };

    const onChange = (value: string) => {
        setValue(value);

    };

    return(
        <div className="flex flex-col bg-[#1a1a21] border-l border-b pt-0 h-[calc(100vh-80px)]">
           <ChatHeader/>
           {variant === ChatVariant.CHAT && (
            <>
            <ChatList
            messages={reversedMessage}
            isHidden={isHidden}
            />
               <ChatForm
               onSubmit ={onSumbit}
               value ={value}
               onChange ={onChange}
               isHidden ={isHidden}
               isChatFollowersOnly={isChatFollowersOnly}
               isChatDelayed={isChatDelayed}
               isFollowing={isFollowing}
               />
            </>
           )}
           {variant === ChatVariant.COMMUNITY && (
            <>
            <ChatCommunity
            viewerName={viewerName}
            hostName={hostName}
            isHidden={isHidden}
            />
            </>
           )}
        </div>
    );
};

export const ChatSkeleton = () => {
    return(
        <div className="flex flex-col border-l border-b pt-0 h-[calc(100vh-80px)] border-2">
            <ChatHeaderSkeleton/>
            <ChatListSkeleton/>
            <ChatFormSkeleton/>
        </div>
    );
};

