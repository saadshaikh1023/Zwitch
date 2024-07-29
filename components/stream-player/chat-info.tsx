import { useMemo } from "react";
import { Info } from "lucide-react";
import { Hint } from "@/components/hint";

interface ChatInfoProps{
    isChatDelayed: boolean;
    isChatFollowerOnly: boolean;
};

export const ChatInfo = ({
    isChatDelayed,
    isChatFollowerOnly,
}: ChatInfoProps) => {

    const hint = useMemo(() => {
        if(isChatFollowerOnly && !isChatDelayed){
        return "Only followers can chat";
        }

        if(isChatDelayed && !isChatFollowerOnly){
            return "Messages are delayed by 3 seconds";
        }

        if(isChatFollowerOnly || isChatDelayed){
            return "Only followers can chat. Message are delayed by 3 seconds";
        }

        return "";
    },[isChatDelayed,isChatFollowerOnly]);

    const label = useMemo(() => {
        if(isChatFollowerOnly && !isChatDelayed){
        return "Follower only";
        };

        if(isChatDelayed && !isChatFollowerOnly){
            return "Slow mode";
        };

        if(isChatFollowerOnly || isChatDelayed){
            return "Follower only and Slow mode";
        };

        return "";
    },[isChatDelayed,isChatFollowerOnly]);

    if(!isChatDelayed && !isChatFollowerOnly){
        return null;
    }

    return(
        <div className="p-2 text-muted-foreground bg-white/5 border border-white/10 w-full rounded-t-md flex items-center gap-x-2">
            <Hint label={hint}>
                <Info className="h-4 w-4"/>
            </Hint>
            <p className="text-xs font-semibold">
                {label}
            </p>
        </div>
    );
};

