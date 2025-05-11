import { Redis } from "@upstash/redis";
import { ragChat } from "@/lib/ragChat";
import { redis } from "@/lib/redis";
import { ChatWrapper } from "@/pages/ChatWrapper";

//[...url] is used within a folder when that folder is to be attached to any url
//ex: app/[...url], here ...url can be any url
interface PageProps{
    params:{
        url: string[]|string|undefined
    }
}

//I use the built-in "decodeURIComponent" to decode the url
function reconstructUrl({url}:{url:string[]}){
    const decodedComponent=url.map((component)=>decodeURIComponent(component))
    return decodedComponent.join("/")
}


const Page = async ({params}: PageProps) =>{
    const reconstructedUrl=reconstructUrl({url: params.url as string[]})
    console.log(reconstructedUrl)
    console.log(params)

    const sessionId="mock-session";

    //redis works like sets. 
    const addedURL=await redis.sismember("indexed-urls",reconstructedUrl);

    if(!addedURL){
        await ragChat.context.add({
            type:"html",
            source:reconstructedUrl,
            //config to tell how much content I need from the page
            config:{chunkOverlap:50,chunkSize:200}
        })
    }
    
    await redis.sadd("indexed-urls",reconstructedUrl); 

    return <ChatWrapper sessionId={sessionId}/>
}

export default Page;