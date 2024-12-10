import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="font-sans">
      <div className="relative bg-primary text-white ">
        <img
          src="../../../public/school-buliding.png"
          alt="School Building"
          className="w-full h-[80vh] md:h-[90vh] object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-[80vh] md:h-[90vh] bg-black bg-opacity-50 flex flex-col justify-center items-center">
          <h1 className="text-3xl md:text-5xl font-bold text-center">
            Welcome to E-S Gishoma
          </h1>
          <p className="text-center text-xl font-semibold text-sm md:text-4xl mt-2">
            The <span className="text-primary">#1</span> O-Level and Advanced <br/> Level school in Rusizi District
          </p>
          <Link to="/about">
          <button className="bg-primary text-white font-bold px-6 py-2 mt-8 rounded-lg hover:bg-dashboard-sidebar transition">
            About us
          </button>
          
          </Link>
        </div>
      </div>

 
      <section className="py-10 px-4 md:px-20">
        <h2 className="text-center text-2xl md:text-3xl md:text-left font-bold mb-6">
          A Message from our Principal
        </h2>
        <div className="flex flex-col md:flex-row items-center">
          <img
            src="../../../public/profile.png"
            alt="Principal"
            className="w-32 h-32 rounded-full object-cover mb-4 md:mb-0 md:mr-6"
          />
          <p className="text-justify text-xl">
            "It is my great pleasure to welcome you to E-S Gishoma, a place
            where excellence and integrity are key. As we work toward building
            a future of student excellence, we are committed to fostering a
            nurturing environment where every student is valued and supported.
            Together, we are a part of a community of families who are proud to
            witness young minds flourish. I look forward to joining you in this
            exciting journey." <br /><br />
            <i className="font-semibold">John Doe - School Principal</i>
          </p>
        </div>
      </section>

   
      <section className="bg-gray-100 py-10 px-4 md:px-20">
        <h2 className="text-center text-2xl md:text-3xl md:text-left font-bold mb-6">
          Latest News
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="bg-white shadow-md p-4 hover:shadow-lg"
            >
              <img
                src="../../../public/article.png"
                alt="News"
                className="w-full h-[25vh] rounded-t-lg object-cover mb-4 rounded-lg"
              />
              <h3 className="font-bold text-lg">Our students recently won first place in the national math competition. Congratulations to our brilliant scholars!</h3>
              <div className="flex w-full items-center">
                <h3>November 20,2024</h3>
                <div className="flex ml-auto">
                    <h2 className="bg-primary p-1 m-1">w</h2>
                    <h2 className="bg-primary p-1 m-1">X</h2>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
          <Link to="news">
          <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-dashboard-sidebar">
            View More <i className="fa fa-next"></i>
          </button>
          </Link>
        </div>
      </section>

      <section className="py-10 px-4 md:px-20">
        <h2 className="text-center text-2xl md:text-left md:text-3xl font-bold mb-6">
          Parents Testimonials
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-4"
            >
              <img
                src="/../../../public/profile.png"
                alt="Parent photo"
                className="w-20 h-20 rounded-full object-cover mb-2"
              />
              <div className="text-yellow-500 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i}>⭐</span>
                ))}
              </div>
              <p className="text-gray-600 text-sm">
                "Amazing school! The teachers and staff are excellent."
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Landing;
