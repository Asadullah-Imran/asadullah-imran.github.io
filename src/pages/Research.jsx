import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import {
  FaBrain,
  FaDna,
  FaMicroscope,
  FaProjectDiagram,
  FaDatabase,
  FaCheckCircle,
  FaExternalLinkAlt,
  FaDownload,
  FaEnvelope,
  FaFlask,
} from "react-icons/fa";

const Research = () => {
  const [researchList, setResearchList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/research.json")
      .then((res) => res.json())
      .then((data) => {
        setResearchList(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="pt-24 min-h-screen bg-gradient-to-b from-[#E1F5F6]/40 via-white to-[#E1F5F6]/20">
      {/* Header */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-[#089BAB]/10 text-[#089BAB] px-4 py-1.5 rounded-full text-sm font-semibold mb-4 border border-[#089BAB]/20">
              <FaFlask className="text-xs" />
              Scientific Research & Exploration
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#002B48] mb-6 tracking-tight">
              Investigating the Frontiers of <br className="hidden md:inline" />
              <span className="text-[#089BAB]">AI & Computational Biology</span>
            </h1>
            <p className="text-lg md:text-xl text-[#002B48]/80 max-w-3xl mx-auto leading-relaxed">
              My research focuses on representation learning and deep learning methodologies 
              tailored to address high-dimensional biological data, deciphering cellular microenvironments, 
              and advancing computational medicine.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Research Projects */}
      <section className="pb-20">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          {loading ? (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#089BAB] mx-auto"></div>
            </div>
          ) : (
            researchList.map((project, idx) => (
              <motion.div
                key={project.id || idx}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="bg-white rounded-2xl shadow-xl border border-[#69C3CC]/30 overflow-hidden mb-12"
              >
                {/* Status Bar */}
                <div className="bg-gradient-to-r from-[#002B48] to-[#089BAB] text-white px-6 py-4 flex flex-wrap justify-between items-center gap-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                    <span className="text-sm font-semibold tracking-wide uppercase">
                      {project.status || "Active Investigation"}
                    </span>
                  </div>
                  <span className="text-xs md:text-sm bg-white/15 px-3 py-1 rounded-full backdrop-blur-sm">
                    {project.role}
                  </span>
                </div>

                <div className="p-6 md:p-10">
                  <div className="mb-6">
                    <span className="text-[#FF9801] font-bold text-xs uppercase tracking-wider">
                      {project.category}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold text-[#002B48] mt-1 mb-3">
                      {project.title}
                    </h2>
                    <p className="text-base md:text-lg text-[#089BAB] font-medium">
                      {project.tagline}
                    </p>
                  </div>

                  {/* Summary */}
                  <div className="bg-[#E1F5F6]/40 p-6 rounded-xl border border-[#089BAB]/20 mb-8">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-[#002B48] mb-2 flex items-center gap-2">
                      <FaMicroscope className="text-[#089BAB]" /> Research Abstract & Purpose
                    </h3>
                    <p className="text-[#002B48]/90 leading-relaxed text-base">
                      {project.summary}
                    </p>
                  </div>

                  {/* Two Column Breakdown */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    {/* Research Questions */}
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                      <h4 className="text-base font-bold text-[#002B48] mb-4 flex items-center gap-2 border-b pb-2">
                        <FaBrain className="text-[#FF9801]" /> Core Research Questions
                      </h4>
                      <ul className="space-y-3">
                        {project.researchQuestions?.map((q, qIdx) => (
                          <li key={qIdx} className="flex items-start gap-2.5 text-sm text-[#002B48]/85">
                            <span className="text-[#089BAB] font-bold mt-0.5">•</span>
                            <span>{q}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Methodology */}
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                      <h4 className="text-base font-bold text-[#002B48] mb-4 flex items-center gap-2 border-b pb-2">
                        <FaProjectDiagram className="text-[#089BAB]" /> Methodological Framework
                      </h4>
                      <ul className="space-y-3">
                        {project.methodology?.map((m, mIdx) => (
                          <li key={mIdx} className="flex items-start gap-2.5 text-sm text-[#002B48]/85">
                            <FaCheckCircle className="text-emerald-500 mt-1 flex-shrink-0 text-xs" />
                            <span>{m}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Scientific Keywords & Tech Stack */}
                  <div className="pt-6 border-t border-gray-100">
                    <div className="mb-4">
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">
                        Research Keywords
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {project.keywords?.map((kw, kwIdx) => (
                          <span
                            key={kwIdx}
                            className="bg-[#002B48]/5 text-[#002B48] text-xs font-medium px-3 py-1 rounded-full border border-gray-200"
                          >
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">
                        Computational & Scientific Tools
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies?.map((tech, techIdx) => (
                          <span
                            key={techIdx}
                            className="bg-[#089BAB]/10 text-[#089BAB] text-xs font-semibold px-3 py-1 rounded-md"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}

          {/* Graduate Aspirations Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-[#002B48] to-[#089BAB] rounded-2xl p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div className="max-w-2xl text-center md:text-left">
              <h3 className="text-2xl font-bold mb-2">
                Looking Ahead: Graduate Research
              </h3>
              <p className="text-white/80 text-sm md:text-base leading-relaxed">
                I am actively preparing for graduate studies (MS / PhD) where I can 
                contribute to developing AI-driven methods that advance biological discovery. 
                Open to academic dialogue, research internships, and collaborative scientific inquiries.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="mailto:asadullahimran19@gmail.com"
                className="bg-white text-[#002B48] hover:bg-[#E1F5F6] px-5 py-2.5 rounded-lg font-semibold text-sm transition-colors flex items-center gap-2 shadow"
              >
                <FaEnvelope /> Get in Touch
              </a>
              <a
                href="/docs/Asadullah_Imran_CV.pdf"
                download
                className="bg-transparent border border-white hover:bg-white/10 text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition-colors flex items-center gap-2"
              >
                <FaDownload /> Academic CV
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Research;

