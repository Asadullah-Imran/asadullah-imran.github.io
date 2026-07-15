import { motion } from "framer-motion";
import React from "react";
import { FaDownload, FaEye, FaFilePdf } from "react-icons/fa";

const Resume = () => {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-gradient-to-b from-[#E1F5F6] to-white">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-[#002B48] mb-4">
            Curriculum <span className="text-[#089BAB]">Vitae</span>
          </h1>
          <div className="h-1 w-20 bg-[#089BAB] mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            View my professional qualifications, academic history, certifications, and technical skills below. You can also download a copy for offline reading.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/docs/Asadullah_Imran_CV.pdf"
              download="Asadullah_Imran_CV.pdf"
              className="bg-[#089BAB] hover:bg-[#002B48] text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg inline-flex items-center gap-2"
            >
              <FaDownload /> Download PDF
            </a>
            <a
              href="/docs/Asadullah_Imran_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-[#002B48] text-[#002B48] hover:bg-[#002B48] hover:text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 inline-flex items-center gap-2"
            >
              <FaEye /> Open in New Tab
            </a>
          </div>
        </motion.div>

        {/* PDF Embed Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden border border-[#E1F5F6] p-4 md:p-6"
        >
          <div className="flex items-center justify-between border-b border-[#E1F5F6] pb-4 mb-4">
            <div className="flex items-center gap-2 text-[#002B48] font-bold">
              <FaFilePdf className="text-red-500 text-xl" />
              <span>Asadullah_Imran_CV.pdf</span>
            </div>
            <div className="hidden md:flex items-center gap-2 text-xs text-gray-500">
              <span>Scroll inside the container to read all pages</span>
            </div>
          </div>

          {/* PDF Viewer Container */}
          <div className="relative rounded-lg overflow-hidden border border-[#E1F5F6] bg-gray-100 min-h-[600px] md:min-h-[800px]">
            <iframe
              src="/docs/Asadullah_Imran_CV.pdf#toolbar=0"
              title="Asadullah Imran CV"
              className="w-full absolute inset-0 h-full border-0"
            ></iframe>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Resume;
