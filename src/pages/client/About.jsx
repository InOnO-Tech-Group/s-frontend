import React from 'react';
import { motion } from 'framer-motion';
import aboutUsHeroImage from '/classroom.png';
import microscope from '/microscope.png';
import ChemistryLab2 from '/Chemistry_Lab2.png';
import ChemistryLab from '/Chemistry_Lab.png';
import Library from '/Library.png';
import MCELab from '/MCE_Lab.png';
import MPCLab from '/MPC_Lab.png';
import principal from '/profile.jpg';
import science from '/history.png';
import history from '/history.png';
import displine from "/displine.png";
import excellent from "/excellence.jpg"
import hapiness from "/hapiness.jpg"
import determination from "/determination.jpg"
import creativity from "/creativity.png"
import accountability from "/accountability.jpg"

import { FiTarget } from 'react-icons/fi';
import { BsClock, BsEye } from 'react-icons/bs';
import { BiPhone } from 'react-icons/bi';
import { FaCube } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { TbUsersGroup } from 'react-icons/tb';
import { FaStar } from 'react-icons/fa6';

const About = () => {
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const scaleHoverVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative bg-cover bg-center h-[70vh] flex items-center justify-center"
        style={{ backgroundImage: `url(${aboutUsHeroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center text-white px-4 sm:px-8 md:px-16 z-10"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            About Us
          </h1>
          <p className="text-base sm:text-lg mt-2">
            <span className="hover:underline cursor-pointer text-white">
              Home
            </span>
            <span className="mx-2">›</span>
            <span className="text-primary">About us</span>
          </p>
        </motion.div>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUpVariants}
        className="md:w-[50vw] mx-auto flex flex-col md:flex-ro lg:flex-row py-8 px-4"
      >
        <div className="md:w-1/2 bg-primary p-6 text-white flex-1 mb-8 lg:mb-0 rounded-lg shadow-lg">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4">
            Who we are?
          </h2>
          <p className="text-sm sm:text-base text-justify">
            Welcome to ES Gishoma, where quality education meets community
            empowerment.
            <br />
            <br />
            At ES Gishoma, we are dedicated to shaping the minds and character
            of Rwanda's future leaders. Situated in a supportive and inclusive
            environment, our school emphasizes academic excellence, moral
            integrity, and a commitment to lifelong learning.
            <br />
            <br />
            We believe that education should not only focus on academic success
            but also nurture students' creativity, leadership abilities, and
            social responsibility.
          </p>
        </div>

        <div className="flex-1 space-y-6 mt-8">
          <motion.div
            variants={scaleHoverVariants}
            className="bg-white rounded-lg text-center"
          >
            <div className="text-3xl text-primary-600 mb-4 flex justify-center items-center ">
              <FiTarget className="text-primary" />
              <span className="ml-2 font-semibold text-lg">Mission</span>
            </div>
            <p className="text-sm p-2 sm:text-base text-justify">
              To educate excellently a learner with required Knowledge Skills,
              Attitudes and Values.
            </p>
          </motion.div>

          <motion.div
            variants={scaleHoverVariants}
            className="bg-white p-2 rounded-lg text-center"
          >
            <div className="text-3xl text-primary-600 mb-4 flex justify-center items-center">
              <BsEye className="text-primary" />
              <span className="ml-2 font-semibold text-lg">Vision</span>
            </div>
            <p className="text-sm sm:text-base text-justify">
              Excellence in silence, Technology and Culture for responding to
              society needs.
            </p>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUpVariants}
        className="bg-gray-300 pb-10"
      >
        <div
          className="px-4 py-8 max-w-screen-xl mx-auto"
          style={{ maxWidth: '80%' }}
        >
          <div className="mb-12">
            <div className="flex flex-col lg:flex-row items-center">
              <div className="flex-1 flex flex-col items-center lg:items-start">
                <div className="text-3xl text-primary-600 mb-4 flex items-center">
                  <BsClock className="text-primary text-4xl" />
                  <span className="ml-3 font-semibold text-xl">
                    Our History
                  </span>
                </div>
                <p className="text-gray-600 text-justify max-w-lg">
                  Through decades of service, ES Gishoma has remained steadfast
                  in its commitment to fostering a supportive learning
                  environment.
                </p>
              </div>
              <motion.div
                variants={scaleHoverVariants}
                whileHover="hover"
                className="flex-1 mt-6 lg:mt-0"
              >
                <img
                  src={history}
                  alt="Our History"
                  className="rounded-lg shadow-lg object-cover w-full h-72"
                />
              </motion.div>
            </div>
          </div>

          <div>
            <h1 className="flex items-center font-bold pb-8">
              <FaStar className="text-primary" />
              Core Values
            </h1>
            <div className="flex flex-col md:flex-row gap-10">
              {[
                {
                  name: 'DISCIPLINE',
                  description:
                    'Disciplined mind lead to happiness and undisciplined mind lead to suffering',
                  image: displine,
                },
                {
                  name: 'EXCELLENCE',
                  description:
                    'Excellence is no accident but a continous process. Excellence is doing ordinary things in extraordinary ways',
                  image: excellent,
                },
                {
                  name: 'DETERMINATION',
                  description: 'Determination is out driving force',
                  image: determination,
                },
              ].map((value, index) => (
                <motion.div
                  key={index}
                  variants={scaleHoverVariants}
                  whileHover="hover"
                  className="group relative w-full h-40 bg-cover bg-center rounded-lg shadow-md"
                  style={{ backgroundImage: `url(${value.image})` }}
                >
                  <h2 className="text-center font-bold text-white mt-4">
                    {value.name}
                  </h2>
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="px-2">{value.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="flex flex-col mt-10 md:flex-row gap-10">
              {[
                {
                  name: 'ACCOUNTABILITY',
                  description:
                    'Responsibility equals accountability. Accountability equals ownership and sense of ownership is the most powerful thing the team or organisation can have.',
                  image: accountability,
                },
                {
                  name: 'HAPPINESS',
                  description: 'Be happy. Be happy. Be Happy',
                  image: hapiness,
                },
                {
                  name: 'CREATIVITY',
                  description: 'There is no success without failure',
                  image: creativity,
                },
              ].map((value, index) => (
                <motion.div
                  key={index}
                  variants={scaleHoverVariants}
                  whileHover="hover"
                  className="group relative w-full h-40 bg-cover bg-center rounded-lg shadow-md"
                  style={{ backgroundImage: `url(${value.image})` }}
                >
                  <h2 className="text-center font-bold text-white mt-4">
                    {value.name}
                  </h2>
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="px-2">
                      {value.description}
                      {value === 'Technology' &&
                        'We embrace application of scientific knowledge in practical basis specifically in our teaching sector.'}
                      {value === 'Culture' &&
                        'We ensure collection of beliefs, behaviours, values and practices that define our society.'}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUpVariants}
        className="w-full py-8 px-4"
      >
        <div className="w-full md:w-[50vw] mb-12 mx-auto">
          <div className="text-3xl text-primary-600 mb-4 flex items-center space-x-4">
            <FaCube className="text-primary text-4xl" />
            <span className="font-semibold text-xl">Combinations</span>
          </div>

          <div className="flex flex-col lg:flex-row items-center">
            <div className="flex-1 flex flex-col items-center lg:items-start mb-6 lg:mb-0">
              <h1 className="font-bold text-2xl text-gray-800">
                Ordinary Level
              </h1>
              <p className="text-gray-600 text-justify max-w-lg text-sm p-2 pl-0">
                The Ordinary Level at ES Gishoma includes classes from Senior
                One to Senior Three, providing foundational knowledge across
                core subjects and preparing students for National Examinations.
              </p>
            </div>
            <motion.div
              variants={scaleHoverVariants}
              whileHover="hover"
              className="flex-1 mt-6 lg:mt-0"
            >
              <img
                src={science}
                alt="Ordinary Level"
                className="rounded-lg shadow-lg object-cover w-full h-72 lg:h-96"
              />
            </motion.div>
          </div>

          <div className="mt-8">
            <h1 className="font-bold text-xl mb-3 text-gray-800">
              Advanced Level
            </h1>
            <p className="mb-5 text-gray-600 text-justify">
              In the Advanced Level program, covering Senior Four to Senior Six,
              ES Gishoma offers various subject combinations tailored to meet
              diverse student interests and career aspirations.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
              {[
                {
                  name: 'MCB',
                  description: 'Mathematics - Chemistry - Biology',
                  image: ChemistryLab,
                },
                {
                  name: 'MPC',
                  description: 'Mathematics - Physics - Chemistry',
                  image: MPCLab,
                },
                {
                  name: 'PCB',
                  description: 'Physics',
                  image: ChemistryLab2,
                },
                {
                  name: 'MCE',
                  description: 'Mathematics - Computer - Economy',
                  image: MCELab,
                },
                {
                  name: 'MPG',
                  description: 'Descriptions of MPG',
                  image: science,
                },
                {
                  name: 'BCG',
                  description: 'Descriptions of BCG',
                  image: science,
                },
              ].map((combination, index) => (
                <motion.div
                  key={index}
                  variants={scaleHoverVariants}
                  whileHover="hover"
                  className="relative rounded-lg overflow-hidden shadow-lg transform transition-transform bg-cover bg-center group"
                  style={{
                    backgroundImage: `url(${combination.image})`,
                    height: '150px',
                  }}
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4 bg-gradient-to-t from-black opacity-75">
                    <p className="font-semibold text-lg text-white">
                      {combination.name}
                    </p>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="px-4">{combination.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUpVariants}
        className="w-full flex pb-12 pt-4 bg-gray-300"
      >
        <div className="w-[80vw] mx-auto px-4 sm:px-6 lg:px-8 bg-gray-300">
          <div className="text-center mb-10">
            <div className="text-4xl text-primary-600 font-bold mb-4 flex items-center justify-center">
              <TbUsersGroup className="text-primary text-5xl mr-3" />
              <span>Our School Leaders</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center">
              <div
                variants={scaleHoverVariants}
                whileHover="hover"
                className="bg-white shadow-lg rounded-3xl overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={principal}
                  alt="School Leader"
                  className="w-full h-68 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-800">
                    MWITABA Anaclet
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">School Director</p>
                  <div className="flex items-center text-sm text-gray-700 mb-2">
                    <BiPhone className="mr-2 text-primary-600" />
                    +250788458307
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <MdEmail className="mr-2 text-primary-600" />
                    mwitabaanaclet@gmail.com
                  </div>
                </div>
              </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
