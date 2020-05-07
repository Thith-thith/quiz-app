import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const TITLE = "Koompi play | Quiz";

const Home = () => (
  <React.Fragment>
    <Helmet>
      <title>{TITLE}</title>
    </Helmet>
    <div id="home">
      <section className="w-auto h-auto lg:mt-64 sm:m-0">
        <h1 className=" header-text text-center text-white">Quiz App</h1>
        <ul>
          <li id="start">
            <Link to="play/Quiz">
              <button id="play-button" className="bg-teal-400 hover:bg-teal-600 shadow-lg w-full text-white font-bold py-2 px-4 h-12 rounded-full mt-12">
                Play
              </button>
            </Link>
          </li>
        </ul>
      </section>
    </div>
  </React.Fragment>
);

export default Home;
