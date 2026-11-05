import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import {
  FaAward,
  FaBriefcase,
  FaCertificate,
  FaChalkboardTeacher,
  FaCheck,
  FaCheckCircle,
  FaChevronDown,
  FaChevronUp,
  FaCode,
  FaEnvelope,
  FaFlask,
  FaGithub,
  FaGraduationCap,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhone,
  FaUniversity,
  FaUsers,
} from "react-icons/fa";

const About = () => {
  const [personal, setPersonal] = useState(null);
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [showFullBio, setShowFullBio] = useState(false);
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
      fetch("/data/experience.json").then((res) => {
        if (!res.ok) throw new Error("Failed to fetch experience data");
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
          experienceData,
          achievementsData,
          certificationsData,
        ]) => {
          setPersonal(personalData);
          setEducation(Array.isArray(educationData) ? educationData : []);
          setExperience(Array.isArray(experienceData) ? experienceData : []);
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
      <div className="pt-24 text-center min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#089BAB] mx-auto"></div>
      </div>
    );

  if (error)
    return <div className="pt-24 text-center text-red-500">{error}</div>;

  return (
    <div className="pt-24 bg-gradient-to-b from-[#E1F5F6]/40 via-white to-white min-h-screen">
      {/* Profile / Academic Journey Section */}
      <section className="pt-10 pb-16">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
            {/* Profile Image */}
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="relative w-64 h-64 md:w-72 md:h-72">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#089BAB] to-[#FF9801] rounded-3xl rotate-3 opacity-25 blur-sm"></div>
                <img
                  src={personal.image}
                  alt={personal.name}
                  className="relative w-full h-full object-cover rounded-3xl border-4 border-white shadow-xl"
                />
              </div>
            </motion.div>

            {/* Profile Content */}
            <motion.div
              className="lg:col-span-2 text-center lg:text-left"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <div className="inline-flex items-center gap-2 bg-[#089BAB]/10 text-[#089BAB] px-3.5 py-1 rounded-full text-xs font-semibold mb-3">
                <FaFlask /> Aspiring Researcher
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-[#002B48] mb-2 tracking-tight">
                {personal.name}
              </h1>
              <h2 className="text-xl md:text-2xl font-semibold text-[#089BAB] mb-4">
                {personal.title}
              </h2>

              {/* Bio Card with Summary & Read More */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6 text-sm md:text-base text-[#002B48]/85 leading-relaxed">
                <p className="leading-relaxed">
                  {personal.summary ||
                    "Computer Science & Engineering undergraduate at United International University majoring in Data Science (CGPA 3.97/4.00). My research focuses on deep representation learning for spatial multi-omics cell clustering, bridging artificial intelligence and computational biology."}
                </p>

                {showFullBio && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 pt-4 border-t border-gray-100 space-y-3 text-sm text-[#002B48]/80"
                  >
                    {personal.detailedBio ? (
                      personal.detailedBio.map((paragraph, pIdx) => (
                        <p key={pIdx} className="leading-relaxed">
                          {paragraph}
                        </p>
                      ))
                    ) : (
                      <p className="leading-relaxed">{personal.about}</p>
                    )}
                  </motion.div>
                )}

                <button
                  type="button"
                  onClick={() => setShowFullBio(!showFullBio)}
                  className="mt-3.5 inline-flex items-center gap-1.5 text-xs font-bold text-[#089BAB] hover:text-[#002B48] transition-colors focus:outline-none cursor-pointer"
                >
                  <span>{showFullBio ? "Show Less" : "Read Full Background"}</span>
                  {showFullBio ? (
                    <FaChevronUp className="text-[10px]" />
                  ) : (
                    <FaChevronDown className="text-[10px]" />
                  )}
                </button>
              </div>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                <div className="flex items-center bg-white p-3.5 rounded-xl border border-gray-100 shadow-sm">
                  <div className="w-9 h-9 rounded-lg bg-[#089BAB]/10 flex items-center justify-center text-[#089BAB] mr-3">
                    <FaUniversity />
                  </div>
                  <div className="text-left">
                    <p className="text-[#002B48]/60 text-xs">Institution</p>
                    <p className="font-semibold text-xs text-[#002B48]">
                      United International University
                    </p>
                  </div>
                </div>

                <div className="flex items-center bg-white p-3.5 rounded-xl border border-gray-100 shadow-sm">
                  <div className="w-9 h-9 rounded-lg bg-[#089BAB]/10 flex items-center justify-center text-[#089BAB] mr-3">
                    <FaGraduationCap />
                  </div>
                  <div className="text-left">
                    <p className="text-[#002B48]/60 text-xs">Academic Degree</p>
                    <p className="font-semibold text-xs text-[#002B48]">
                      BSc in CSE (Major in Data Science)
                    </p>
                  </div>
                </div>

                <div className="flex items-center bg-white p-3.5 rounded-xl border border-gray-100 shadow-sm">
                  <div className="w-9 h-9 rounded-lg bg-[#089BAB]/10 flex items-center justify-center text-[#089BAB] mr-3">
                    <FaMapMarkerAlt />
                  </div>
                  <div className="text-left">
                    <p className="text-[#002B48]/60 text-xs">Location</p>
                    <p className="font-semibold text-xs text-[#002B48]">
                      {personal.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-center bg-white p-3.5 rounded-xl border border-gray-100 shadow-sm">
                  <div className="w-9 h-9 rounded-lg bg-[#089BAB]/10 flex items-center justify-center text-[#089BAB] mr-3">
                    <FaEnvelope />
                  </div>
                  <div className="text-left">
                    <p className="text-[#002B48]/60 text-xs">Email</p>
                    <p className="font-semibold text-xs text-[#002B48]">
                      {personal.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* Social icons */}
              <div className="flex justify-center lg:justify-start space-x-3">
                {personal.social.map((s, idx) => {
                  let IconComponent = FaCode;
                  if (s.icon.includes("github")) IconComponent = FaGithub;
                  else if (s.icon.includes("linkedin")) IconComponent = FaLinkedin;
                  else if (s.icon.includes("envelope")) IconComponent = FaEnvelope;
                  return (
                    <a
                      key={idx}
                      href={s.url}
                      target={s.url.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[#089BAB] hover:bg-[#089BAB] hover:text-white transition shadow-sm"
                      title={s.name}
                    >
                      <IconComponent className="text-lg" />
                    </a>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Academic & Teaching Experience Section */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-12">
            <span className="text-[#089BAB] font-bold text-xs uppercase tracking-widest block mb-2">
              Teaching & Professional Leadership
            </span>
            <h2 className="text-3xl font-extrabold text-[#002B48]">
              Academic & Leadership Experience
            </h2>
            <div className="h-1 w-16 bg-[#089BAB] mx-auto mt-3 rounded-full"></div>
            <p className="text-sm text-[#002B48]/70 mt-3 max-w-2xl mx-auto">
              Cultivating pedagogical mastery, student counseling, and technical club leadership.
            </p>
          </div>

          <div className="space-y-12">
            {experience.map((exp, idx) => (
              <motion.div
                key={exp.id || idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="bg-white rounded-2xl border border-gray-200/80 shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Image container */}
                  {exp.image && (
                    <div className="md:w-2/5 relative h-64 md:h-auto min-h-[260px] bg-gray-100 overflow-hidden">
                      <img
                        src={exp.image}
                        alt={exp.alt || exp.role}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:hidden"></div>
                      <div className="absolute bottom-3 left-3 text-white text-xs font-semibold md:hidden">
                        {exp.organization}
                      </div>
                    </div>
                  )}

                  {/* Content */}
                  <div className={`p-6 md:p-8 ${exp.image ? "md:w-3/5" : "w-full"}`}>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className="bg-[#089BAB]/10 text-[#089BAB] text-xs font-bold px-3 py-1 rounded-full">
                        {exp.employmentType || "Academic Experience"}
                      </span>
                      <span className="text-xs font-semibold text-gray-500">
                        {exp.period} · {exp.duration}
                      </span>
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold text-[#002B48] mb-1">
                      {exp.role}
                    </h3>
                    <p className="text-sm font-semibold text-[#089BAB] mb-4">
                      {exp.organization} · {exp.location}
                    </p>

                    <p className="text-sm text-[#002B48]/80 leading-relaxed mb-4">
                      {exp.description}
                    </p>

                    {/* Timeline items for clubs/roles */}
                    {exp.timeline && (
                      <div className="space-y-3 mb-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                        {exp.timeline.map((item, tIdx) => (
                          <div key={tIdx} className="text-xs">
                            <div className="flex justify-between font-bold text-[#002B48]">
                              <span>{item.role}</span>
                              <span className="text-gray-500">{item.period} ({item.duration})</span>
                            </div>
                            <p className="text-gray-600 mt-1 leading-relaxed">
                              {item.details}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Responsibilities */}
                    {exp.responsibilities && (
                      <div className="mb-4">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#002B48] mb-2">
                          Key Responsibilities:
                        </h4>
                        <ul className="space-y-1.5 text-xs text-[#002B48]/80">
                          {exp.responsibilities.map((r, rIdx) => (
                            <li key={rIdx} className="flex items-start gap-2">
                              <FaCheckCircle className="text-[#089BAB] mt-0.5 flex-shrink-0 text-[11px]" />
                              <span>{r}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Highlights callout */}
                    {exp.highlights && (
                      <div className="bg-[#E1F5F6]/50 p-3.5 rounded-xl border border-[#089BAB]/20 mb-4 text-xs text-[#002B48]/85">
                        {exp.highlights.map((h, hIdx) => (
                          <p key={hIdx} className="leading-relaxed">
                            <strong>Highlight:</strong> {h}
                          </p>
                        ))}
                      </div>
                    )}

                    {/* Skills pills */}
                    {exp.skills && (
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {exp.skills.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="bg-gray-100 text-[#002B48] text-xs font-medium px-2.5 py-0.5 rounded-md"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Education & Merit Scholarships Section */}
      <section className="py-16 bg-[#E1F5F6]/30 border-t border-gray-100" id="education">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-12">
            <span className="text-[#089BAB] font-bold text-xs uppercase tracking-widest block mb-2">
              Academic Record
            </span>
            <h2 className="text-3xl font-extrabold text-[#002B48]">
              Education & Merit Scholarships
            </h2>
            <div className="h-1 w-16 bg-[#089BAB] mx-auto mt-3 rounded-full"></div>
          </div>

          <div className="space-y-8">
            {education.map((edu, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white p-6 md:p-8 rounded-2xl shadow-md border border-gray-100"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-[#089BAB]">
                      {edu.degree}
                    </h3>
                    <p className="text-sm font-semibold text-[#002B48]">
                      {edu.institution} {edu.major ? `· Major in ${edu.major}` : ""}
                    </p>
                    <p className="text-xs text-gray-500">
                      {edu.location} | {edu.period}
                    </p>
                  </div>
                  {edu.cgpa && (
                    <div className="bg-[#E1F5F6] border border-[#089BAB]/30 px-4 py-2 rounded-xl text-center">
                      <span className="text-xs uppercase tracking-wider font-semibold text-gray-500 block">
                        Academic Standing
                      </span>
                      <span className="text-xl font-black text-[#002B48]">
                        CGPA {edu.cgpa} / {edu.cgpaScale}
                      </span>
                    </div>
                  )}
                  {edu.gpa && (
                    <div className="bg-gray-50 border border-gray-200 px-4 py-2 rounded-xl text-center">
                      <span className="text-xs text-gray-500 block">GPA</span>
                      <span className="text-lg font-bold text-[#002B48]">
                        {edu.gpa} / {edu.gpaScale}
                      </span>
                    </div>
                  )}
                </div>

                {/* Standing & Scholarships */}
                {edu.scholarships && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#FF9801] mb-3 flex items-center gap-1.5">
                      <FaAward /> Academic Scholarships & Honors
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                      {edu.scholarships.map((sch, sIdx) => (
                        <div key={sIdx} className="bg-gradient-to-br from-white to-[#E1F5F6]/40 p-3.5 rounded-xl border border-[#089BAB]/20">
                          <span className="text-lg font-black text-[#089BAB] block">
                            {sch.count} {sch.type}
                          </span>
                          <span className="text-xs text-[#002B48]/75 leading-tight block mt-1">
                            {sch.criteria}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Highlights */}
                {edu.highlights && (
                  <div className="mt-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#002B48] mb-2">
                      Curriculum & Achievements
                    </h4>
                    <ul className="space-y-1.5 text-xs md:text-sm text-[#002B48]/80">
                      {edu.highlights.map((h, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-2">
                          <FaCheck className="text-[#089BAB] mt-1 flex-shrink-0 text-xs" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Honors & Achievements */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-12">
            <span className="text-[#089BAB] font-bold text-xs uppercase tracking-widest block mb-2">
              Recognitions
            </span>
            <h2 className="text-3xl font-extrabold text-[#002B48]">
              Honors & Academic Awards
            </h2>
            <div className="h-1 w-16 bg-[#089BAB] mx-auto mt-3 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {achievements.map((ach, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all"
              >
                {ach.image && (
                  <div className="h-44 overflow-hidden bg-gray-100">
                    <img
                      src={ach.image}
                      alt={ach.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  {ach.badge && (
                    <span className="text-[10px] font-bold text-[#FF9801] uppercase tracking-wider bg-[#FF9801]/10 px-2 py-0.5 rounded-full block w-fit mb-2">
                      {ach.badge}
                    </span>
                  )}
                  <h3 className="text-base font-bold text-[#002B48] mb-1">
                    {ach.title}
                  </h3>
                  <p className="text-xs text-[#089BAB] font-medium mb-3">
                    {ach.organization} | {ach.year}
                  </p>
                  <p className="text-xs text-[#002B48]/75 leading-relaxed">
                    {ach.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications & Languages */}
      <section className="py-16 bg-[#E1F5F6]/40 border-t border-gray-100">
        <div className="container mx-auto px-6 max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Certifications */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-[#002B48] mb-4 flex items-center gap-2">
              <FaCertificate className="text-[#089BAB]" /> Certifications
            </h3>
            <div className="space-y-4">
              {certifications.map((cert, idx) => (
                <div key={idx} className="border-b border-gray-100 pb-3 last:border-b-0">
                  <h4 className="text-sm font-bold text-[#002B48]">{cert.title}</h4>
                  <p className="text-xs text-gray-500">{cert.issuer} · {cert.date}</p>
                  {cert.url && (
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#089BAB] font-semibold hover:underline mt-1 inline-block"
                    >
                      View Credential →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-[#002B48] mb-4 flex items-center gap-2">
              <FaUsers className="text-[#089BAB]" /> Languages
            </h3>
            <div className="space-y-3">
              {personal.languages?.map((lang, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
                >
                  <span className="font-semibold text-sm text-[#002B48]">
                    {lang.name}
                  </span>
                  <span className="text-xs font-semibold text-[#089BAB] bg-[#089BAB]/10 px-3 py-1 rounded-full">
                    {lang.level}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
