"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { Stream } from "@prisma/client";
import { getSelf } from "@/lib/auth-service";

export const updateStream = async(value: Partial<Stream>) => {
try{
const self = await getSelf();
const selfstream = await db.stream.findUnique({
    where:{
        userId: self.id,
    },
});

if(!selfstream){
    throw new Error("Stream not found");
}

const validData = {
    thumbnailUrl: value.thumbnailUrl,
    name: value.name,
    isChatEnabled: value.isChatEnabled,
    isChatFollowersOnly: value.isChatFollowersOnly,
    isChatDelayed: value.isChatDelayed,
}

const stream = await db.stream.update({
    where:{
        id: selfstream.id,
    },
    data:{
        ...validData,
    },
});

revalidatePath(`/u/${self.username}/chat`);
revalidatePath(`/u/${self.username}`);
revalidatePath(`/${self.username}`);

return stream;

}catch{
    throw new Error("Internal Error");
};
};