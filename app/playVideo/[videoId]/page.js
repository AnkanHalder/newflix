import PlayVideo from "@/PageComponents/videoPlayer";
const page = ({params}) => {
  return (
    <div>
       <PlayVideo id={params.videoId} />
    </div>
  )
}
export default page;
