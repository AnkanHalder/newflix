import { BsPlayFill,BsPlus,BsCheck2,BsHandThumbsUp,BsHandThumbsUpFill} from 'react-icons/bs';
import Link from 'next/link';
import "@/styles/utils.css";
// import { MdOutlineDone } from 'react-icons/md';
const handlePlay=()=>{

};
const handleWatchList=()=>{};
const handleLike=()=>{};
export const PlayBtn = (props) => {
    return (
        <div className="playBtn">
            <Link href={"/playVideo/" + props.id} ><BsPlayFill /></Link>
        </div>
    )
}
export const WatchListBtn = (props) => {
    return (
        <div className="watchListBtn" onClick={handleWatchList}>
            {props.added?<BsCheck2 />:<BsPlus />}
        </div>
    )
}
export const LikeBtn = (props) => {
    return (
        <div className="likeBtn" onClick={handleLike}>
            {!props.liked?<BsHandThumbsUp />:<BsHandThumbsUpFill />}
        </div>
    )
}

