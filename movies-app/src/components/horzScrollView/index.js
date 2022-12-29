import MovieCard from "../movies/movieCard";
import ShowCard from "../shows/showCard";
import "./horzScrollStyle.scss";
  
const HorzView = ({movies, shows, action}) => {
    return (
        <>
            <div className="container">
                { movies? movies.map((m) => (
                    <div className="card" key={m.id}>
                        <MovieCard movie={m} action={action} />
                    </div>
                )) : null }

                { shows? shows.map((s) => (
                    <div className="card" key={s.id}>
                        <ShowCard show={s} action={action} />
                    </div>
                )) : null }
            </div>
        </>
      );
};

export default HorzView;