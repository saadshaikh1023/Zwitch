"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { isFollowingUser } from "@/lib/follow-service";
import { ChatInfo } from "./chat-info";

interface ChatFormProps{
    onSubmit: () => void;
     value: string;
     onChange: (value: string) => void;
     isHidden: boolean;
     isChatFollowersOnly: boolean;
     isFollowing: boolean;
     isChatDelayed: boolean;
};

export const ChatForm = ({
    onChange,
    onSubmit,
    isChatFollowersOnly,
    isChatDelayed,
    isFollowing,
    isHidden,
    value,
}: ChatFormProps) => {

    const [isDelayedBlocked, setIsDelayedBlocked] = useState(false);

    const isChatFollowersOnlyAndNotFollowing = isChatFollowersOnly && !isFollowing;
    const isDisabled = isHidden || isDelayedBlocked || isChatFollowersOnlyAndNotFollowing;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if(!value || isDisabled) return;

        if(isChatDelayed && !isDelayedBlocked){
             setIsDelayedBlocked(true);
             setTimeout(() => {
                setIsDelayedBlocked(false);
                onSubmit();
             },3000);
        }else{
            onSubmit();
        }
    };

    if(isHidden){
        return null;
    }

    return(
        <form className="flex flex-col items-center gap-y-4 p-3" onSubmit={handleSubmit}>
            <div className="w-full">
                <ChatInfo 
                isChatDelayed={isChatDelayed} 
                isChatFollowerOnly={isChatFollowersOnly}
                />
                <Input onChange={(e)=> onChange(e.target.value)}
                 value={value} 
                 disabled={isDisabled}
                  placeholder="Send a message" 
                  className={cn("border-white/10" , (isChatFollowersOnly || isChatDelayed) && "rounded-t-none border-t-0")} />
            </div>
            <div className="ml-auto">
                <Button
                type="submit"
                variant="primary"
                size="sm"
                disabled={isDisabled}
                >
                    Chat
                </Button>
            </div>
        </form>
    );
};

export const ChatFormSkeleton = () => {
    return(
        <div className="flex flex-col items-center gap-y-4 p-3">
            <Skeleton className="w-full h-10"/>
            <div className="flex items-center gap-x-2 ml-auto">
                    <Skeleton className="h-7 w-7"/>
                    <Skeleton className="h-7 w-12"/>
            </div>
        </div>
    )
}