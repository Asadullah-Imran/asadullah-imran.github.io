import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaClock,
  FaShareAlt,
  FaTag,
} from "react-icons/fa";
import { Link, useParams } from "react-router-dom";

const SingleBlog = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [readingProgress, setReadingProgress] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    fetch("/data/blog.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch blog data");
        return res.json();
      })
      .then((data) => {
        const found = (data.posts || []).find(
          (p) => String(p.id) === String(id)
        );
        setPost(found || null);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  // Format date to "Month Day, Year" format
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Reading progress tracker
  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;

      const contentHeight = contentRef.current.offsetHeight;
      const scrollPosition =
        window.scrollY - contentRef.current.offsetTop + 100;

      if (scrollPosition > 0) {
        const progress = Math.min(100, (scrollPosition / contentHeight) * 100);
        setReadingProgress(progress);
      } else {
        setReadingProgress(0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [post]);

  // Share functionality
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: post?.title,
          text: post?.excerpt,
          url: window.location.href,
        })
        .catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  // Render markdown-like text formatting
  const renderText = (text) => {
    if (!text) return null;

    // Handle headings (###, ##, #)
    if (text.startsWith("### ")) {
      return (
        <h4 className="text-xl font-bold text-[#002B48] mt-6 mb-4">
          {text.replace("### ", "")}
        </h4>
      );
    }
    if (text.startsWith("## ")) {
      return (
        <h3 className="text-2xl font-bold text-[#002B48] mt-8 mb-4">
          {text.replace("## ", "")}
        </h3>
      );
    }
    if (text.startsWith("# ")) {
      return (
        <h2 className="text-3xl font-bold text-[#002B48] mt-10 mb-6">
          {text.replace("# ", "")}
        </h2>
      );
    }

    // Handle code blocks
    if (text.startsWith("```") && text.endsWith("```")) {
      const codeContent = text.replace(/```/g, "").trim();
      return (
        <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto my-4 text-sm">
          <code>{codeContent}</code>
        </pre>
      );
    }

    // Handle lists (lines starting with - or *)
    if (text.includes("\n- ") || text.includes("\n* ")) {
      const lines = text.split("\n");
      return (
        <ul className="list-disc list-inside my-4 space-y-2 text-[#002B48]/90">
          {lines.map((line, index) => {
            const listItem = line.replace(/^[-\*] /, "").trim();
            return listItem ? <li key={index}>{listItem}</li> : null;
          })}
        </ul>
      );
    }

    // Regular paragraph
    return <p className="text-[#002B48]/90 leading-relaxed mb-4">{text}</p>;
  };

  // Render a single block
  const renderBlock = (block, blockIndex) => {
    return (
      <div key={blockIndex} className="mb-6">
        {/* Text content */}
        {block.text && renderText(block.text)}

        {/* Additional text after link */}
        {block.text2 && (
          <span className="text-[#002B48]/90">{block.text2}</span>
        )}

        {/* Link */}
        {block.link && (
          <a
            href={block.link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#089BAB] hover:text-[#002B48] underline font-medium"
          >
            {block.link.text}
          </a>
        )}

        {/* Image with description */}
        {block.image && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="my-6 rounded-xl overflow-hidden shadow-lg"
          >
            <img
              src={block.image.replace("assets/images", "/images")}
              alt={block.alt || ""}
              className="w-full h-auto object-cover"
            />
            {block.description && (
              <p className="text-center text-sm text-[#002B48]/70 mt-2 italic">
                {block.description}
              </p>
            )}
          </motion.div>
        )}
      </div>
    );
  };

  if (loading)
    return (
      <div className="pt-24 pb-16 min-h-screen bg-gradient-to-b from-[#E1F5F6] to-white">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-40 mb-8"></div>
            <div className="h-12 bg-gray-200 rounded w-full mb-6"></div>
            <div className="flex gap-4 mb-6">
              <div className="h-4 bg-gray-200 rounded w-32"></div>
              <div className="h-4 bg-gray-200 rounded w-24"></div>
            </div>
            <div className="h-64 bg-gray-200 rounded-lg mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/5"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
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
              to="/blog"
              className="bg-[#089BAB] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#002B48] transition inline-block"
            >
              Back to Blog
            </Link>
          </div>
        </div>
      </div>
    );

  if (!post)
    return (
      <div className="pt-24 pb-16 min-h-screen bg-gradient-to-b from-[#E1F5F6] to-white flex items-center justify-center">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl text-center">
          <div className="bg-white p-8 rounded-xl shadow-lg border border-[#E1F5F6]">
            <h2 className="text-2xl font-bold text-[#002B48] mb-4">
              Post Not Found
            </h2>
            <p className="text-[#002B48]/80 mb-6">
              The blog post you're looking for doesn't exist or has been
              removed.
            </p>
            <Link
              to="/blog"
              className="bg-[#089BAB] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#002B48] transition inline-flex items-center gap-2"
            >
              <FaArrowLeft /> Back to Blog
            </Link>
          </div>
        </div>
      </div>
    );

  return (
    <div className="pt-24 min-h-screen bg-gradient-to-b from-[#E1F5F6] to-white">
      {/* Reading progress bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-[#089BAB] z-50"
        style={{ width: `${readingProgress}%` }}
      ></div>

      <div className="container mx-auto px-4 md:px-6 max-w-3xl pb-16">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            to="/blog"
            className="inline-flex items-center text-[#089BAB] hover:text-[#002B48] font-medium mb-8 group"
          >
            <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </Link>
        </motion.div>

        {/* Post header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-[#002B48] mb-6">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 mb-8">
            <div className="flex items-center text-[#089BAB] gap-2">
              <FaCalendarAlt />
              <span>{formatDate(post.date)}</span>
            </div>
            <div className="flex items-center text-[#FF9801] gap-2">
              <FaClock />
              <span>{post.readTime}</span>
            </div>
            <button
              onClick={handleShare}
              className="flex items-center text-[#009C9C] gap-2 hover:text-[#089BAB] transition"
            >
              <FaShareAlt />
              <span>Share</span>
            </button>
          </div>
        </motion.div>

        {/* Featured image */}
        {post.image && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mb-10 rounded-xl overflow-hidden shadow-lg"
          >
            <img
              src={post.image.replace("assets/images", "/images")}
              alt={post.alt || post.title}
              className="w-full h-auto object-cover"
            />
          </motion.div>
        )}

        {/* Content */}
        <motion.div
          ref={contentRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mb-12"
        >
          {post.sections &&
            post.sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="mb-8">
                {section.blocks &&
                  section.blocks.map((block, blockIndex) => (
                    <div key={blockIndex}>{renderBlock(block, blockIndex)}</div>
                  ))}
              </div>
            ))}
        </motion.div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="mb-12"
          >
            <div className="flex items-center text-[#089BAB] gap-2 mb-4">
              <FaTag />
              <span className="font-medium">Tags:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-[#089BAB]/10 text-[#089BAB] px-4 py-2 rounded-lg text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Categories */}
        {post.categories && post.categories.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.45 }}
            className="mb-12"
          >
            <div className="flex items-center text-[#089BAB] gap-2 mb-4">
              <FaTag />
              <span className="font-medium">Categories:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {post.categories.map((category, idx) => (
                <span
                  key={idx}
                  className="bg-[#FF9801]/10 text-[#FF9801] px-4 py-2 rounded-lg text-sm font-medium"
                >
                  {category}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Author card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="bg-white rounded-xl shadow-lg p-6 border border-[#E1F5F6]"
        >
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#089BAB]">
              <img
                src="/images/profile/b.jpg"
                alt="Asadullah Imran"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#002B48] mb-1">
                Asadullah Imran
              </h3>
              <p className="text-[#002B48]/80 mb-3">
                MERN Stack Developer | CSE Student
              </p>
              <p className="text-[#002B48]/80">
                Final-year Computer Science student at United International
                University. Passionate about building modern web applications
                and sharing knowledge through blog posts.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Back to blog button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <Link
            to="/blog"
            className="bg-[#089BAB] hover:bg-[#002B48] text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center gap-2"
          >
            <FaArrowLeft /> Back to Blog
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default SingleBlog;
