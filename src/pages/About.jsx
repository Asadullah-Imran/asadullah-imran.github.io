import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import {
  FaCertificate,
  FaCheck,
  FaCode,
  FaEnvelope,
  FaGithub,
  FaGraduationCap,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhone,
  FaUsers,
} from "react-icons/fa";

const About = () => {
  const [personal, setPersonal] = useState(null);
  const [education, setEducation] = useState([]);
  const [affiliations, setAffiliations] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch("/data/personal.json").then((res) => {
        if (!res.ok) throw new Error("Failed to fetch personal data");
        return res.json();
      }),
      fetch("/data/education.json").then((res) => {
        if (!res.ok) throw new Error("Failed to fetch education data");
        return res.json();
      }),
      fetch("/data/affiliations.json").then((res) => {
        if (!res.ok) throw new Error("Failed to fetch affiliations data");
        return res.json();
      }),
      fetch("/data/achievements.json").then((res) => {
        if (!res.ok) throw new Error("Failed to fetch achievements data");
        return res.json();
      }),
      fetch("/data/certifications.json").then((res) => {
        if (!res.ok) throw new Error("Failed to fetch certifications data");
        return res.json();
      }),
    ])
      .then(
        ([
          personalData,
          educationData,
          affiliationsData,
          achievementsData,
          certificationsData,
        ]) => {
          setPersonal(personalData);
          setEducation(Array.isArray(educationData) ? educationData : []);
          setAffiliations(
            Array.isArray(affiliationsData) ? affiliationsData : []
          );
          setAchievements(
            Array.isArray(achievementsData) ? achievementsData : []
          );
          setCertifications(
            Array.isArray(certificationsData) ? certificationsData : []
          );
          setLoading(false);
        }
      )
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="pt-24 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#089BAB] mx-auto"></div>
      </div>
    );

  if (error)
    return <div className="pt-24 text-center text-red-500">{error}</div>;

  return (
    <div className="pt-24 bg-gradient-to-b from-[#E1F5F6] to-white min-h-screen">
      {/* Hero/Profile Section */}
      <section className="hero-container pt-16 pb-16">
        <div className="container mx-auto px-6 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
              {/* Profile Image */}
              <motion.div
                className="flex justify-center lg:justify-start animate-float"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                <div className="profile-frame relative w-64 h-64">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#089BAB] to-[#009C9C] rounded-full animate-pulse border-4 border-[#089BAB]"></div>
                  <img
                    src={personal.image.replace("assets/images", "/images")}
                    alt={personal.name}
                    className="profile-img relative w-full h-full object-cover rounded-full border-4 border-white shadow-xl"
                  />
                </div>
              </motion.div>

              {/* Profile Content */}
              <motion.div
                className="lg:col-span-2 hero-content"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                <div className="text-center lg:text-left">
                  <motion.h1
                    className="text-4xl md:text-5xl font-bold mb-3 name-gradient bg-gradient-to-r from-[#002B48] to-[#089BAB] text-transparent bg-clip-text"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    {personal.name}
                  </motion.h1>
                  <motion.h2
                    className="text-2xl md:text-3xl font-semibold text-[#089BAB] mb-5 title-highlight relative inline-block"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                  >
                    {personal.title}
                    <span className="absolute bottom-1 left-0 w-full h-2 bg-[#089BAB]/20 rounded-full -z-10"></span>
                  </motion.h2>

                  <motion.div
                    className="bg-white p-6 rounded-xl shadow-md mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <p className="text-[#002B48]/90 leading-relaxed">
                      {personal.about}
                    </p>
                  </motion.div>

                  <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <div className="contact-item flex items-center bg-white p-4 rounded-full shadow-md transition hover:shadow-lg">
                      <div className="contact-icon w-10 h-10 rounded-full bg-[#089BAB]/10 flex items-center justify-center text-[#089BAB] mr-3">
                        <FaMapMarkerAlt />
                      </div>
                      <div>
                        <p className="text-[#002B48]/70 text-sm">Location</p>
                        <p className="font-medium text-[#002B48]">
                          {personal.location}
                        </p>
                      </div>
                    </div>

                    <div className="contact-item flex items-center bg-white p-4 rounded-full shadow-md transition hover:shadow-lg">
                      <div className="contact-icon w-10 h-10 rounded-full bg-[#089BAB]/10 flex items-center justify-center text-[#089BAB] mr-3">
                        <FaEnvelope />
                      </div>
                      <div>
                        <p className="text-[#002B48]/70 text-sm">Email</p>
                        <p className="font-medium text-[#002B48]">
                          {personal.email}
                        </p>
                      </div>
                    </div>

                    <div className="contact-item flex items-center bg-white p-4 rounded-full shadow-md transition hover:shadow-lg">
                      <div className="contact-icon w-10 h-10 rounded-full bg-[#089BAB]/10 flex items-center justify-center text-[#089BAB] mr-3">
                        <FaPhone />
                      </div>
                      <div>
                        <p className="text-[#002B48]/70 text-sm">Phone</p>
                        <p className="font-medium text-[#002B48]">
                          {personal.phone}
                        </p>
                      </div>
                    </div>

                    <div className="contact-item flex items-center bg-white p-4 rounded-full shadow-md transition hover:shadow-lg">
                      <div className="contact-icon w-10 h-10 rounded-full bg-[#089BAB]/10 flex items-center justify-center text-[#089BAB] mr-3">
                        <FaGraduationCap />
                      </div>
                      <div>
                        <p className="text-[#002B48]/70 text-sm">Education</p>
                        <p className="font-medium text-[#002B48]">
                          BSc in CSE (Expected 2026)
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex justify-center lg:justify-start space-x-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    {personal.social.map((s, idx) => {
                      let IconComponent;
                      if (s.icon.includes("github")) IconComponent = FaGithub;
                      else if (s.icon.includes("linkedin"))
                        IconComponent = FaLinkedin;
                      else if (s.icon.includes("code")) IconComponent = FaCode;
                      else IconComponent = FaCode;
                      return (
                        <a
                          key={idx}
                          href={s.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="social-icon w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#089BAB] shadow-md transition hover:bg-gradient-to-r hover:from-[#089BAB] hover:to-[#009C9C] hover:text-white hover:shadow-lg"
                        >
                          <IconComponent className="text-xl" />
                        </a>
                      );
                    })}
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-16 bg-white" id="education">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <motion.h2
              className="text-3xl font-bold text-[#089BAB] mb-12 text-center section-title relative inline-block pb-2"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Education
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/3 h-1 bg-gradient-to-r from-[#089BAB] to-[#009C9C] rounded-full"></span>
            </motion.h2>

            <div className="timeline">
              {education.map((edu, idx) => (
                <motion.div
                  key={idx}
                  className="timeline-item relative pl-10 mb-12 animate-fadeIn"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <div className="absolute left-0 top-2 w-4 h-4 bg-[#089BAB] rounded-full z-10 border-2 border-white"></div>
                  <div className="absolute left-2 top-6 bottom-0 w-0.5 bg-[#E1F5F6]"></div>

                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-[#089BAB]">
                      {edu.degree}
                    </h3>
                    <p className="text-[#002B48]/80">
                      {edu.institution} | {edu.period}
                    </p>
                    <div className="mt-4">
                      {edu.cgpa && (
                        <p className="text-[#002B48]/80">
                          <span className="font-medium">CGPA:</span> {edu.cgpa}
                        </p>
                      )}
                      {edu.gpa && (
                        <p className="text-[#002B48]/80">
                          <span className="font-medium">GPA:</span> {edu.gpa}
                        </p>
                      )}
                      {edu.highlights && (
                        <div className="mt-3">
                          <h4 className="font-medium text-[#002B48]">
                            Highlights:
                          </h4>
                          <ul className="mt-2 space-y-2">
                            {edu.highlights.map((highlight, hIdx) => (
                              <li key={hIdx} className="flex items-start">
                                <FaCheck className="text-[#089BAB] mt-1 mr-2" />
                                <span className="text-[#002B48]/80">
                                  {highlight}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-16 bg-[#E1F5F6]">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <motion.h2
              className="text-3xl font-bold text-[#089BAB] mb-12 text-center section-title relative inline-block pb-2"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Achievements
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/3 h-1 bg-gradient-to-r from-[#089BAB] to-[#009C9C] rounded-full"></span>
            </motion.h2>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1 } },
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {achievements.map((ach, idx) => (
                <motion.div
                  key={idx}
                  className="bg-white rounded-xl shadow-md overflow-hidden transition transform hover:-translate-y-1 hover:shadow-2xl duration-300 animate-fadeIn"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5 },
                    },
                  }}
                  whileHover={{ y: -8, scale: 1.03 }}
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={ach.image.replace("assets/images", "/images")}
                      alt={ach.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#089BAB]">
                      {ach.title}
                    </h3>
                    <p className="text-[#002B48]/80">
                      {ach.organization} | {ach.year}
                    </p>
                    <p className="text-[#002B48]/80 mt-3">{ach.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <motion.h2
              className="text-3xl font-bold text-[#089BAB] mb-12 text-center section-title relative inline-block pb-2"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Certifications
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/3 h-1 bg-gradient-to-r from-[#089BAB] to-[#009C9C] rounded-full"></span>
            </motion.h2>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1 } },
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {certifications.map((cert, idx) => (
                <motion.div
                  key={idx}
                  className="bg-white rounded-xl shadow-md p-6 transition transform hover:-translate-y-1 hover:shadow-2xl duration-300 animate-fadeIn"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5 },
                    },
                  }}
                  whileHover={{ y: -8, scale: 1.03 }}
                >
                  <div className="flex items-start gap-4">
                    {cert.badge ? (
                      <img
                        src={cert.badge.replace("assets/images", "/images")}
                        alt={cert.alt || cert.title}
                        className="w-16 h-16 object-contain"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-[#089BAB]/10 rounded-lg flex items-center justify-center text-[#089BAB]">
                        <FaCertificate className="text-2xl" />
                      </div>
                    )}
                    <div>
                      <h3 className="text-lg font-bold text-[#002B48]">
                        {cert.title}
                      </h3>
                      <p className="text-[#002B48]/80">
                        {cert.issuer} | {cert.date}
                      </p>
                      {cert.credentials && (
                        <p className="text-sm text-[#089BAB] mt-1">
                          {cert.credentials}
                        </p>
                      )}
                      {cert.url && (
                        <a
                          href={cert.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block mt-3 text-[#089BAB] font-medium hover:underline"
                        >
                          View Credential
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Languages & Affiliations */}
      <section className="py-16 bg-[#E1F5F6]">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Languages */}
            <motion.div
              className="bg-white p-6 rounded-lg shadow-sm animate-fadeIn"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold text-[#089BAB] mb-6 section-title relative inline-block pb-2">
                Languages
                <span className="absolute bottom-0 left-0 w-1/3 h-1 bg-gradient-to-r from-[#089BAB] to-[#009C9C] rounded-full"></span>
              </h3>
              <ul className="space-y-2 animate-fadeIn">
                {personal.languages.map((lang, idx) => (
                  <li
                    key={idx}
                    className="flex justify-between items-center py-2 border-b border-[#E1F5F6] animate-fadeIn"
                  >
                    <span className="font-medium text-[#002B48]">
                      {lang.name}
                    </span>
                    <span className="text-sm text-[#089BAB] bg-[#089BAB]/10 px-3 py-1 rounded-full">
                      {lang.level}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Affiliations */}
            <motion.div
              className="bg-white p-6 rounded-lg shadow-sm animate-fadeIn"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-2xl font-bold text-[#089BAB] mb-6 section-title relative inline-block pb-2">
                Affiliations
                <span className="absolute bottom-0 left-0 w-1/3 h-1 bg-gradient-to-r from-[#089BAB] to-[#009C9C] rounded-full"></span>
              </h3>
              <div>
                {affiliations.map((aff, idx) => (
                  <motion.div
                    key={idx}
                    className="mb-6 last:mb-0 flex items-start gap-4 animate-fadeIn"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                  >
                    {aff.image ? (
                      <img
                        src={aff.image.replace("assets/images", "/images")}
                        alt={aff.alt || aff.organization}
                        className="w-12 h-12 object-cover rounded-full"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-[#089BAB]/10 rounded-full flex items-center justify-center text-[#089BAB]">
                        <FaUsers className="text-xl" />
                      </div>
                    )}
                    <div>
                      <h4 className="font-bold text-[#002B48]">{aff.role}</h4>
                      <p className="text-[#002B48]/80">
                        {aff.organization} ({aff.period})
                      </p>
                      {aff.description && (
                        <p className="text-sm text-[#089BAB] mt-1">
                          {aff.description}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
