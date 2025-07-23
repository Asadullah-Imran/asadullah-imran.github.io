import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { FaFilter, FaGithub, FaLaptopCode } from "react-icons/fa";
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

const FILTERS = [
  { label: "All", value: "all", color: "#089BAB" },
  { label: "Web", value: "web", color: "#FF9801" },
  { label: "Academic", value: "academic", color: "#009C9C" },
];

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [categories, setCategories] = useState(["All"]);

  useEffect(() => {
    fetch("/data/projects.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch projects data");
        return res.json();
      })
      .then((data) => {
        setProjects(Array.isArray(data) ? data : []);
        // Extract unique categories
        const cats = [
          ...new Set([
            ...data
              .map((p) =>
                p.category && typeof p.category === "string"
                  ? p.category.trim()
                  : null
              )
              .filter(Boolean),
          ]),
        ];
        setCategories(["All", ...cats]);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let filteredProjects = projects;
    if (activeCategory !== "All") {
      filteredProjects = projects.filter(
        (p) =>
          p.category &&
          typeof p.category === "string" &&
          p.category.trim() === activeCategory
      );
    }
    setFiltered(filteredProjects);
  }, [projects, activeCategory]);

  // Skeleton loader for projects
  const ProjectSkeleton = () => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-[#E1F5F6]">
      <div className="h-48 bg-gradient-to-r from-[#69C3CC]/20 to-[#089BAB]/20 animate-pulse"></div>
      <div className="p-6">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
        <div className="flex flex-wrap gap-2 mb-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-6 bg-gray-200 rounded-full w-20"></div>
          ))}
        </div>
        <div className="h-10 bg-gray-200 rounded-lg w-32"></div>
      </div>
    </div>
  );

  return (
    <div className="pt-24 pb-16 bg-gradient-to-b from-[#E1F5F6] to-white min-h-screen">
      <section className="container mx-auto px-4 md:px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-[#002B48] mb-4">
            My <span className="text-[#089BAB]">Projects</span>
          </h1>
          <div className="h-1 w-20 bg-[#089BAB] mx-auto mb-4"></div>
          <p className="text-[#002B48]/80 max-w-2xl mx-auto">
            Explore my portfolio of projects showcasing my skills in web
            development, AI, and problem-solving
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center gap-2 text-[#002B48] font-medium">
            <FaFilter className="text-[#089BAB]" /> Category:
          </div>
          {categories.map((cat) => (
            <motion.button
              key={cat}
              className={`filter-btn px-5 py-2 rounded-full font-medium transition-all duration-300 shadow-md ${
                activeCategory === cat
                  ? "text-white bg-[#089BAB]"
                  : "text-[#002B48] bg-white hover:bg-gray-50"
              }`}
              onClick={() => setActiveCategory(cat)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {loading && (
            <>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <ProjectSkeleton key={i} />
              ))}
            </>
          )}

          {error && (
            <motion.div
              className="col-span-full text-center bg-red-50 p-6 rounded-xl border border-red-200"
              variants={itemVariants}
            >
              <div className="text-red-500 font-medium">{error}</div>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 bg-[#089BAB] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#002B48] transition"
              >
                Reload Projects
              </button>
            </motion.div>
          )}

          {!loading && !error && filtered.length === 0 && (
            <motion.div
              className="col-span-full text-center bg-white p-8 rounded-xl shadow-md border border-[#E1F5F6]"
              variants={itemVariants}
            >
              <div className="text-xl font-medium text-[#002B48] mb-4">
                No projects found in this category
              </div>
              <button
                onClick={() => setActiveCategory("All")}
                className="bg-[#089BAB] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#002B48] transition"
              >
                View All Projects
              </button>
            </motion.div>
          )}

          {!loading &&
            !error &&
            filtered.map((project, idx) => (
              <motion.div
                key={idx}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-[#E1F5F6] hover:shadow-xl transition-all duration-300 flex flex-col"
                variants={itemVariants}
                whileHover={{ y: -10 }}
              >
                <div className="h-48 overflow-hidden relative group">
                  {project.featuredImage?.src ? (
                    <img
                      src={project.featuredImage.src.replace(
                        "assets/images",
                        "/images"
                      )}
                      alt={project.featuredImage?.alt || project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-[#089BAB] to-[#009C9C]">
                      <span className="text-white text-xl font-bold px-4 text-center">
                        {project.title}
                      </span>
                    </div>
                  )}
                  {/* Overlay icons on hover */}
                  {(project.github || project.demo) && (
                    <div className="absolute inset-0 flex items-center justify-center gap-4 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-white text-[#002B48] hover:bg-[#089BAB] hover:text-white rounded-full p-3 shadow-lg transition"
                          title="GitHub Repository"
                        >
                          <FaGithub className="text-xl" />
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-white text-[#002B48] hover:bg-[#089BAB] hover:text-white rounded-full p-3 shadow-lg transition"
                          title="Live Demo"
                        >
                          <FaLaptopCode className="text-xl" />
                        </a>
                      )}
                    </div>
                  )}
                  {/* Date badge on image */}
                  <div className="absolute top-4 left-4 bg-[#089BAB] text-white px-3 py-1 rounded-full text-xs font-medium shadow-md">
                    {project.date || "2025"}
                  </div>
                  {project.isAcademic && (
                    <div className="absolute top-4 right-4 bg-[#009C9C] text-white px-3 py-1 rounded-full text-xs font-medium shadow-md">
                      Academic
                    </div>
                  )}
                  {!project.isAcademic && project.category && (
                    <div className="absolute top-4 right-4 bg-[#FF9801] text-white px-3 py-1 rounded-full text-xs font-medium shadow-md">
                      {Array.isArray(project.category)
                        ? project.category[0]
                        : project.category}
                    </div>
                  )}
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-[#002B48]">
                      {project.title}
                    </h3>
                  </div>

                  <p className="text-[#002B48]/80 mb-4 flex-1">
                    {project.tagline}
                  </p>

                  {/* Key Features (max 4) */}
                  {project.features && project.features.length > 0 && (
                    <ul className="mb-4 list-disc list-inside text-[#089BAB] text-sm space-y-1">
                      {project.features.slice(0, 4).map((feature, fIdx) => (
                        <li key={fIdx} className="text-[#089BAB]">
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies && (
                      <>
                        {project.technologies.slice(0, 5).map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="bg-[#089BAB]/10 text-[#089BAB] text-xs px-3 py-1 rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 5 && (
                          <div className="relative group">
                            <span className="bg-[#089BAB]/10 text-[#089BAB] text-xs px-3 py-1 rounded-full cursor-pointer select-none">
                              +{project.technologies.length - 5}
                            </span>
                            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 px-3 py-2 rounded bg-white text-[#002B48] text-xs shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20 border border-[#E1F5F6] min-w-max">
                              {project.technologies.slice(5).join(", ")}
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  <div className="flex justify-between items-center mt-auto pt-4 border-t border-[#E1F5F6]">
                    <Link
                      to={`/projects/${idx}`}
                      className="w-full block bg-[#089BAB] hover:bg-[#002B48] text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl text-center flex items-center justify-center gap-2 group"
                    >
                      View Details
                      <span className="ml-2 group-hover:ml-3 transition-all">
                        →
                      </span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
        </motion.div>
      </section>

      {/* Back to Top Button */}
      {filtered.length > 3 && (
        <motion.div
          className="fixed bottom-8 right-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="w-12 h-12 rounded-full bg-[#089BAB] text-white flex items-center justify-center shadow-lg hover:bg-[#002B48] transition-all duration-300"
            aria-label="Back to top"
          >
            ↑
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default Projects;
