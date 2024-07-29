
import { LiveBadge } from "@/components/live-badge";
import { Thumbnail, ThumbnailSkeleton } from "@/components/thumbnail";
import { Skeleton } from "@/components/ui/skeleton";
import { UserAvatar, UserAvatarSkeleton } from "@/components/user-avatar";
import { Stream, User } from "@prisma/client";
import Link from "next/link";

interface ResultsCardProps{
    data: {
        user : User,
        isLive: boolean;
        name: string;
        thumbnailUrl: string | null;
    };
};  
export const ResultsCard =({
    data,
}: ResultsCardProps)=> {

    return(
        
        <Link href={`/${data.user.username}`}>
        <div className="h-full w-full space-y-4">
            <Thumbnail
            src={data.thumbnailUrl}
            fallback={data.user.imgUrl}
            isLive={data.isLive}
            username={data.user.username}  
            />
           
            <div className="flex gap-x-3">
                <UserAvatar
                username={data.user.username}
                imageUrl = {data.user.imgUrl}
                isLive = {data.isLive}
                />
                <div className="flex flex-col text-sm overflow-hidden">
                    <p className="truncate font-semibold hover:text-blue-500">
                        {data.name}
                    </p>
                    <p className="text-muted-foreground">
                        {data.user.username}  
                    </p>
                </div>
            </div>
         </div>
        </Link>
    );
};

export const ResultsCardSkeleton = () => {
    return(
        <div className="h-full w-full space-y-4">
            <ThumbnailSkeleton/>
            <div className="flex gap-x-3">
                <UserAvatarSkeleton/>
                <div className="flex flex-col gap-y-1">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton  className="h-3 w-24"/>
                </div>
            </div>
        </div>
    );
};