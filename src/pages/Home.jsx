import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import {
  FaArrowRight,
  FaAward,
  FaBookOpen,
  FaBrain,
  FaChalkboardTeacher,
  FaChartLine,
  FaCode,
  FaDna,
  FaDownload,
  FaEnvelope,
  FaFlask,
  FaGithub,
  FaGraduationCap,
  FaLaptopCode,
  FaLinkedin,
  FaMicroscope,
  FaTerminal,
  FaTools,
} from "react-icons/fa";
import { Link } from "react-router-dom";

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
  const [researchList, setResearchList] = useState([]);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState(null);
  const [experience, setExperience] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/data/personal.json").then((res) => res.json()),
      fetch("/data/research.json").then((res) => res.json()).catch(() => []),
      fetch("/data/projects.json").then((res) => res.json()).catch(() => []),
      fetch("/data/skills.json").then((res) => res.json()).catch(() => null),
      fetch("/data/experience.json").then((res) => res.json()).catch(() => []),
    ])
      .then(([personalData, researchData, projectsData, skillsData, expData]) => {
        setPersonal(personalData);
        setResearchList(Array.isArray(researchData) ? researchData : []);
        setProjects(Array.isArray(projectsData) ? projectsData.slice(0, 3) : []);
        setSkills(skillsData);
        setExperience(Array.isArray(expData) ? expData : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const flagshipResearch = researchList[0] || null;
  const ugaExp = experience.find((e) => e.id === "uga-uiu") || experience[0];

  return (
    <div className="pt-16 bg-white text-[#002B48]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#E1F5F6] via-white to-[#E1F5F6]/50 py-16 md:py-24 border-b border-[#089BAB]/15">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-12 max-w-6xl mx-auto">
            {/* Hero Text */}
            <motion.div
              className="w-full lg:w-3/5 text-center lg:text-left"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 bg-[#089BAB]/10 text-[#089BAB] px-4 py-1.5 rounded-full text-xs md:text-sm font-semibold mb-5 border border-[#089BAB]/20">
                <FaFlask className="text-xs" />
                <span>Computer Science & Engineering · Aspiring Researcher</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#002B48] tracking-tight leading-tight mb-3">
                Asadullah <span className="text-[#089BAB]">Imran</span>
              </h1>

              <p className="text-sm md:text-base font-semibold text-[#FF9801] uppercase tracking-wider mb-5">
                United International University · Major in Data Science
              </p>

              <div className="text-base md:text-lg text-[#002B48]/85 space-y-3 mb-8 leading-relaxed max-w-2xl">
                <p>
                  I am a Computer Science & Engineering undergraduate focusing on the intersection
                  of <strong>Artificial Intelligence, Deep Learning</strong>, and <strong>Computational Biology</strong>.
                  My work is centered on building machine learning methods that can extract meaningful insights from
                  high-dimensional biological data.
                </p>
                <p className="text-sm md:text-base text-[#002B48]/75">
                  Currently investigating deep representation learning for spatial multi-omics cell clustering
                  to decipher complex cellular microenvironments.
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8">
                <Link
                  to="/research"
                  className="bg-[#089BAB] hover:bg-[#002B48] text-white px-6 py-3.5 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2 group"
                >
                  <FaBrain className="group-hover:scale-110 transition-transform" />
                  Explore Research
                </Link>
                <a
                  href="/docs/Asadullah_Imran_CV.pdf"
                  download
                  className="bg-white border-2 border-[#089BAB] text-[#089BAB] hover:bg-[#089BAB] hover:text-white px-6 py-3.5 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 group shadow-sm"
                >
                  <FaDownload className="group-hover:translate-y-0.5 transition-transform" />
                  Download Academic CV
                </a>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-3 justify-center lg:justify-start">
                <span className="text-xs font-semibold text-[#002B48]/60 uppercase tracking-wider mr-2">
                  Connect:
                </span>
                {personal?.social?.map((social, index) => {
                  let IconComponent = FaCode;
                  if (social.icon.includes("github")) IconComponent = FaGithub;
                  else if (social.icon.includes("linkedin")) IconComponent = FaLinkedin;
                  else if (social.icon.includes("envelope")) IconComponent = FaEnvelope;

                  return (
                    <a
                      key={index}
                      href={social.url}
                      target={social.url.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white border border-[#089BAB]/20 flex items-center justify-center text-[#089BAB] hover:bg-[#089BAB] hover:text-white transition-all shadow-sm"
                      title={social.name}
                    >
                      <IconComponent className="text-base" />
                    </a>
                  );
                })}
              </div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              className="w-full lg:w-2/5 flex justify-center"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
            >
              <div className="relative w-64 h-64 md:w-80 md:h-80">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#089BAB] to-[#FF9801] rounded-3xl rotate-6 opacity-30 blur-sm"></div>
                <div className="relative w-full h-full rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-white">
                  <img
                    src={personal?.image || "/images/profile/b.png"}
                    alt={personal?.name || "Asadullah Imran"}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Academic Impact Metrics Ribbon */}
      <section className="py-8 bg-gradient-to-r from-[#002B48] via-[#044368] to-[#002B48] text-white shadow-inner">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
            <div className="pt-4 md:pt-0">
              <div className="text-3xl md:text-4xl font-extrabold text-[#69C3CC]">3.97</div>
              <div className="text-sm font-semibold tracking-wide text-white/90">CGPA / 4.00</div>
              <div className="text-xs text-white/60">Academic Performance</div>
            </div>
            <div className="pt-4 md:pt-0">
              <div className="text-3xl md:text-4xl font-extrabold text-[#FF9801]">6×</div>
              <div className="text-sm font-semibold tracking-wide text-white/90">100% Scholarship</div>
              <div className="text-xs text-white/60">Top 2% of UIU CSE Dept.</div>
            </div>
            <div className="pt-4 md:pt-0">
              <div className="text-3xl md:text-4xl font-extrabold text-[#69C3CC]">9×</div>
              <div className="text-sm font-semibold tracking-wide text-white/90">Merit Awards</div>
              <div className="text-xs text-white/60">Consecutive Trimesters</div>
            </div>
            <div className="pt-4 md:pt-0">
              <div className="text-3xl md:text-4xl font-extrabold text-[#FF9801]">FYDP</div>
              <div className="text-sm font-semibold tracking-wide text-white/90">Spatial Multi-omics</div>
              <div className="text-xs text-white/60">Deep Learning Research</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Research Spotlight */}
      {flagshipResearch && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <div>
                <span className="text-[#089BAB] font-bold text-xs uppercase tracking-widest block mb-1">
                  Active Investigation
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#002B48]">
                  Current <span className="text-[#089BAB]">Research Focus</span>
                </h2>
              </div>
              <Link
                to="/research"
                className="inline-flex items-center text-sm font-bold text-[#089BAB] hover:text-[#002B48] group"
              >
                View Full Methodology & Framework
                <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-white to-[#E1F5F6]/40 rounded-2xl border-2 border-[#089BAB]/30 p-6 md:p-10 shadow-xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 bg-[#089BAB] text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl uppercase tracking-wider">
                Undergraduate FYDP
              </div>

              <div className="max-w-3xl">
                <span className="text-xs font-bold text-[#FF9801] uppercase tracking-wider">
                  {flagshipResearch.category}
                </span>
                <h3 className="text-2xl md:text-3xl font-extrabold text-[#002B48] mt-1 mb-3">
                  {flagshipResearch.title}
                </h3>
                <p className="text-base text-[#089BAB] font-medium mb-6">
                  {flagshipResearch.tagline}
                </p>

                <p className="text-sm md:text-base text-[#002B48]/85 leading-relaxed mb-6">
                  {flagshipResearch.summary}
                </p>

                {/* Core questions */}
                <div className="mb-6 bg-white p-4 rounded-xl border border-[#089BAB]/15">
                  <span className="text-xs font-bold text-[#002B48] uppercase tracking-wider block mb-2">
                    Key Research Objectives
                  </span>
                  <ul className="space-y-1.5 text-xs md:text-sm text-[#002B48]/80">
                    {flagshipResearch.researchQuestions?.slice(0, 2).map((q, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#089BAB] font-bold">•</span>
                        <span>{q}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech chips */}
                <div className="flex flex-wrap items-center gap-2 mb-6">
                  {flagshipResearch.technologies?.map((tech, i) => (
                    <span
                      key={i}
                      className="bg-[#002B48]/5 text-[#002B48] text-xs font-semibold px-3 py-1 rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <Link
                  to="/research"
                  className="inline-flex items-center gap-2 bg-[#002B48] hover:bg-[#089BAB] text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors shadow"
                >
                  <FaBookOpen /> Read Project Details
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* 5 Identity Dimensions */}
      <section className="py-20 bg-[#E1F5F6]/40 border-y border-[#69C3CC]/20">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#089BAB] font-bold text-xs uppercase tracking-widest block mb-2">
              Core Competencies
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#002B48] mb-4">
              Professional & Research Dimensions
            </h2>
            <div className="h-1 w-20 bg-[#089BAB] mx-auto mb-4 rounded-full"></div>
            <p className="text-[#002B48]/75 text-sm md:text-base">
              A balanced foundation spanning artificial intelligence, scientific inquiry, computational biology, and academic teaching.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: FaBrain,
                title: "Artificial Intelligence & Deep Learning",
                desc: "Exploring deep neural architectures, representation learning, and unsupervised modeling for complex, non-linear domains.",
                tag: "Methodological Core",
              },
              {
                icon: FaDna,
                title: "Computational Biology & Multi-omics",
                desc: "Integrating diverse biological modalities (spatial transcriptomics, proteomics) to unravel cellular heterogeneity.",
                tag: "Flagship Application",
              },
              {
                icon: FaChartLine,
                title: "Data Science & Statistical Learning",
                desc: "Rigorous exploratory analysis, high-dimensional reduction (UMAP, PCA), hypothesis testing, and reproducible workflows.",
                tag: "Quantitative Foundation",
              },
              {
                icon: FaMicroscope,
                title: "Scientific Research",
                desc: "Systematic literature analysis, problem formulation, benchmark experimentation, and structured academic writing.",
                tag: "Scholarly Rigor",
              },
              {
                icon: FaChalkboardTeacher,
                title: "Teaching & Knowledge Sharing",
                desc: "Mentoring CSE undergraduates as a University Assistant, conducting lab sessions, and active peer advising.",
                tag: "Academic Mentorship",
              },
            ].map((pillar, idx) => {
              const IconComp = pillar.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-white p-7 rounded-2xl border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-[#089BAB]/10 text-[#089BAB] flex items-center justify-center text-xl">
                        <IconComp />
                      </div>
                      <span className="text-[11px] font-bold text-[#FF9801] uppercase tracking-wider bg-[#FF9801]/10 px-2.5 py-1 rounded-full">
                        {pillar.tag}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-[#002B48] mb-2">
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-[#002B48]/75 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Teaching & Academic Experience Spotlight */}
      {ugaExp && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            <div className="flex flex-col md:flex-row items-center gap-10 bg-gradient-to-r from-[#002B48] to-[#044368] text-white p-8 md:p-10 rounded-2xl shadow-xl">
              <div className="w-full md:w-2/5 flex justify-center">
                <div className="relative w-56 h-72 md:w-64 md:h-80 rounded-xl overflow-hidden border-2 border-white/20 shadow-lg">
                  <img
                    src={ugaExp.image || "/images/experience/University UGA room Portrait.jpg"}
                    alt={ugaExp.role}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 text-xs text-white/90">
                    UIU UGA Counseling Space
                  </div>
                </div>
              </div>

              <div className="w-full md:w-3/5 text-center md:text-left">
                <span className="text-[#FF9801] font-bold text-xs uppercase tracking-wider block mb-1">
                  Academic Mentorship
                </span>
                <h3 className="text-2xl md:text-3xl font-bold mb-2">
                  {ugaExp.role}
                </h3>
                <p className="text-sm text-[#69C3CC] font-semibold mb-4">
                  {ugaExp.organization} · {ugaExp.period} ({ugaExp.duration})
                </p>
                <p className="text-sm text-white/80 leading-relaxed mb-4">
                  {ugaExp.description}
                </p>
                <div className="bg-white/10 p-3.5 rounded-lg border border-white/10 text-xs text-white/90 mb-5 leading-relaxed">
                  <strong>Student Counseling & Collaboration:</strong> Supporting undergraduate students
                  in understanding algorithms, debugging code, and mastering computer science concepts through dedicated counseling hours.
                </div>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  {ugaExp.skills?.map((sk, idx) => (
                    <span
                      key={idx}
                      className="bg-white/15 text-white text-xs px-3 py-1 rounded-full font-medium"
                    >
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Skills Matrix (Categorized Chips) */}
      {skills && skills.categories && (
        <section className="py-20 bg-[#002B48] text-white">
          <div className="container mx-auto px-4 md:px-6 max-w-6xl">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-[#FF9801] font-bold text-xs uppercase tracking-widest block mb-2">
                Technical Tooling
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                Scientific & Computational Toolkit
              </h2>
              <div className="h-1 w-20 bg-[#089BAB] mx-auto mb-4 rounded-full"></div>
              <p className="text-white/70 text-sm md:text-base">
                Tools and frameworks utilized for representation learning, high-dimensional data analysis, and computational experimentation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {skills.categories.map((cat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-2xl backdrop-blur-sm"
                >
                  <h3 className="text-xl font-bold text-[#69C3CC] mb-2">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-white/70 mb-5">
                    {cat.description}
                  </p>
                  <div className="flex flex-wrap gap-2.5">
                    {cat.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="bg-white/10 hover:bg-[#089BAB] text-white text-xs md:text-sm font-medium px-3.5 py-1.5 rounded-lg border border-white/10 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Selected Technical Projects */}
      <section className="py-20 bg-[#E1F5F6]/30">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-[#089BAB] font-bold text-xs uppercase tracking-widest block mb-1">
                Engineering & Algorithms
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#002B48]">
                Selected Technical Projects
              </h2>
            </div>
            <Link
              to="/projects"
              className="inline-flex items-center text-sm font-bold text-[#089BAB] hover:text-[#002B48] group"
            >
              Browse All Projects
              <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((proj, idx) => (
              <motion.div
                key={proj.id || idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all"
              >
                <div>
                  <div className="h-44 bg-gradient-to-br from-[#002B48] to-[#089BAB] overflow-hidden relative">
                    {proj.featuredImage?.src ? (
                      <img
                        src={proj.featuredImage.src}
                        alt={proj.title}
                        className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center p-4 text-center text-white font-bold">
                        {proj.title}
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-[#002B48] mb-2 line-clamp-1">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-[#002B48]/75 mb-4 line-clamp-2">
                      {proj.tagline || proj.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {proj.technologies?.slice(0, 3).map((t, tIdx) => (
                        <span
                          key={tIdx}
                          className="bg-[#089BAB]/10 text-[#089BAB] text-[11px] font-semibold px-2.5 py-0.5 rounded"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    to={`/projects/${proj.id}`}
                    className="text-xs font-bold text-[#089BAB] hover:text-[#002B48] flex items-center gap-1 group"
                  >
                    View Project Case Study
                    <FaArrowRight className="text-[10px] group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Academic Inquiries & Collaboration CTA */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
          <h2 className="text-3xl font-extrabold text-[#002B48] mb-4">
            Interested in Research Collaboration?
          </h2>
          <p className="text-[#002B48]/75 text-base max-w-2xl mx-auto mb-8 leading-relaxed">
            I welcome academic dialogue, research mentorship, and prospective discussions
            regarding graduate studies and computational biology initiatives.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="mailto:asadullahimran19@gmail.com"
              className="bg-[#089BAB] hover:bg-[#002B48] text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all shadow flex items-center gap-2"
            >
              <FaEnvelope /> Get in Touch
            </a>
            <a
              href="/docs/Asadullah_Imran_CV.pdf"
              download
              className="bg-white border border-[#002B48]/20 text-[#002B48] hover:bg-gray-50 px-6 py-3 rounded-xl font-semibold text-sm transition-all flex items-center gap-2"
            >
              <FaDownload /> Download Academic CV
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
