import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import {
  FaArrowLeft,
  FaChevronLeft,
  FaChevronRight,
  FaGithub,
  FaLaptopCode,
  FaLightbulb,
  FaRocket,
  FaTools,
} from "react-icons/fa";
import { Link, useParams } from "react-router-dom";

const SingleProject = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const galleryRef = useRef(null);

  useEffect(() => {
    fetch("/data/projects.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch projects data");
        return res.json();
      })
      .then((data) => {
        const idx = Number(id);
        const found = Array.isArray(data) ? data[idx] : null;
        setProject(found || null);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  // Handle gallery navigation
  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % (project?.screenshots?.length || 1));
  };

  const prevImage = () => {
    setCurrentImage((prev) =>
      prev === 0 ? (project?.screenshots?.length || 1) - 1 : prev - 1
    );
  };

  if (loading)
    return (
      <div className="pt-24 pb-16 min-h-screen bg-gradient-to-b from-[#E1F5F6] to-white">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-40 mb-8"></div>
            <div className="h-12 bg-gray-200 rounded w-full mb-6"></div>
            <div className="h-64 bg-gray-200 rounded-lg mb-8"></div>
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="space-y-3 mb-8">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/5"></div>
            </div>
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="flex flex-wrap gap-2 mb-8">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="h-8 bg-gray-200 rounded-full w-20"
                ></div>
              ))}
            </div>
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {[1, 2].map((i) => (
                <div key={i} className="h-48 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
            <div className="flex gap-4">
              <div className="h-10 bg-gray-200 rounded-lg w-32"></div>
              <div className="h-10 bg-gray-200 rounded-lg w-32"></div>
            </div>
          </div>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="pt-24 pb-16 min-h-screen bg-gradient-to-b from-[#E1F5F6] to-white flex items-center justify-center">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl text-center">
          <div className="bg-red-50 p-8 rounded-xl border border-red-200">
            <div className="text-red-500 font-medium text-xl mb-6">{error}</div>
            <Link
              to="/projects"
              className="bg-[#089BAB] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#002B48] transition inline-block"
            >
              Back to Projects
            </Link>
          </div>
        </div>
      </div>
    );

  if (!project)
    return (
      <div className="pt-24 pb-16 min-h-screen bg-gradient-to-b from-[#E1F5F6] to-white flex items-center justify-center">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl text-center">
          <div className="bg-white p-8 rounded-xl shadow-lg border border-[#E1F5F6]">
            <h2 className="text-2xl font-bold text-[#002B48] mb-4">
              Project Not Found
            </h2>
            <p className="text-[#002B48]/80 mb-6">
              The project you're looking for doesn't exist or has been removed.
            </p>
            <Link
              to="/projects"
              className="bg-[#089BAB] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#002B48] transition inline-flex items-center gap-2"
            >
              <FaArrowLeft /> Back to Projects
            </Link>
          </div>
        </div>
      </div>
    );

  return (
    <div className="pt-24 min-h-screen bg-gradient-to-b from-[#E1F5F6] to-white">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl pb-16">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            to="/projects"
            className="inline-flex items-center text-[#089BAB] hover:text-[#002B48] font-medium mb-8 group"
          >
            <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Projects
          </Link>
        </motion.div>

        {/* Project header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-10"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium bg-[#089BAB]/10 text-[#089BAB] px-3 py-1 rounded-full">
                {Array.isArray(project.category)
                  ? project.category[0]
                  : project.category}
              </span>
              {project.isAcademic && (
                <span className="text-sm font-medium bg-[#009C9C]/10 text-[#009C9C] px-3 py-1 rounded-full">
                  Academic
                </span>
              )}
              <span className="text-sm text-[#002B48]/80">
                {project.date || "2025"}
              </span>
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-[#002B48] mb-4">
            {project.title}
          </h1>

          <p className="text-xl text-[#089BAB] mb-6">{project.tagline}</p>

          {/* Playable */}
          {typeof project.playable === "boolean" && (
            <div className="mb-4">
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  project.playable
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {project.playable ? "Playable Online" : "Not Playable Online"}
              </span>
            </div>
          )}
          {/* Testimonials */}
          {project.testimonials && project.testimonials.length > 0 && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-[#002B48] mb-1">
                Testimonials
              </h3>
              <ul className="space-y-2">
                {project.testimonials.map((quote, idx) => (
                  <li
                    key={idx}
                    className="bg-white border-l-4 border-[#089BAB] p-3 text-[#002B48] italic rounded shadow-sm"
                  >
                    {quote}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>

        {/* Featured image */}
        {project.featuredImage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mb-10 rounded-xl overflow-hidden shadow-lg"
          >
            <img
              src={`/${project.featuredImage.src}`}
              alt={project.featuredImage.alt || project.title}
              className="w-full h-auto object-cover"
            />
          </motion.div>
        )}

        {/* Project details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Main content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-xl shadow-lg p-6 border border-[#E1F5F6] mb-8">
              <h2 className="text-2xl font-bold text-[#002B48] mb-4 flex items-center gap-2">
                <FaLightbulb className="text-[#FF9801]" />
                Project Description
              </h2>
              <p className="text-[#002B48]/80 mb-4">{project.description}</p>

              {project.purpose && (
                <>
                  <h3 className="text-xl font-semibold text-[#002B48] mt-6 mb-3">
                    Why I Built This
                  </h3>
                  <p className="text-[#002B48]/80">{project.purpose}</p>
                </>
              )}
            </div>

            {/* Features */}
            {project.features && project.features.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6 border border-[#E1F5F6] mb-8">
                <h2 className="text-2xl font-bold text-[#002B48] mb-4 flex items-center gap-2">
                  <FaRocket className="text-[#089BAB]" />
                  Key Features
                </h2>
                <ul className="space-y-3">
                  {project.features.map((f, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-[#089BAB] mr-2">•</span>
                      <span className="text-[#002B48]/80">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Challenges & Learnings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.challenges && project.challenges.length > 0 && (
                <div className="bg-white rounded-xl shadow-lg p-6 border border-[#E1F5F6]">
                  <h3 className="text-xl font-semibold text-[#002B48] mb-3 flex items-center gap-2">
                    <span className="bg-[#FF9801] text-white p-1 rounded-full">
                      <FaLightbulb className="text-xs" />
                    </span>
                    Challenges
                  </h3>
                  <ul className="space-y-2">
                    {project.challenges.map((c, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-[#FF9801] mr-2">•</span>
                        <span className="text-[#002B48]/80 text-sm">{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {project.learnings && project.learnings.length > 0 && (
                <div className="bg-white rounded-xl shadow-lg p-6 border border-[#E1F5F6]">
                  <h3 className="text-xl font-semibold text-[#002B48] mb-3 flex items-center gap-2">
                    <span className="bg-[#089BAB] text-white p-1 rounded-full">
                      <FaLightbulb className="text-xs" />
                    </span>
                    Key Learnings
                  </h3>
                  <ul className="space-y-2">
                    {project.learnings.map((l, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-[#089BAB] mr-2">•</span>
                        <span className="text-[#002B48]/80 text-sm">{l}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            {/* Technologies */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-[#E1F5F6] mb-8">
              <h2 className="text-2xl font-bold text-[#002B48] mb-4 flex items-center gap-2">
                <FaTools className="text-[#009C9C]" />
                Technologies
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="bg-[#089BAB]/10 text-[#089BAB] px-3 py-2 rounded-lg text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Project Links */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-[#E1F5F6] mb-8">
              <h2 className="text-2xl font-bold text-[#002B48] mb-4 flex items-center gap-2">
                <FaLaptopCode className="text-[#FF9801]" />
                Project Links
              </h2>
              <div className="space-y-4">
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-gradient-to-r from-[#089BAB] to-[#009C9C] text-white px-4 py-3 rounded-lg font-medium hover:opacity-90 transition"
                  >
                    <FaLaptopCode className="text-xl" />
                    <span>Live Demo</span>
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-[#002B48] text-white px-4 py-3 rounded-lg font-medium hover:opacity-90 transition"
                  >
                    <FaGithub className="text-xl" />
                    <span>GitHub Repository</span>
                  </a>
                )}
              </div>
            </div>

            {/* Documentation, Database Schema, Build Instructions */}
            {(project.documentation ||
              project.databaseSchema ||
              project.buildInstructions) && (
              <div className="bg-white rounded-xl shadow-lg p-6 border border-[#E1F5F6] mb-8">
                {project.documentation && (
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-[#002B48] mb-1">
                      Documentation
                    </h3>
                    <a
                      href={project.documentation}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#089BAB] underline font-medium"
                    >
                      View Documentation
                    </a>
                  </div>
                )}
                {project.databaseSchema && (
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-[#002B48] mb-1">
                      Database Schema
                    </h3>
                    <a
                      href={project.databaseSchema}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#089BAB] underline font-medium"
                    >
                      View Schema
                    </a>
                  </div>
                )}
                {project.buildInstructions && (
                  <div className="mb-2">
                    <h3 className="text-lg font-semibold text-[#002B48] mb-1">
                      Build & Run Instructions
                    </h3>
                    {Array.isArray(project.buildInstructions) ? (
                      <ol className="bg-[#E1F5F6] text-[#002B48] rounded-lg p-4 text-sm list-decimal list-inside space-y-1">
                        {project.buildInstructions.map((step, idx) => (
                          <li key={idx}>{step}</li>
                        ))}
                      </ol>
                    ) : (
                      <div className="bg-[#E1F5F6] text-[#002B48] rounded-lg p-4 text-sm whitespace-pre-line">
                        {project.buildInstructions}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </div>

        {/* Screenshots Gallery */}
        {project.screenshots && project.screenshots.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-[#002B48] mb-6 flex items-center gap-2">
              <FaRocket className="text-[#FF9801]" />
              Project Screenshots
            </h2>

            <div className="relative rounded-xl overflow-hidden shadow-lg">
              <div className="relative h-96">
                <img
                  src={`/${project.screenshots[currentImage].src}`}
                  alt={
                    project.screenshots[currentImage].caption || project.title
                  }
                  className="w-full h-full object-contain bg-[#002B48]/5"
                />

                {/* Navigation arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-[#002B48] flex items-center justify-center shadow-lg transition-all"
                  aria-label="Previous image"
                >
                  <FaChevronLeft />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-[#002B48] flex items-center justify-center shadow-lg transition-all"
                  aria-label="Next image"
                >
                  <FaChevronRight />
                </button>

                {/* Caption */}
                {project.screenshots[currentImage].caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#002B48] to-transparent p-4 text-white">
                    <div className="text-center">
                      {project.screenshots[currentImage].caption}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex overflow-x-auto gap-2 mt-4 py-2">
              {project.screenshots.map((ss, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImage(idx)}
                  className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                    currentImage === idx
                      ? "border-[#089BAB] scale-105"
                      : "border-transparent hover:border-[#089BAB]/50"
                  }`}
                >
                  <img
                    src={`/${ss.src}`}
                    alt={ss.caption || `Screenshot ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Team, Awards, Demo Video (after screenshots) */}
        {(project.team ||
          (project.awards && project.awards.length > 0) ||
          project.video) && (
          <section className="mb-12">
            {/* Team */}
            {project.team && (
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-[#002B48] mb-1">
                  Team
                </h3>
                {project.team.team_logo && (
                  <img
                    src={project.team.team_logo}
                    alt="Team Logo"
                    className="h-12 mb-2"
                  />
                )}
                {project.team.team_name && (
                  <div className="font-bold text-[#089BAB] mb-1">
                    {project.team.team_name}
                  </div>
                )}
                {project.team.team_leader && (
                  <div className="mb-1">
                    <span className="font-medium text-[#002B48]">
                      Team Leader:{" "}
                    </span>
                    <a
                      href={project.team.team_leader.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#089BAB] underline font-medium"
                    >
                      {project.team.team_leader.name}
                    </a>
                  </div>
                )}
                {project.team.team_members &&
                  project.team.team_members.length > 0 && (
                    <div>
                      <span className="font-medium text-[#002B48]">
                        Team Members:{" "}
                      </span>
                      <ul className="flex flex-wrap gap-2 mt-1">
                        {project.team.team_members.map((member, idx) => (
                          <li
                            key={idx}
                            className="bg-[#089BAB]/10 text-[#089BAB] px-3 py-1 rounded-full text-sm font-medium"
                          >
                            <a
                              href={member.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#089BAB] underline font-medium"
                            >
                              {member.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
              </div>
            )}
            {/* Awards */}
            {project.awards && project.awards.length > 0 && (
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-[#002B48] mb-1">
                  Awards
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {project.awards.map((award, idx) => (
                    <li
                      key={idx}
                      className="bg-[#FF9801]/10 text-[#FF9801] px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {award}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {/* Video */}
            {project.video && (
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-[#002B48] mb-3">
                  Demo Video
                </h3>
                <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg">
                  <iframe
                    width="100%"
                    height="400"
                    src={`https://www.youtube.com/embed/${(() => {
                      const match = project.video.match(
                        /(?:youtu.be\/|youtube.com\/(?:watch\?v=|embed\/|v\/|shorts\/)?)([\w-]{11})/
                      );
                      return match ? match[1] : "";
                    })()}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-64 md:h-96 rounded-xl"
                  ></iframe>
                </div>
              </div>
            )}
          </section>
        )}

        {/* Back to projects button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="text-center mt-12"
        >
          <Link
            to="/projects"
            className="bg-[#089BAB] hover:bg-[#002B48] text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center gap-2"
          >
            <FaArrowLeft /> Back to Projects
          </Link>
        </motion.div>
      </div>

      {/* Call to Action */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="bg-gradient-to-r from-[#089BAB] to-[#009C9C] py-16"
      >
        <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Like What You See?
          </h2>
          <p className="max-w-2xl mx-auto mb-6 opacity-90">
            I'm currently available for freelance work and open to full-time
            opportunities. Let's create something amazing together!
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link
              to="/contact" // Assuming you have a contact page
              className="bg-white text-[#089BAB] px-6 py-3 rounded-lg font-medium hover:bg-[#002B48] hover:text-white transition"
            >
              Contact Me
            </Link>
            <Link
              to="/projects"
              className="border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-[#089BAB] transition"
            >
              View More Projects
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default SingleProject;
