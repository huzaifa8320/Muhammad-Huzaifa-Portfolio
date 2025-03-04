import Navbar from "../../components/Navbar";
import cv from "../../assets/cv/Muhammad Huzaifa Web & App Developer.pdf"
import { Typewriter } from "react-simple-typewriter";
import { useEffect, useRef, useState } from "react";
import { FaArrowUp, FaCog, FaDatabase, FaEnvelope, FaFacebook, FaGlobe, FaLink, FaLinkedin, FaPhone, FaPhoneSquare, FaSpinner } from "react-icons/fa";
import { FaInstagram, FaXTwitter } from "react-icons/fa6";
import { getProjects } from "../../api/projects/project";
import { sendEmail } from "../../api/email/email";
import { notification } from "antd";
import { Button } from "antd";

function Home() {
  const [aboutSelect, setAboutSelect] = useState('skills')
  const [showButton, setShowButton] = useState(false);
  const [error, setError] = useState("");
  const [projects, setProjects] = useState([])
  const [gettingProj, setGettingProj] = useState(true)
  const [sendingMail, setSendingMail] = useState(false)


  const openNotification = (type, message, description) => {
    notification[type]({ message, description, placement: "topRight" });
  };
  // Fetch projects when component mounts
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data?.data);
      setGettingProj(false)
    } catch (error) {
      console.error("Error fetching projects:", error);
      setGettingProj(false)
    }
  };

  getProjects()

  // Use Ref 
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);

  // Scroll Smooth 
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


  // Go Top Icon 
  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
  }, []);



  //Email Submit Handle 
  const handleSubmit = async (e) => {
    setSendingMail(true)
    e.preventDefault(); // Prevent page reload

    const formData = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      message: messageRef.current.value,
    };


    // Validation check 
    if (!formData.name || !formData.email || !formData.message) {
      setError("All fields are required!");
      setSendingMail(false)
      setTimeout(() => {
        setError('')
      }, 2000);

      return;
    }


    await sendEmail(formData)
      .then((res) => {
        console.log(res);
        nameRef.current.value = "";
        emailRef.current.value = "";
        messageRef.current.value = "";
        openNotification("success", "Success", "Your Request sent successfully We will Response you Soon!");
        setSendingMail(false)
      })
      .catch((err) => {
        console.log(err);
        openNotification("error", "Error", "Failed to send email!");
        setSendingMail(false)
      });



  };

  return (
    // Main 
    <div id="home" className="px-5 md:px-10 lg:px-28 container mx-auto">

      {/* Navbar  */}
      <Navbar />

      {/* Hero Section  */}
      <div className="grid pt-20 grid-cols-1 lg:grid-cols-2 gap-4 -4">
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
            <div className="mt-5 flex flex-wrap gap-3">
              <a href="#contact" className="px-4 p-2 cursor-pointer bg-white text-black font-semibold rounded-4xl transition-all duration-300 hover:bg-gray-200 hover:scale-105">
                Contact
              </a>

              <a href={cv} download className="px-4 items-center flex p-2 cursor-pointer bg-[#FF004F] text-white font-semibold rounded-4xl transition-all duration-300 hover:bg-[#d4003a] hover:scale-105">
                Download CV
              </a>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="h-[450px] flex justify-center lg:justify-end">
          <img src="https://res.cloudinary.com/deoqroxyy/image/upload/v1739883452/User_image_vypcci.png" alt="Background" className="h-full bg-fixed object-contain rounded-xl" />
        </div>
      </div>

      {/* About Section  */}
      <div id="about" className="pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-9">
          <div className="flex justify-center lg:justify-normal max-h-[450px] lg:col-span-4">
            <img src="https://res.cloudinary.com/deoqroxyy/image/upload/v1739883452/User_image_vypcci.png" alt="Image" className="object-contain lg:w-[90%] bg-gray-700 rounded-xl" />
          </div>
          <div className="flex flex-col gap-5 mt-10 lg:mt-0 lg:col-span-5">
            <h1 className="text-3xl sm:text-4xl font-bold">About Me</h1>
            <p className="text-gray-300 text-sm font-semibold">I am a Full Stack Developer skilled in Tailwind CSS, React.js, Next.js, Node.js, Express, and MongoDB. I specialize in building responsive, high-performance web applications with seamless functionality and user experience🚀.</p>
            <div className="flex gap-5 mb-4 overflow-x-auto whitespace-nowrap aboutScrollBar">
              {['skills', 'experience', 'education'].map((item) => (
                <button
                  key={item}
                  onClick={() => setAboutSelect(item)}
                  className={`relative text-white p-2 transition hover:scale-105 hover:text-gray-200 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-[#FF004F] after:w-0 after:transition-all after:duration-300 ${aboutSelect === item ? "after:w-full" : "hover:after:w-full"}`}
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
      <div className="pt-32 flex flex-col gap-8" id="service">
        <p className="font-bold sm:text-4xl text-3xl">My Services</p>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">

          <div className="bg-gray-700 p-10 flex flex-col gap-3 rounded-2xl cursor-pointer hover:bg-[#FF004F] hover:-translate-y-2 transition-all duration-300">

            <FaGlobe className="text-3xl text-blue-500 transition-colors duration-300 hover:text-white" />
            <p className="font-bold text-xl transition-colors duration-300 hover:text-white">Frontend Development</p>
            <p className="transition-colors duration-300 hover:text-gray-200">
              Crafting responsive, user-friendly interfaces with modern frameworks like React Js, Next Js, and Tailwind CSS.
            </p>
          </div>

          <div className="bg-gray-700 p-10 flex flex-col gap-3 rounded-2xl cursor-pointer hover:bg-[#FF004F] hover:-translate-y-2 transition-all duration-300">
            <FaCog className="text-3xl text-gray-300" />
            <p className="font-bold text-xl">Backend Development</p>
            <p>Building scalable server-side logic using Node.js, Express.js, and RESTful APIs.</p>
          </div>
          <div className="bg-gray-700 p-10 flex flex-col gap-3 rounded-2xl cursor-pointer hover:bg-[#FF004F] hover:-translate-y-2 transition-all duration-300">
            <FaDatabase className="text-3xl text-cyan-400" />

            <p className="font-bold text-xl">Database Management</p>
            <p>Designing and optimizing databases with MongoDB and Firebase for efficient data storage.</p>
          </div>
        </div>
      </div>

      {/* Portfolio */}
      <div className="pt-32 flex flex-col gap-8" id="portfolio">
        <p className="font-bold sm:text-4xl text-3xl">My Work</p>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-10">
          {gettingProj ? (
            <div>

              <FaSpinner className="animate-spin text-5xl" />
            </div>
          ) : (
            projects.map((project) => (
              <div
                key={project.id}
                className="relative h-[200px] col-span-2 group hover:scale-105  transition-transform duration-300 shadow-white cursor-pointer overflow-hidden rounded-xl"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
                />
                {/* Hover Effect with Red Gradient */}
                <div className="absolute p-4 rounded-xl inset-0 bg-gradient-to-t from-red-700 to-gray-900/10 flex flex-col items-center justify-center text-white opacity-0 translate-y-full transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                  <p className="text-base font-semibold text-center">{project.title}</p>
                  <p className="text-sm mt-2 text-center">{project.description}</p>
                  {/* Link Icon */}
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 text-white text-lg hover:text-gray-300 transition"
                  >
                    <FaLink />
                  </a>
                </div>
              </div>
            ))
          )}

        </div>
      </div>



      {/* Contact  */}
      <div className="pt-32 flex flex-col" id="contact">
        <div className="grid grid-cols-1 md:grid-cols-9 gap-10">
          <div className="gap-10 flex flex-col col-span-4">
            <p className="font-bold sm:text-4xl text-3xl">Contact Me</p>
            <div className="text-[#FF004F] flex flex-col gap-8">

              <div className="flex items-center">
                <a href="mailto:muhammadhuzaifa8320@gmail.com" className="gap-2 inline-flex items-center">
                  <FaEnvelope className="text-xl" />
                  <span className="text-gray-300">muhammadhuzaifa8320@gmail.com</span>
                </a>
              </div>

              <div className="flex items-center">
                <a href="tel:+923135909715" className="inline-flex items-center gap-2">
                  <FaPhoneSquare className="text-xl" />
                  <span className="text-gray-300">+923135909715</span>
                </a>
              </div>

              <div className="flex gap-3 text-2xl text-gray-300">
                <a href="https://www.linkedin.com/in/muhammadhuzaifa8320" target="_blank" className="hover:scale-125 transition-all duration-300"><FaLinkedin /></a>
                <a href="https://x.com/Mhuzaifa8320" target="_blank" className="hover:scale-125 transition-all duration-300"><FaXTwitter /></a>
                <a href="https://www.facebook.com/profile.php?id=61558296560221" target="_blank" className="hover:scale-125 transition-all duration-300"><FaFacebook /></a>
                <a href="https://www.instagram.com/muhammadhuzaifa8320" target="_blank" className="hover:scale-125 transition-all duration-300"><FaInstagram /></a>
              </div>
              <div>
                <a href={cv} download className="px-8 inline-block p-2 cursor-pointer bg-[#FF004F] text-white font-semibold rounded-lg transition-all duration-300 hover:bg-[#d4003a] hover:scale-105">Download Cv</a>
              </div>
            </div>
          </div>

          <div className="col-span-5">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <input ref={nameRef} type="text" className="bg-gray-700 p-2.5 transition-all duration-500 focus:ps-5 outline-none rounded-lg" placeholder="Your Name" />
              <input ref={emailRef} type="email" className="bg-gray-700 p-2.5 transition-all duration-500 focus:ps-5 outline-none rounded-lg" placeholder="Your Email" />
              <textarea ref={messageRef} rows={6} className="bg-gray-700 p-2.5 resize-none transition-all duration-500 focus:ps-5 outline-none rounded-lg" placeholder="Your Message" ></textarea>
              {error && <p className="text-[#FF004F]">{error}</p>}
              <div>

                <Button
                  type="default"
                  size="large"
                  loading={sendingMail}
                  onClick={handleSubmit}
                  className="!p-2 !w-40 !text-white !rounded-lg !bg-[#FF004F] transition-all duration-300 hover:!bg-[#d4003a] hover:scale-105"
                >
                  Submit
                </Button>

              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Go to Top  */}
      {showButton &&
        <a href="#home" className="fixed z-10 bottom-0 right-0 m-5 sm:m-10 p-4 rounded-full bg-[#FF004F] text-xl"><FaArrowUp /></a>
      }

      {/* Footer  */}
      <div className="text-center right-0 bg-gray-700 text-gray-300 font-semibold absolute p-5 mt-16 w-full">
        <p>©{new Date().getFullYear()} Muhammad Huzaifa💖 All rights reserved.</p>
      </div>

    </div>

  )
}

export default Home;