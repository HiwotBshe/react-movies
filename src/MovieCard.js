import {truncate} from './utils';

const MovieCard = (props) => {
    return (
        <div className="movie-card" onClick={props.onClick}>
            <img src={props.posterUrl} />
            <p>{truncate(props.title, 15)}</p>
            <p>{props.type}</p>
        </div>
    )
}

export default MovieCard;