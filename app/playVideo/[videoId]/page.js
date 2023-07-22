"use client"
import PlayVideo from "@/PageComponents/videoPlayer";
import withAuth from "@/utils/withAuth";
const page = ({params}) => {

  return (
    <div>
       <PlayVideo id={params.videoId} />
    </div>
  )
}
export default withAuth(page);
