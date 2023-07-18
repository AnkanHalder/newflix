import { BsPlayFill,BsPlus,BsCheck2,BsHandThumbsUp,BsHandThumbsUpFill} from 'react-icons/bs';
// import { MdOutlineDone } from 'react-icons/md';
const handlePlay=()=>{};
const handleWatchList=()=>{};
const handleLike=()=>{};
export const PlayBtn = () => {
    return (
        <div className="playBtn" onClick={handlePlay}>
            <BsPlayFill />
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

