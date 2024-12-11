import React from 'react';
import aboutUsHeroImage from '/classroom.png';
import microscope from '/microscope.png';
import principal from '/principal.png';
import science from '/science.png';
import { FiTarget } from 'react-icons/fi';
import { BsClock, BsEye, BsLayers, BsStar } from 'react-icons/bs';
import { BiPhone } from 'react-icons/bi';
import { FaCube } from 'react-icons/fa';
import { MdEmail, MdLeaderboard } from 'react-icons/md';
import { TbUsersGroup } from 'react-icons/tb';

const About = () => {
  return (
    <div>
      <div
        className="relative bg-cover bg-center h-[70vh] flex items-center justify-center"
        style={{ backgroundImage: `url(${aboutUsHeroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        <div className="text-center text-white px-4 sm:px-8 md:px-16 z-10">
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
        </div>
      </div>
      <div className="flex flex-col lg:flex-row py-8 px-4 sm:px-8 lg:px-16 max-w-4xl mx-auto">
        <div className="bg-primary text-white p-6 flex-1 mb-8 lg:mb-0 rounded-lg shadow-lg">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4">
            Who we are?
          </h2>
          <p className="text-sm sm:text-base">
            Welcome to ES Gishoma, where quality education meets community
            empowerment.
            <br />
            <br />
            At ES Gishoma, we are dedicated to shaping the minds and character
            of Rwanda’s future leaders. Situated in a supportive and inclusive
            environment, our school emphasizes academic excellence, moral
            integrity, and a commitment to lifelong learning.
            <br />
            <br />
            We believe that education should not only focus on academic success
            but also nurture students' creativity, leadership abilities, and
            social responsibility.
          </p>
        </div>

        <div className="flex-1 space-y-6">
          <div className="bg-white p-4 rounded-lg text-center">
            <div className="text-3xl text-primary-600 mb-4 flex justify-center items-center">
              <FiTarget className="text-primary" />
              <span className="ml-2 font-semibold text-lg">Mission</span>
            </div>
            <p className="text-sm sm:text-base">
              At <strong>ES Gishoma</strong>, our mission is to provide a
              well-rounded, inclusive education that inspires students to
              achieve their highest potential and become responsible, impactful
              members of society. We focus on nurturing academic excellence,
              ethical character, and a commitment to service, empowering
              students to be leaders and innovators of tomorrow.{' '}
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg text-center">
            <div className="text-3xl text-primary-600 mb-4 flex justify-center items-center">
              <BsEye className="text-primary" />
              <span className="ml-2 font-semibold text-lg">Vision</span>
            </div>
            <p className="text-sm sm:text-base">
              Our vision is to become a leading educational institution in
              Rwanda, known for academic excellence, strong community ties, and
              a nurturing environment where every student is empowered to excel
              and positively contribute to the world around them.{' '}
            </p>
          </div>
        </div>
      </div>
      <div className="bg-gray-300 pb-10">
        <div
          className="px-4 py-8  max-w-screen-xl mx-auto"
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
                <p className="text-gray-600 text-center lg:text-left max-w-lg">
                  Through decades of service, ES Gishoma has remained steadfast
                  in its commitment to fostering a supportive learning
                  environment. Milestones include the expansion of academic
                  facilities, the introduction of extracurricular programs, and
                  partnerships with community organizations. These developments
                  have allowed us to continuously raise our standards, providing
                  students with a holistic education that prepares them for the
                  challenges of the future.
                </p>
              </div>
              <div className="flex-1 mt-6 lg:mt-0">
                <img
                  src={science}
                  alt="Our History"
                  className="rounded-lg shadow-lg object-cover w-full h-72"
                />
              </div>
            </div>
          </div>

          <div className="mt-12">
            <div className="text-3xl text-primary-600 mb-6 flex">
              <BsStar className="text-primary text-4xl" />
              <span className="ml-3 font-semibold text-xl">Core Values</span>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div
                className="flex-1 h-64 rounded-lg relative bg-cover bg-center overflow-hidden shadow-md transform transition-transform hover:scale-105 hover:bg-primary"
                style={{ backgroundImage: `url(${microscope})` }}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                  <p className="font-semibold text-lg">Science</p>
                  <p className="text-gray-200 mt-2 text-center px-4 opacity-0 hover:opacity-100 transition-opacity">
                    We prioritize evidence-based approaches to innovation.
                  </p>
                </div>
              </div>

              <div
                className="flex-1 h-64 rounded-lg relative bg-cover bg-center overflow-hidden shadow-md transform transition-transform hover:scale-105"
                style={{ backgroundImage: `url(${microscope})` }}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                  <p className="font-semibold text-lg">Technology</p>
                  <p className="text-gray-200 mt-2 text-center px-4 opacity-0 hover:opacity-100 transition-opacity">
                    Harnessing technology to create solutions that matter.
                  </p>
                </div>
              </div>

              <div
                className="flex-1 h-64 rounded-lg relative bg-cover bg-center overflow-hidden shadow-md transform transition-transform hover:scale-105"
                style={{ backgroundImage: `url(${microscope})` }}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                  <p className="font-semibold text-lg">Culture</p>
                  <p className="text-gray-200 mt-2 text-center px-4 opacity-0 hover:opacity-100 transition-opacity">
                    Embracing diversity and fostering a collaborative spirit.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-8 px-6 max-w-5xl mx-auto">
        <div className="mb-12 mx-auto" style={{ maxWidth: '80%' }}>
          <div className="text-3xl text-primary-600 mb-4 flex items-center space-x-4">
            <FaCube className="text-primary text-4xl" />
            <span className="font-semibold text-xl">Combinations</span>
          </div>
          <div className="flex flex-col lg:flex-row items-center">
            <div className="flex-1 flex flex-col items-center lg:items-start mb-6 lg:mb-0">
              <h1 className="font-bold text-2xl text-gray-800">
                Ordinary Level
              </h1>
              <p className="text-gray-600 text-justify lg:text-left max-w-lg text-sm p-2 pl-0">
                <p>
                  The Ordinary Level at ES Gishoma includes classes from Senior
                  One to Senior Three. During these years, students follow a
                  comprehensive curriculum that provides them with foundational
                  knowledge across core subjects, preparing them for the
                  National Examinations held at the end of Senior Three.
                </p>
                <p>
                  Our Ordinary Level program is known for its academic
                  excellence, with our students consistently achieving high
                  rankings in these national exams. This success is a testament
                  to our school's dedicated teaching staff, supportive learning
                  environment, and a strong emphasis on skill development and
                  academic competency.
                </p>
                <p>
                  Through our Ordinary Level program, we equip students with the
                  knowledge and skills needed for success in further studies or
                  vocational pursuits.
                </p>
              </p>
            </div>
            <div className="flex-1 mt-6 lg:mt-0">
              <img
                src={science}
                alt="Our History"
                className="rounded-lg shadow-lg object-cover w-full h-72 lg:h-96"
              />
            </div>
          </div>
          <div className="mt-8">
            <h1 className="font-bold text-xl mb-3 text-gray-800">
              Advanced Level
            </h1>
            <p className="mb-5 text-gray-600">
              In the Advanced Level program, covering Senior Four to Senior Six,
              ES Gishoma offers a variety of subject combinations tailored to
              meet diverse student interests and career aspirations. These
              combinations provide students with the specialized knowledge and
              skills needed for higher education and technical careers.
              Supported by skilled teachers and modern labs, ES Gishoma’s
              Advanced Level program focuses on academic excellence and
              practical skills for future success. In these combinations, we
              find:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
              {[
                {
                  name: 'MEG',
                  description:
                    'We prioritize evidence-based approaches to innovation.',
                },
                {
                  name: 'PCB',
                  description:
                    'Harnessing technology to create solutions that matter.',
                },
                {
                  name: 'MCB',
                  description:
                    'Embracing diversity and fostering a collaborative spirit.',
                },
                {
                  name: 'MEG',
                  description:
                    'We prioritize evidence-based approaches to innovation.',
                },
                {
                  name: 'PCB',
                  description:
                    'Harnessing technology to create solutions that matter.',
                },
                {
                  name: 'MCB',
                  description:
                    'Embracing diversity and fostering a collaborative spirit.',
                },
              ].map((combination, index) => (
                <div
                  key={index}
                  className="relative rounded-lg overflow-hidden shadow-lg transform transition-transform hover:scale-105 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${science})`,
                    height: '100px',
                  }}
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4 bg-gradient-to-t from-black opacity-75">
                    <p className="font-semibold text-lg text-white">
                      {combination.name}
                    </p>
                    <p className="opacity-0 hover:opacity-100 text-gray-200 text-center mt-2 transition-opacity">
                      {combination.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="pb-12 pt-4 bg-gray-300">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="text-4xl text-primary-600 font-bold mb-4 flex items-center justify-center">
              <TbUsersGroup className="text-primary text-5xl mr-3" />
              <span>Our School Leaders</span>
            </div>
            <p className="text-lg text-gray-600">
              Meet the dedicated individuals leading our institution towards
              academic excellence and community growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <img
                src={principal}
                alt="School Leader"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800">
                  John Doe
                </h3>
                <p className="text-sm text-gray-500 mb-3">School Principal</p>
                <div className="flex items-center text-sm text-gray-700 mb-2">
                  <BiPhone className="mr-2 text-primary-600" />
                  +250781234567
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <MdEmail className="mr-2 text-primary-600" />
                  johndoe@gmail.com
                </div>
              </div>
            </div>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <img
                src={principal}
                alt="School Leader"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800">
                  John Doe
                </h3>
                <p className="text-sm text-gray-500 mb-3">School Principal</p>
                <div className="flex items-center text-sm text-gray-700 mb-2">
                  <BiPhone className="mr-2 text-primary-600" />
                  +250781234567
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <MdEmail className="mr-2 text-primary-600" />
                  johndoe@gmail.com
                </div>
              </div>
            </div>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <img
                src={principal}
                alt="School Leader"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800">
                  John Doe
                </h3>
                <p className="text-sm text-gray-500 mb-3">School Principal</p>
                <div className="flex items-center text-sm text-gray-700 mb-2">
                  <BiPhone className="mr-2 text-primary-600" />
                  +250781234567
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <MdEmail className="mr-2 text-primary-600" />
                  johndoe@gmail.com
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
