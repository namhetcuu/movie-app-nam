import PropTypes from "prop-types";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Modal from "react-modal";
import React from "react";
import YouTube from "react-youtube";

//thu vien
const opts = {
  height: "390",
  width: "640",
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 1,
  },
};
//thu vien
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 10,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1200 },
    items: 7,
  },
  tablet: {
    breakpoint: { max: 1200, min: 600 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 600, min: 0 },
    items: 2,
  },
};
const MovieList = ({ title, data }) => {
  const [modalIsOpen, setModelIsOpen] = React.useState(false);
  const [trailerKey, setTrailerKey] = React.useState("");

  const handleTrailer = async (id) => {
    setTrailerKey("");
    try {
      const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        },
      };
      const movieKey = await fetch(url, options);
      const data = await movieKey.json();
      console.log(data);
      setTrailerKey(data.results[0].key);
      setModelIsOpen(true);
    } catch (error) {
      setModelIsOpen(false);
      console.log(error);
    }
  };

  return (
    <div
      className="text-white 
    p-10 mb-10"
    >
      <h2
        className="uppercase 
      text-1xl font-bold mb-4"
      >
        {title}
      </h2>
      <Carousel
        responsive={responsive}
        className="flex 
      items-center space-x-4"
      >
        {data.map((movie) => (
          <div
            key={movie.id}
            className="w-[200px] h-[300px] relative group"
            onClick={() => handleTrailer(movie.id)}
          >
            <div
              className="group-hover:scale-105 
            transition-transform duration-500 
            ease-in-out w-full h-full cursor-pointer"
            >
              <div className="absolute w-full h-full top-0 left-0 opacity-40 bg-black" />
              <img
                src={`${import.meta.env.VITE_IMG_URL}${movie.poster_path}`}
                alt="image"
              />
              <div className="absolute bottom-4 left-4">
                <p className="uppercase">{movie.original_title}</p>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModelIsOpen(false)}
        style={{
          overlay: {
            position: "fixed",
            zIndex: 9999,
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%,-50%)",
          },
        }}
        contentLabel="Example Modal"
      >
        <YouTube videoId={trailerKey} opts={opts} />
      </Modal>
    </div>
  );
};
MovieList.propTypes = {
  title: PropTypes.string,
  data: PropTypes.array,
};
export default MovieList;
