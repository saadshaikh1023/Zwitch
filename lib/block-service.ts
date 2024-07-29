import { db } from "@/lib/db";
import { getSelf } from "./auth-service";

export const isBlockedByUser = async (id: string) =>{
    try{
        const self  = await getSelf();

        const otheruser = await db.user.findUnique({
            where:{
                id,
            }
        });

        if(!otheruser){
            throw new Error("User not found");
        }

        if(otheruser.id === self.id){
        return false;
        }


        const existingBlock = await db.block.findUnique({
            where: {
              blockerId_blockedId: {
                blockerId: otheruser.id,
                blockedId: self.id,
              },
            },
        });

        return !!existingBlock
    }catch{
        return false;
    }
};

export const blockUser = async (id:string) =>{
const self =  await getSelf();

if(self.id === id){
throw new Error("Cannont blcok yourself");
}

const otheruser = await db.user.findUnique({
    where:{
        id,
    }
});
if(!otheruser){
    throw new Error("User not found");
}

const existingBlock = await db.block.findUnique({
    where:{
        blockerId_blockedId:{
            blockedId: self.id,
            blockerId: otheruser.id,
        },
    },
});

if(existingBlock){
    throw new Error("Already blocked");
}

const block = await db.block.create({
    data:{
        blockerId: self.id,
        blockedId: otheruser.id,
    },
    include:{
        blocked: true,
    },
});

return block;

}

export const unblockUser = async(id: string) =>{
    const self =  await getSelf();

    if(self.id === id){
        throw new Error("Cannont unblock yourself");
        }

     const otheruser =  await db.user.findUnique({
        where:{
            id,
        }
     });
     
     if(!otheruser){
        throw new Error("user not found");
     }

     const existingBlock = await db.block.findUnique({
        where:{
            blockerId_blockedId:{
                blockerId: self.id,
                blockedId: otheruser.id,
            },
        },
     });

     if(!existingBlock){
        throw new Error("Not Blocked");
     }

     const unblock = await db.block.delete({
        where: {
            id : existingBlock.id,

        },
        include:{
            blocked: true,
        },
     });

     return unblock;
};

export const getBlockedUsers  = async() => {
    const self  = await getSelf();

    const blockedUsers = await db.block.findMany({
        where:{
            blockerId: self.id,
        },
        include:{
            blocked: true,
        },
    });

    return blockedUsers;
};