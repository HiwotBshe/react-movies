import React from 'react';
import MovieCard from './MovieCard';
import MovieDetails from './MovieDetails';
import ListView from './ListView';
import Modal from './Modal';
import { getMoviesByName, getMovieDetailsById } from './utils';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      searchTerm: 'batman',
      isLoading: false, 
      movies: null,
      error: null,
      showModal: false,
      currentMovie: null,
    }

    this.setModalState = this.setModalState.bind(this);
  }

  setModalState(show=false) {
    this.setState({
      showModal: show
    });
  }

  async componentDidMount() {
    this.setState({
      isLoading: true
    });

    setTimeout( async () => {
      try {
        const movieData = await getMoviesByName(this.state.searchTerm)
        this.setState({
          isLoading: false,
          movies: movieData,
          error: null
        })
      } catch (error) {
        this.setState({
          isLoading: false,
          movies: [],
          error: error
        })
      }
    }, 1000);
    
  }

  componentDidUpdate() {
    console.log(this.state)
  }

  async onMovieCardClicked(movieId) {
    const movie = await getMovieDetailsById(movieId);
    this.setState({
      currentMovie: movie,
      showModal: true
    })
  }

  render() {

    const {currentMovie} = this.state;

    return (
      <>
        { this.state.isLoading 
          ? <h1>Loading data</h1>
          : (
            <>
              <ListView 
                list={this.state.movies?.Search} 
                render={(movie) => (
                  <MovieCard 
                    title={movie.Title} 
                    posterUrl={movie.Poster} 
                    type={movie.Type} 
                    onClick={() => this.onMovieCardClicked(movie.imdbID)}
                  />
                )}
              />
              <Modal show={this.state.showModal} onClose={() => this.setModalState(false)}>
                <MovieDetails 
                  posterUrl={currentMovie?.Poster}
                  title={currentMovie?.Title}
                  rated={currentMovie?.Rated}
                  runtime={currentMovie?.Runtime}
                  genre={currentMovie?.Genre}
                  rating={currentMovie?.Ratings[0]?.Value}
                  plot={currentMovie?.Plot}
                  actors={currentMovie?.Actors}
                />
              </Modal>
            </>
          ) 
        }
      </>
    );
  }
  å
}

export default App;
