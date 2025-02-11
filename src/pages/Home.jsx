import Navbar from "../components/Navbar";
import bg_img from "../assets/img/edit.png"
import cv from "../assets/cv/Muhammad Huzaifa Web & App Developer.pdf"
import { Typewriter } from "react-simple-typewriter";
import { useEffect, useState } from "react";
import { FaCog, FaDatabase, FaGlobe } from "react-icons/fa";

function Home() {
  const [aboutSelect, setAboutSelect] = useState('skills')

  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash;
      
      if (hash) {
        const element = document.querySelector(hash); 
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    scrollToHash();
  }, []);

  return (
    // Main 
    <div id="home" className="px-5 md:px-10 lg:px-28 container mx-auto">

      {/* Navbar  */}
      <Navbar />


      {/* Hero Section  */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 -4">
        <div className="h-[500px] sm:h-[450px] flex flex-col justify-center">
          <div className="flex flex-col">

            <p className="text-xl font-medium mb-2">Full Stack Developer</p>
            <p className="text-2xl sm:text-3xl font-bold mb-4">
              Hi, I'm{" "}
              <span className="text-[#FF004F]">
                <Typewriter
                  words={["Muhammad Huzaifa", "a Full Stack Developer"]}
                  loop={true}
                  cursor
                  cursorStyle="|"
                  typeSpeed={100}
                  deleteSpeed={100}
                  delaySpeed={1000}
                />
              </span>
            </p>
            <p className="font-semibold text-sm">A Full Stack Developer skilled in Tailwind, React Js,Next Js, Node.js, Express, and MongoDB, crafting responsive and high-performance web applications. I specialize in both frontend and backend, delivering seamless user experiences with precision and efficiency. 🚀</p>
            <div className="mt-5 flex flex-wrap gap-1">
              <button className="border-4 px-4  p-2 cursor-pointer bg-white text-black font-semibold rounded-4xl">Contact</button>
              <a href={cv} download className="border-4 px-4  p-2 cursor-pointer bg-white text-black font-semibold rounded-4xl">Download Cv</a>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="h-[450px] flex justify-center lg:justify-end">
          <img src={bg_img} alt="Background" className="h-full bg-fixed object-contain rounded-xl" />
        </div>
      </div>

      {/* About Section  */}
      <div id="about" className="pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-9">
          <div className="flex justify- max-h-[450px] lg:col-span-4">
            <img src={bg_img} alt="Image" className="object-contain w-[90%] bg-gray-700 rounded-xl" />
          </div>
          <div className="flex flex-col gap-5 mt-10 lg:mt-0 lg:col-span-5">
            <h1 className="text-3xl sm:text-4xl font-bold">About Me</h1>
            <p className="text-gray-300 text-sm font-semibold">I am a Full Stack Developer skilled in Tailwind CSS, React.js, Next.js, Node.js, Express, and MongoDB. I specialize in building responsive, high-performance web applications with seamless functionality and user experience🚀.</p>
            <div className="flex gap-5 mb-4 overflow-x-auto whitespace-nowrap aboutScrollBar">
              {['skills', 'experience', 'education'].map((item) => (
                <button
                  key={item}
                  onClick={() => setAboutSelect(item)}
                  className={`relative text-white p-2 transition hover:scale-105 
      ${aboutSelect === item ? "after:w-full after:bg-[#FF004F]" : "hover:text-gray-200"}  
      after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] 
      after:bg-[#FF004F] after:transition-all after:duration-300 hover:after:w-full`}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </button>
              ))}
            </div>


            <div>
              {aboutSelect == 'skills' &&

                <div className="flex flex-col gap-2.5">
                  <p className="text-[#FF004F] font-[500]">Frontend</p>
                  <p>React Js, Next Js, Tailwind CSS</p>
                  <p className="text-[#FF004F] font-[500]">Backend</p>
                  <p>Node Js, Express Js</p>
                  <p className="text-[#FF004F] font-[500]">Database</p>
                  <p>MongoDB , Firebase</p>
                </div>

              }
              {aboutSelect == 'experience' &&

                <div className="flex flex-col gap-2.5">
                  <p className="text-[#FF004F] font-[500]">MH-Store (2024)</p>
                  <p>E-commerce platform with admin panel</p>

                  <p className="text-[#FF004F] font-[500]">Doctor Appointment System (2024)</p>
                  <p>Next.js-based doctor booking system</p>

                  <p className="text-[#FF004F] font-[500]">LMS (2025)</p>
                  <p> Learning management system for courses and students</p>
                </div>

              }
              {aboutSelect == 'education' &&

                <div className="flex flex-col gap-2.5">
                  <p className="text-[#FF004F] font-[500]">Intermediate (2nd Year, Ongoing)</p>
                  <p>Degree College</p>

                  <p className="text-[#FF004F] font-[500]">Web Development Certification (2024)</p>
                  <p>SMIT (Saylani Mass IT Training)</p>
                </div>

              }
            </div>
          </div>
        </div>
      </div>

      {/* My Services  */}
      <div className="pt-32" id="service">
        <p className="font-bold sm:text-4xl text-3xl">My Services</p>

        <div className="grid grid-cols-3 gap-5 border">
          <div className="bg-gray-700 p-10 flex flex-col gap-3">
            <FaGlobe className="text-3xl text-blue-500" />
            <p className="font-bold text-xl">Frontend Development</p>
            <p>Crafting responsive, user-friendly interfaces with modern frameworks like React Js , Next Js and Tailwind CSS.</p>
          </div>
          <div className="bg-gray-700 p-10 flex flex-col gap-3">
            <FaCog className="text-3xl text-gray-200" />

            <p className="font-bold text-xl">Backend Development</p>
            <p>Building scalable server-side logic using Node.js, Express.js, and RESTful APIs.</p>
          </div>
          <div className="bg-gray-700 p-10 flex flex-col gap-3">
            <FaDatabase className="text-3xl text-gray-200" />

            <p className="font-bold text-xl">Database Management</p>
            <p>Designing and optimizing databases with MongoDB and Firebase for efficient data storage.</p>
          </div>
        </div>
      </div>


    </div>

  )
}

export default Home;