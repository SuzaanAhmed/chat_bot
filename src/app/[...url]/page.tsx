//[...url] is used within a folder when that folder is to be attached to any url
//ex: app/[...url], here ...url can be any url
interface PageProps{
    params:{
        url: string[]| string|undefined
    }
}
const Page = ({params}: PageProps) =>{
    return <p>Hello</p>
}

export default Page;