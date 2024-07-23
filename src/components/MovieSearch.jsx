import PropTypes from "prop-types";
import Modal from "react-modal";
import { useState } from "react";
import YouTube from "react-youtube";
const opts = {
  height: "390",
  width: "640",
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 1,
  },
};
const MovieSearch = ({ data }) => {
  const [modalIsOpen, setModelIsOpen] = useState(false);
  const [trailerKey, setTrailerKey] = useState("");

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
      setTrailerKey(data.results[0].key);
      setModelIsOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="text-white p-10 mb-10">
      <p className=" uppercase text-1xl font-bold mb-4">Search Results</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {data.map((movieSearchItem) => (
          <div
            className="group w-[200px] h-[300px] relative"
            key={movieSearchItem.id}
            onClick={() => handleTrailer(movieSearchItem.id)}
          >
            <div
              className="transition-transform duration-500 w-full h-full
              ease-in-out cursor-pointer group-hover:scale-105"
            >
              <div className="absolute bg-black opacity-40 w-full h-full top-0 left-0" />
              <img
                src={`${import.meta.env.VITE_IMG_URL}${
                  movieSearchItem.poster_path
                }`}
                className="bg-cover bg-center bg-no-repeat"
                alt=""
              />
              <div className="absolute bottom-4 left-4">
                <p className="uppercase">{movieSearchItem.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
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
MovieSearch.propTypes = {
  data: PropTypes.array,
};
export default MovieSearch;
