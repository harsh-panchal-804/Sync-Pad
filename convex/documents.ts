import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server"
import { paginationOptsValidator } from "convex/server";
export const create=mutation({
    args:{
        title:v.optional(v.string()),
        initialContent:v.optional(v.string())
    },
    handler:async (ctx,args)=>{
        const user =await ctx.auth.getUserIdentity();
        if(!user){
            throw new ConvexError("Unauthoruzed");
        }
        const documentID=await ctx.db.insert("documents",{
            title:args.title ?? "Untitled document",
            ownerId:user.subject,
            initialContent:args.initialContent
        })
        return  documentID

    }
})
export const get = query({
    args:{
        paginationOpts:paginationOptsValidator
    },
    handler: async (ctx,args) => {
        return await ctx.db.query("documents").paginate(args.paginationOpts);
    }
})