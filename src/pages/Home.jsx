import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import {
  FaArrowRight,
  FaCode,
  FaDownload,
  FaGithub,
  FaLaptopCode,
  FaLightbulb,
  FaLinkedin,
  FaTools,
} from "react-icons/fa";
import { Link } from "react-router-dom";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

const Home = () => {
  const [personal, setPersonal] = useState(null);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch personal data
    fetch("/data/personal.json")
      .then((res) => res.json())
      .then((data) => setPersonal(data));

    // Fetch projects
    fetch("/data/projects.json")
      .then((res) => res.json())
      .then((data) => {
        setProjects(Array.isArray(data) ? data.slice(0, 3) : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    // Fetch skills
    fetch("/data/skills.json")
      .then((res) => res.json())
      .then((data) => setSkills(data));
  }, []);

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center bg-gradient-to-br from-[#E1F5F6] to-[#69C3CC]">
        <div className="container mx-auto px-4 md:px-6 py-12 flex flex-col-reverse md:flex-row items-center">
          <motion.div
            className="w-full md:w-1/2 mb-12 md:mb-0 flex flex-col items-center md:items-start text-center md:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="bg-[#089BAB]/10 text-[#089BAB] px-4 py-1 rounded-full font-medium inline-block mb-4 mx-auto md:mx-0"
              variants={itemVariants}
            >
              MERN Stack Developer
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-[#002B48] mx-auto md:mx-0"
              variants={itemVariants}
            >
              Asadullah <span className="text-[#089BAB]">Imran</span>
            </motion.h1>

            <motion.p
              className="text-xl text-[#002B48] mb-8 max-w-lg mx-auto md:mx-0"
              variants={itemVariants}
            >
              {personal?.tagline ||
                "Building scalable digital solutions with JavaScript ecosystems"}
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4 mb-8 justify-center md:justify-start"
              variants={itemVariants}
            >
              <Link
                to="/projects"
                className="bg-[#089BAB] hover:bg-[#002B48] text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 group"
              >
                <FaLaptopCode className="group-hover:rotate-6 transition-transform" />
                View Projects
              </Link>
              <a
                href="#"
                className="border-2 border-[#089BAB] text-[#089BAB] hover:bg-[#089BAB] hover:text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 group"
              >
                <FaDownload className="group-hover:translate-y-1 transition-transform" />
                Download CV
              </a>
            </motion.div>

            <motion.div
              className="flex gap-4 justify-center md:justify-start"
              variants={itemVariants}
            >
              {personal?.social?.map((social, index) => {
                let IconComponent;
                if (social.icon.includes("github")) IconComponent = FaGithub;
                else if (social.icon.includes("linkedin"))
                  IconComponent = FaLinkedin;
                else if (social.icon.includes("code")) IconComponent = FaCode;
                else IconComponent = FaCode;

                return (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-[#089BAB] flex items-center justify-center text-white hover:bg-[#002B48] transition-all duration-300 shadow-md hover:shadow-lg"
                    title={social.name}
                  >
                    <IconComponent className="text-lg" />
                  </a>
                );
              })}
            </motion.div>
          </motion.div>

          <motion.div
            className="md:w-1/2 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-[#089BAB] to-[#002B48] opacity-20 rounded-full"></div>
              <img
                src={
                  personal?.image?.replace("assets/images", "/images") ||
                  "/images/profile/b.jpg"
                }
                alt={personal?.name || "Asadullah Imran"}
                className="relative w-full h-full object-cover z-10"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      {skills && (
        <section className="py-16 bg-[#002B48]">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                My <span className="text-[#FF9801]">Skills</span>
              </h2>
              <div className="h-1 w-20 bg-[#089BAB] mx-auto"></div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {/* Programming Skills */}
              <motion.div
                className="bg-white p-6 rounded-xl shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h3 className="text-xl font-semibold mb-6 text-[#089BAB] flex items-center gap-2">
                  <FaCode className="text-[#FF9801]" />
                  Programming Languages
                </h3>
                {skills.programming.map((skill, idx) => (
                  <div key={idx} className="mb-6">
                    <div className="flex justify-between text-sm font-medium mb-1">
                      <span className="text-[#002B48]">{skill.name}</span>
                      <span className="text-[#089BAB]">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-[#69C3CC]/30 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-[#089BAB] to-[#009C9C] h-3 rounded-full"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Web Skills */}
              <motion.div
                className="bg-white p-6 rounded-xl shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="text-xl font-semibold mb-6 text-[#089BAB] flex items-center gap-2">
                  <FaLaptopCode className="text-[#FF9801]" />
                  Web Development
                </h3>
                {skills.web.map((skill, idx) => (
                  <div key={idx} className="mb-6">
                    <div className="flex justify-between text-sm font-medium mb-1">
                      <span className="text-[#002B48]">{skill.name}</span>
                      <span className="text-[#089BAB]">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-[#69C3CC]/30 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-[#089BAB] to-[#009C9C] h-3 rounded-full"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Tools */}
              <motion.div
                className="bg-white p-6 rounded-xl shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h3 className="text-xl font-semibold mb-6 text-[#089BAB] flex items-center gap-2">
                  <FaTools className="text-[#FF9801]" />
                  Tools & Technologies
                </h3>
                <div className="flex flex-wrap gap-3">
                  {skills.tools.map((tool, idx) => (
                    <span
                      key={idx}
                      className="bg-[#089BAB]/10 text-[#089BAB] px-4 py-2 rounded-lg text-sm font-medium shadow-md"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Concepts */}
              <motion.div
                className="bg-white p-6 rounded-xl shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h3 className="text-xl font-semibold mb-6 text-[#089BAB] flex items-center gap-2">
                  <FaLightbulb className="text-[#FF9801]" />
                  Concepts & Methodologies
                </h3>
                <div className="flex flex-wrap gap-3">
                  {skills.concepts.map((concept, idx) => (
                    <span
                      key={idx}
                      className="bg-[#FF9801]/10 text-[#002B48] px-4 py-2 rounded-lg text-sm font-medium shadow-md"
                    >
                      {concept}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Projects Section */}
      <section className="py-20 bg-[#E1F5F6]">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#002B48] mb-4">
              Featured <span className="text-[#089BAB]">Projects</span>
            </h2>
            <div className="h-1 w-20 bg-[#089BAB] mx-auto mb-4"></div>
            <p className="text-[#002B48]/80">
              Explore some of my recent projects showcasing my skills in web
              development and AI
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading && (
              <div className="col-span-full text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#089BAB] mx-auto"></div>
              </div>
            )}

            {!loading &&
              projects.map((project, idx) => (
                <motion.div
                  key={idx}
                  className="bg-white rounded-xl shadow-lg overflow-hidden border border-[#69C3CC]/30 hover:shadow-xl transition-all duration-300"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -10 }}
                >
                  <div className="h-48 overflow-hidden relative">
                    {project.featuredImage?.src ? (
                      <img
                        src={project.featuredImage.src.replace(
                          "assets/images",
                          "/images"
                        )}
                        alt={project.featuredImage.alt || project.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                    ) : (
                      <div className="bg-gradient-to-r from-[#089BAB] to-[#009C9C] w-full h-full flex items-center justify-center">
                        <span className="text-white text-xl font-bold text-center px-4">
                          {project.title}
                        </span>
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#002B48] to-transparent p-4">
                      <h3 className="text-white text-xl font-bold">
                        {project.title}
                      </h3>
                      {project.category && (
                        <div className="text-[#FF9801] text-sm">
                          {Array.isArray(project.category)
                            ? project.category[0]
                            : project.category}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-[#002B48] mb-4">{project.tagline}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 4).map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="bg-[#089BAB]/10 text-[#089BAB] text-xs px-3 py-1 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Key Features (max 3, then +N) */}
                    {project.features && project.features.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.features.slice(0, 3).map((feature, fIdx) => (
                          <span
                            key={fIdx}
                            className="bg-[#FF9801]/10 text-[#FF9801] text-xs px-3 py-1 rounded-full"
                          >
                            {feature}
                          </span>
                        ))}
                        {project.features.length > 3 && (
                          <div className="relative group">
                            <span className="bg-[#FF9801]/10 text-[#FF9801] text-xs px-3 py-1 rounded-full cursor-pointer select-none">
                              +{project.features.length - 3}
                            </span>
                            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 px-3 py-2 rounded bg-white text-[#002B48] text-xs shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20 border border-[#E1F5F6] min-w-max">
                              {project.features.slice(3).join(", ")}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="flex justify-between items-center">
                      <Link
                        to={`/projects/${idx}`}
                        className="inline-flex items-center text-[#089BAB] hover:text-[#002B48] font-medium group"
                      >
                        View Details
                        <FaArrowRight className="ml-2 group-hover:ml-3 transition-all" />
                      </Link>

                      <div className="flex gap-2">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#002B48] hover:text-[#089BAB]"
                            title="GitHub Repository"
                          >
                            <FaGithub className="text-lg" />
                          </a>
                        )}
                        {project.demo && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#002B48] hover:text-[#089BAB]"
                            title="Live Demo"
                          >
                            <FaLaptopCode className="text-lg" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link
              to="/projects"
              className="inline-block bg-[#089BAB] hover:bg-[#002B48] text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              View All Projects
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-[#089BAB] to-[#009C9C]">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Work Together?
            </h2>
            <p className="text-white/90 max-w-2xl mx-auto mb-8">
              I'm currently available for freelance work and open to full-time
              opportunities. Let's create something amazing together!
            </p>
            <div className="flex justify-center gap-4">
              <a
                href={`mailto:${
                  personal?.email || "asadullahimran19@gmail.com"
                }`}
                className="bg-white text-[#089BAB] hover:bg-[#002B48] hover:text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Contact Me
              </a>
              <Link
                to="/about"
                className="border-2 border-white text-white hover:bg-white hover:text-[#089BAB] px-6 py-3 rounded-lg font-medium transition-all duration-300"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
