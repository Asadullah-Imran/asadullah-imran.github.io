import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { FaArrowRight, FaCalendarAlt, FaClock } from "react-icons/fa";
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

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    fetch("/data/blog.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch blog data");
        return res.json();
      })
      .then((data) => {
        setPosts(data.posts || []);
        setCategories([
          { name: "All", count: data.posts.length },
          ...(data.categories || []),
        ]);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Filter posts by category
  const filteredPosts =
    activeCategory === "All"
      ? posts
      : posts.filter((post) => post.tags.some((tag) => tag === activeCategory));

  // Format date to "Month Day, Year" format
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Skeleton loader for blog posts
  const BlogSkeleton = () => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-[#E1F5F6]">
      <div className="h-48 bg-gradient-to-r from-[#69C3CC]/20 to-[#089BAB]/20 animate-pulse"></div>
      <div className="p-6">
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="h-6 bg-gray-200 rounded w-4/5 mb-4"></div>
        <div className="h-16 bg-gray-200 rounded mb-4"></div>
        <div className="flex flex-wrap gap-2 mb-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-6 bg-gray-200 rounded-full w-20"></div>
          ))}
        </div>
        <div className="h-10 bg-gray-200 rounded-lg w-32"></div>
      </div>
    </div>
  );

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gradient-to-b from-[#E1F5F6] to-white">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-[#089BAB] to-[#009C9C] text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-6">
              My <span className="text-[#FF9801]">Blog</span>
            </h1>
            <p className="text-xl max-w-2xl mx-auto mb-8 opacity-90">
              Thoughts, tutorials, and insights on web development, AI, and my
              journey as a developer
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="container mx-auto px-4 md:px-6 py-12">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="h-1 w-20 bg-[#089BAB] mx-auto mb-4"></div>
          <p className="text-[#002B48]/80 max-w-2xl mx-auto">
            Explore my articles on various topics in software development and
            technology
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category.name}
              className={`px-5 py-2 rounded-full font-medium transition-all duration-300 shadow-md ${
                activeCategory === category.name
                  ? "text-white bg-[#089BAB]"
                  : "text-[#002B48] bg-white hover:bg-gray-50"
              }`}
              onClick={() => setActiveCategory(category.name)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.name}
              <span className="ml-2 bg-white/20 px-2 py-1 rounded-full text-xs">
                {category.count}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Blog Posts */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <BlogSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <motion.div
            className="bg-red-50 p-8 rounded-xl border border-red-200 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-red-500 font-medium text-xl mb-4">{error}</div>
            <button
              onClick={() => window.location.reload()}
              className="bg-[#089BAB] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#002B48] transition"
            >
              Reload Blog
            </button>
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredPosts.length === 0 ? (
              <motion.div
                className="col-span-full text-center bg-white p-8 rounded-xl shadow-md border border-[#E1F5F6]"
                variants={itemVariants}
              >
                <div className="text-xl font-medium text-[#002B48] mb-4">
                  No posts found in this category
                </div>
                <button
                  onClick={() => setActiveCategory("All")}
                  className="bg-[#089BAB] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#002B48] transition"
                >
                  View All Posts
                </button>
              </motion.div>
            ) : (
              filteredPosts.map((post) => (
                <motion.div
                  key={post.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden border border-[#E1F5F6] hover:shadow-xl transition-all duration-300 flex flex-col"
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                >
                  <div className="h-48 overflow-hidden relative">
                    <img
                      src={post.image.replace("assets/images", "/images")}
                      alt={post.alt || post.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#002B48] to-transparent"></div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-4 text-sm">
                      <div className="flex items-center text-[#089BAB] gap-2">
                        <FaCalendarAlt />
                        <span>{formatDate(post.date)}</span>
                      </div>
                      <div className="flex items-center text-[#FF9801] gap-2">
                        <FaClock />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-[#002B48] mb-3">
                      {post.title}
                    </h3>
                    <p className="text-[#002B48]/80 mb-4 flex-1">
                      {post.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="bg-[#089BAB]/10 text-[#089BAB] text-xs px-3 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Link
                      to={`/blog/${post.id}`}
                      className="mt-auto inline-flex items-center text-[#089BAB] hover:text-[#002B48] font-medium group"
                    >
                      Read Article
                      <FaArrowRight className="ml-2 group-hover:ml-3 transition-all" />
                    </Link>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        )}
      </section>
    </div>
  );
};

export default Blog;
