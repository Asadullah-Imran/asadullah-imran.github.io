import React from "react";

const Resume = () => (
  <div className="pt-24 pb-12 text-center">
    <h1 className="text-3xl md:text-4xl font-bold text-primary mb-8">Resume</h1>
    <a
      href="/docs/Asadullah_Imran_CV.pdf"
      download
      className="inline-block border-2 border-primary text-primary hover:bg-primary hover:text-white px-6 py-3 rounded-lg font-medium transition mb-8"
    >
      <i className="fas fa-download"></i> Download CV
    </a>
    <div className="mt-8">
      {/* TODO: Add summary info or embed PDF */}
      <p className="text-lg text-gray-600">Summary and details coming soon.</p>
    </div>
  </div>
);

export default Resume;
