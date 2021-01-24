import React, { useState, useEffect } from "react";
import {
  fetchMovieDetail,
  fetchMovieVideos,
  fetchCasts,
  fetchSimilarMovie,
} from "../../service";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import { Modal } from "react-bootstrap";
import ReactPlayer from "react-player";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

export function MovieDetail({ match }) {
  let params = match.params;
  let genres = [];
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [detail, setDetail] = useState([]);
  var [video, setVideo] = useState([]);
  const [casts, setCasts] = useState([]);
  const [similarMovie, setSimilarMovie] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setDetail(await fetchMovieDetail(params.id));
      setVideo(await fetchMovieVideos(params.id));
      setCasts(await fetchCasts(params.id));
      setSimilarMovie(await fetchSimilarMovie(params.id));
    };

    fetchAPI();
  }, [params.id]);

  genres = detail.genres;

  //Modal reproductor de peliculas
  const MoviePalyerModal = (props) => {
    //Evitar errores si la peli no tiene video de muestra
    if (!video) {
      video = ""
    }

    const youtubeUrl = "https://www.youtube.com/watch?v=";
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title
            id="contained-modal-title-vcenter"
            style={{ color: "#000000", fontWeight: "bolder" }}
          >
            {detail.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#000000" }}>
          <ReactPlayer
            className="container-fluid"
            url={youtubeUrl + video.key}
            playing
            width="100%"
          ></ReactPlayer>
        </Modal.Body>
      </Modal>
    );
  };

  //Modal para comentarios
  const CommentModal = (props) => {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title
            id="contained-modal-title-vcenter"
            style={{ color: "#000000", fontWeight: "bolder" }}
          >
            {"Add Comment"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#000000" }}>
          <form id='formInsertComment' class='mt-3'>
            <div class="form-group mx-sm-3 mb-2">
              <label for="inputName">Name</label>
              <input type="text" class="form-control" id="inputName" placeholder="Enter name"></input>
            </div>
            <div class="form-group mx-sm-3 mb-2">
              <label for="inputNote">Note</label>
              <input type="number" class="form-control" id="inputNote" min="1" max="10"></input>
            </div>
            <div class="form-group mx-sm-3 mb-2">
              <label for="inputComment">Comment</label>
              <textarea class="form-control" id="inputComment" placeholder="Enter comment"></textarea>
            </div>
            <div class="form-group mx-sm-3 mb-2">
              <button type="submit" class="btn btn-primary" action='insertComment'>Submit</button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    );
  };

  let genresList;
  if (genres) {
    genresList = genres.map((g, i) => {
      return (
        <li className="list-inline-item" key={i}>
          <button type="button" className="btn btn-outline-info">
            {g.name}
          </button>
        </li>
      );
    });
  }

  const castList = casts.slice(0, 4).map((c, i) => {
    return (
      <div className="col-md-3 text-center" key={i}>
        <img
          className="img-fluid rounded-circle mx-auto d-block"
          src={c.img}
          alt={c.name}
        ></img>
        <p className="font-weight-bold text-center">{c.name}</p>
        <p
          className="font-weight-light text-center"
          style={{ color: "#5a606b" }}
        >
          {c.character}
        </p>
      </div>
    );
  });

  const similarMovieList = similarMovie.slice(0, 4).map((item, index) => {
    return (
      <div className="col-md-3 col-sm-6" key={index}>
        <div className="card">
          <Link to={`/movie/${item.id}`}>
            <img className="img-fluid" src={item.poster} alt={item.title}></img>
          </Link>
        </div>
        <div className="mt-3">
          <p style={{ fontWeight: "bolder" }}>{item.title}</p>
          <p>Rated: {item.rating}</p>
          <ReactStars
            count={item.rating}
            size={20}
            color1={"#f4c10f"}
          ></ReactStars>
        </div>
      </div>
    );
  });

  function getComents(){
    //CommentDB->getComents();
    return "BILAL\nBEJJA";
  }

  //Redirecciona a la página principal
  function handleRedirect() {
    history.push("");
  }

  let history = useHistory()

  return (
    <div className="container">
      <div className="row mt-3">
        <div className="col">
          <div onClick={handleRedirect}>
            <i className="far fa-arrow-alt-circle-left"></i>
          </div>
        </div>
      </div>

      <div className="row mt-2">
        <MoviePalyerModal
          show={isOpen}
          onHide={() => {
            setIsOpen(false);
          }}
        ></MoviePalyerModal>

        <CommentModal
          show={isOpen2}
          onHide={() => {
            setIsOpen2(false);
          }}
        ></CommentModal>

        <div className="col text-center" style={{ width: "100%" }}>
          <img
            className="img-fluid"
            src={`http://image.tmdb.org/t/p/original/${detail.backdrop_path}`}
            alt={detail.title}
          ></img>
          <div className="carousel-center">
            <i
              onClick={() => setIsOpen(true)}
              className="far fa-play-circle"
              style={{ fontSize: 95, color: "#f4c10f", cursor: "pointer" }}
            ></i>
          </div>
          <div
            className="carousel-caption"
            style={{ textAlign: "center", fontSize: 35 }}
          >
            {detail.title}
          </div>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col">
          <p style={{ color: "#5a606b", fontWeight: "bolder" }}>GENRE</p>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col">
          <ul className="list-inline">{genresList}</ul>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col">
          <div className="text-center">
            <ReactStars
              count={detail.vote_average}
              size={20}
              color1={"#f4c10f"}
            ></ReactStars>
          </div>
          <div className="mt-3">
            <p style={{ color: "#5a606b", fontWeight: "bolder" }}>OVERVIEW</p>
            {detail.overview}
          </div>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-md-3">
          <p style={{ color: "#5a606b", fontWeight: "bolder" }}>RELEASE DATE</p>
          <p style={{ color: "#f4c10f" }}>{detail.release_date}</p>
        </div>
        <div className="col-md-3">
          <p style={{ color: "#5a606b", fontWeight: "bolder" }}>RUN TIME</p>
          <p style={{ color: "#f4c10f" }}>{detail.runtime}</p>
        </div>
        <div className="col-md-3">
          <p style={{ color: "#5a606b", fontWeight: "bolder" }}>BUDGET</p>
          <p style={{ color: "#f4c10f" }}>{detail.budget}</p>
        </div>
        <div className="col-md-3">
          <p style={{ color: "#5a606b", fontWeight: "bolder" }}>HOMEPAGE</p>
          <p style={{ color: "#f4c10f" }}>{detail.homepage}</p>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col">
          <p style={{ color: "#5a606b", fontWeight: "bolder" }}>CASTS</p>
        </div>
      </div>
      <div className="row mt-3">{castList}</div>

      <div className="row mt-3">
        <div className="col">
          <p style={{ color: "#5a606b", fontWeight: "bolder" }}>
            SIMILAR MOVIES
          </p>
        </div>
      </div>

      <div className="row mt-3">{similarMovieList}</div>

      <br />

      <div className="col text-center" style={{ width: "100%" }}>
        <div class="d-flex justify-content-center">
          <button type="button" onClick={() => document.getElementById("comments").innerText = getComents()} class="btn btn-warning" style={{ width: "200px" }}>Show Comments</button>
        </div>
        <div id="comments" placeholder="<?php echo 'Bilal' ?>"></div>
      </div>

      <br />

      <div className="col text-center" style={{ width: "100%" }}>
        <div class="d-flex justify-content-center">
          <button type="button" onClick={() => setIsOpen2(true)} class="btn btn-warning" style={{ width: "200px" }}>Add Comment</button>
        </div>
      </div>

      <hr className="mt-5" style={{ borderTop: "1px solid #5a606b" }}></hr>

      <div className="row mt-3 mb-5">
        <div className="col-md-8 col-sm-6" style={{ color: "#5a606b" }}>
          <h3>ABOUT ME</h3>
          <p>
            Bilal Bejja
          </p>
          <p>
            A web application developer graduate from IES JAROSO
          </p>
          <ul className="list-inline">
            <li className="list-inline-item">
              <a href="/" style={{ color: "#f4c10f" }}>
                <i className="fab fa-facebook"></i>
              </a>
            </li>
            <li className="list-inline-item">
              <a href="/" style={{ color: "#f4c10f" }}>
                <i className="fab fa-youtube"></i>
              </a>
            </li>
            <li className="list-inline-item">
              <a href="/" style={{ color: "#f4c10f" }}>
                <i className="fab fa-twitter"></i>
              </a>
            </li>
            <li className="list-inline-item">
              <a href="/" style={{ color: "#f4c10f" }}>
                <i className="fab fa-instagram"></i>
              </a>
            </li>
          </ul>
        </div>
        <div className="col-md-4 col-sm-6" style={{ color: "#5a606b" }}>
          <h3>KEEP IN TOUCH</h3>
          <ul className="list-unstyled">
            <li>
              <p>
                <strong>
                  <i className="fas fa-map-marker-alt"></i> Address:
                </strong>{" "}
                Vera, Almería, Spain
              </p>
            </li>
            <li>
              <p>
                <strong>
                  <i className="fas fa-map-marker-alt"></i> Phone:
                </strong>{" "}
                +34 632 33 22 17
              </p>
            </li>
            <li>
              <p>
                <strong>
                  <i className="fas fa-envelope"></i> Email:
                </strong>{" "}
                bilalbejja2016@gmail.com
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
