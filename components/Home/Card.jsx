
import "@/styles/Home/Card.css";
export const Card = (props) => {
    const vidDetails = props.vidDetails;
  return (
    <div className='card'>
        <img className='card__image' src={vidDetails.vidBackdropLink} alt={vidDetails.vidName}></img>
    </div>
  )
}
