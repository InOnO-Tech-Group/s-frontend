import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { clientViewBlogs } from "../../redux/slices/blogSlice";
import HomeImage from "/school-builiding.png";
import ViewAllNewsButton from "../re-usable/ViewAllNewsButton";
import BlogCard from "./BlogCard";
import Principal from "/leaders/HT.jpg";
import profile from "/profile.jpg"

const Landing = () => {
  const [publishedBlogs, setPublishedBlogs] = useState([]);

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const scaleHoverVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 }
    }
  };

  const getPublishedBlog = async () => {
    try {
      const response = await clientViewBlogs();
      if (response.status === 200) {
        setPublishedBlogs(response.data);
      }
    } catch (error) {
      console.error("error", error.toString() || "Unknown error occurred");
    }
  };

  useEffect(() => {
    getPublishedBlog();
  }, []);

  return (
    <div className="font-sans">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative bg-primary text-white"
      >
        <img
          src={HomeImage}
          alt="School Building"
          className="w-full h-[80vh] md:h-[90vh] object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-[80vh] md:h-[90vh] bg-black bg-opacity-50 flex flex-col justify-center items-center">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold text-center"
          >
            Welcome to E-S Gishoma
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center text-xl font-semibold text-sm md:text-4xl mt-2"
          >
            The <span className="text-primary">#1</span> O-Level and Advanced{" "}
            <br /> Level school in Rusizi District
          </motion.p>
          <Link to="/about">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-primary text-white font-bold px-6 py-2 mt-8 rounded-lg hover:bg-dashboard-sidebar transition"
            >
              About us
            </motion.button>
          </Link>
        </div>
      </motion.div>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUpVariants}
        className="py-10 px-4 md:px-20"
      >
        <h2 className="text-center text-primary text-2xl md:text-3xl md:text-left font-bold mb-6">
          A Message from Head Teacher
        </h2>
        <div className="flex flex-col md:flex-row items-center">
          <motion.img
            variants={scaleHoverVariants}
            whileHover="hover"
            src={Principal}
            alt="Principal"
            className="w-45 h-40 rounded-full object-cover mb-4 md:mb-0 md:mr-6"
          />
          <p className="text-justify text-xl">
            "It is my great pleasure to welcome you to Ecole Secondaire Gishoma, a place
            where excellence and integrity are key. As we work toward building a
            future of student excellence, we are committed to fostering a
            nurturing environment where every student is valued and supported.
            Together, we are a part of a community of families who are proud to
            witness young minds flourish. I look forward to joining you in this
            exciting journey." <br />
            <br />
            <i className="font-semibold">Mwitaba Anaclet - Head Teacher</i>
          </p>
        </div>
      </motion.section>

      {publishedBlogs.length > 0 && (
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUpVariants}
          className="bg-gray-100 py-10 px-4 md:px-20"
        >
          <h2 className="text-center text-xl md:text-2xl md:text-left font-bold mb-6">
            Latest News
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {publishedBlogs.length > 0 ? (
              publishedBlogs.slice(0, 6).map((item, index) => (
                <motion.div
                  key={item._id}
                  variants={scaleHoverVariants}
                  whileHover="hover"
                >
                  <BlogCard
                    id={item._id}
                    title={item.title}
                    date={item.createdAt}
                    imageUrl={item.coverImage}
                  />
                </motion.div>
              ))
            ) : (
              <div>No recent news Found</div>
            )}
          </div>
          <div className="text-center mt-6">
            <ViewAllNewsButton to="/news" text="View All News" />
          </div>
        </motion.section>
      )}


      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUpVariants}
        className="py-10 px-4 md:px-20 bg-gray-50"
      >
        <h2 className="text-center text-primary text-2xl md:text-left md:text-3xl font-bold mb-6">
          Hear from Our Proud Parents
        </h2>
        <p className="text-center text-gray-700 mb-10 md:text-left">
          At ES Gishoma, we pride ourselves on providing an exceptional learning environment where every student can thrive. Here’s what parents from across Rwanda have to say about their experience with us:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {[
            { name: "Mukamana Aline", message: "The school has truly exceeded my expectations. My child’s growth and happiness are a testament to the dedication of the teachers.", location: "Kigali" },
            { name: "Niyonzima Jean", message: "This school is a blessing to our community. The staff’s care and commitment to excellence are unmatched.", location: "Huye" },
            { name: "Uwase Claudine", message: "I have seen such positive changes in my child’s confidence and academic performance. Highly recommended!", location: "Musanze" },
            { name: "Habimana Eric", message: "The facilities and the quality of education are outstanding. This is a school that values every student.", location: "Nyamasheke" },
            { name: "Ingabire Solange", message: "Amazing school with teachers who truly care. My child loves going to school every day.", location: "Rubavu" }
          ].map((parent, index) => (
            <motion.div
              key={index}
              variants={scaleHoverVariants}
              whileHover="hover"
              className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-md"
            >
              <img
                src={profile}
                alt={`Photo of ${parent.name}`}
                className="w-20 h-20 rounded-full object-cover mb-2"
              />
              <div className="text-yellow-500 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i}>⭐</span>
                ))}
              </div>
              <p className="text-gray-600 italic mb-1">"{parent.message}"</p>
              <span className="text-primary font-bold">- {parent.name}, {parent.location}</span>
            </motion.div>
          ))}
        </div>
      </motion.section>

    </div>
  );
};

export default Landing;