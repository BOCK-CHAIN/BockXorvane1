import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { Storage } from "@google-cloud/storage";

export const POST = async(req: Request)=>{
    const {fileType, apiEndpoint} = await req.json()
    const session = await auth()
    const userId = session?.user.id;
    if(!userId){
        return new NextResponse("Unauthorized",{ status: 401});  
    }
    if(!fileType || !apiEndpoint){
        return new NextResponse("File is required",{ status: 401});  
    }
    try{
        const storage = new Storage({
            keyFilename: process.env.GCS_FILE_NAME as string
        })

        const [url] = await storage
            .bucket(process.env.GCS_BUCKET_NAME as string)
            .file(`${userId}/${apiEndpoint}`)
            .getSignedUrl({
                version: 'v4',
                action: 'write',
                expires: Date.now() + 15 * 60 * 1000,
                contentType: fileType
            });

        return new NextResponse(url,{ status: 200});  
        
    }catch(err){
        console.log(err)
        return new NextResponse("Internal Server Error", { status: 500 });
    }

}