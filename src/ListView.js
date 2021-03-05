import MovieCard from './MovieCard';

const ListView = ({ list=[], render }) => {
    return list.map((item) => {
        return <>{render(item)}</>
        // <MovieCard key={movie.imdbID} title={movie.Title} posterUrl={movie.Poster} type={movie.Type} />
    });
};

export default ListView;