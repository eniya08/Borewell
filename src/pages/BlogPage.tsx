import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft, Calendar, User, Share2 } from "lucide-react";
import { blogsAPI } from "@/lib/api";

interface BlogPost {
  _id?: string;
  id?: number;
  title: string;
  excerpt: string;
  content: string;
  author?: { name: string } | string;
  date?: string;
  createdAt?: string;
  category?: string;
  image: string;
  readTime?: number;
  slug?: string;
  views?: number;
}

// Default fallback posts if API is unavailable
const defaultBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Complete Guide to Borewell Drilling",
    excerpt: "Learn everything you need to know about borewell drilling, from site selection to maintenance.",
    content: "Borewell drilling is a crucial process for ensuring a reliable water supply. In this comprehensive guide, we cover everything from geological surveys to proper maintenance practices. Our team at Mahalakshmi Borewells shares decades of expertise to help you make informed decisions.",
    author: "Mahalakshmi Team",
    date: "2024-03-19",
    category: "Guide",
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=500&fit=crop&q=80",
    readTime: 5,
  },
  {
    id: 2,
    title: "Understanding Water Quality Testing",
    excerpt: "Importance of regular water quality testing and how it ensures safe drinking water.",
    content: "Regular water quality testing is essential to maintain the health and safety of your water supply. Our experts share insights on what to test for, when to test, and how to interpret results for optimal borewell performance.",
    author: "Water Specialist",
    date: "2024-03-15",
    category: "Maintenance",
    image: "https://images.unsplash.com/photo-1576091160550-112173f7f869?w=800&h=500&fit=crop&q=80",
    readTime: 4,
  },
  {
    id: 3,
    title: "Latest Drilling Technologies in Borewell Industry",
    excerpt: "Discover the cutting-edge technologies revolutionizing the borewell drilling industry.",
    content: "The borewell drilling industry is rapidly evolving with new technologies. Learn about modern drilling rigs, automated systems, and advanced equipment that improve efficiency, accuracy, and safety in borewell drilling operations.",
    author: "Tech Expert",
    date: "2024-03-10",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=800&h=500&fit=crop&q=80",
    readTime: 6,
  },
  {
    id: 4,
    title: "Pump Installation Best Practices",
    excerpt: "Expert tips for proper pump installation and long-term reliability.",
    content: "A properly installed submersible pump is crucial for reliable water extraction. Learn about pump selection, installation procedures, electrical safety, and maintenance schedules to maximize the lifespan of your borewell system.",
    author: "Installation Expert",
    date: "2024-03-08",
    category: "Guide",
    image: "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=800&h=500&fit=crop&q=80",
    readTime: 5,
  },
];

const BlogPage = () => {
  const navigate = useNavigate();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(defaultBlogPosts);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      setLoading(true);
      const posts = await blogsAPI.getAll();
      if (posts && posts.length > 0) {
        setBlogPosts(posts);
      } else {
        setBlogPosts(defaultBlogPosts);
      }
    } catch (error) {
      console.error("Failed to fetch blog posts:", error);
      // Use default posts on error
      setBlogPosts(defaultBlogPosts);
    } finally {
      setLoading(false);
    }
  };

  const categories = ["All", ...new Set(blogPosts.map((p) => p.category).filter(Boolean))];

  const filteredPosts =
    selectedCategory === "All"
      ? blogPosts
      : blogPosts.filter((p) => p.category === selectedCategory);

  // Helper to get author name
  const getAuthorName = (author: any) => {
    if (typeof author === "string") return author;
    if (author?.name) return author.name;
    return "Unknown Author";
  };

  // Helper to get date string
  const getDateString = (post: BlogPost) => {
    const dateStr = post.date || post.createdAt;
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-24">
      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.1, x: -5 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate(-1)}
        className="fixed top-24 left-4 z-40 flex items-center gap-2 text-orange-500 hover:text-orange-400 font-semibold transition"
      >
        <ArrowLeft size={20} />
        Back
      </motion.button>

      {/* Header */}
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-[#FF9900]/20 to-orange-600/20 border-b border-white/10 py-12"
      >
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-white mb-4">Blog & Resources</h1>
          <p className="text-gray-300 text-lg">
            Expert insights and tips on borewell drilling and water management
          </p>
        </div>
      </motion.section>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap gap-3 justify-center mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                selectedCategory === category
                  ? "bg-[#FF9900] text-white shadow-lg shadow-[#FF9900]/50"
                  : "bg-white/10 text-gray-300 hover:bg-white/20"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Blog Posts Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full"
        >
          {loading ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-400 text-lg">Loading blog posts...</p>
            </div>
          ) : filteredPosts.length > 0 ? (
            filteredPosts.map((post, i) => (
              <motion.article
                key={post._id || post.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setSelectedPost(post)}
                className="group cursor-pointer bg-slate-800/50 border border-white/10 rounded-2xl overflow-hidden hover:border-[#FF9900]/50 transition-all hover:shadow-lg hover:shadow-[#FF9900]/20 flex flex-col h-full"
              >
                {/* Image */}
                <div className="relative w-full h-56 overflow-hidden bg-gradient-to-br from-slate-700 to-slate-800 flex-shrink-0">
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const img = e.currentTarget as HTMLImageElement;
                      img.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400'%3E%3Crect fill='%23475569' width='600' height='400'/%3E%3Ctext x='50%25' y='50%25' font-size='24' fill='%2394a3b8' text-anchor='middle' dy='.3em'%3EBorewell Service%3C/text%3E%3C/svg%3E";
                    }}
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-[#FF9900] text-white text-xs font-bold rounded-full">
                      {post.category || "General"}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-[#FF9900] transition">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-grow">{post.excerpt}</p>

                  {/* Meta */}
                  <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <div className="flex items-center gap-2">
                        <User size={14} />
                        <span className="truncate">{getAuthorName(post.author)}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} />
                        {getDateString(post)}
                      </div>
                      {post.readTime && <p className="text-[#FF9900] font-semibold">{post.readTime} min</p>}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-400 text-lg">No blog posts found in this category.</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Post Modal */}
      {selectedPost && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedPost(null)}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 pt-24 overflow-y-auto"
        >
          <motion.article
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-800 rounded-2xl overflow-hidden max-w-2xl w-full border border-white/20"
          >
            {/* Hero Image */}
            <div className="w-full h-80 bg-gradient-to-br from-slate-700 to-slate-800 overflow-hidden">
              <img
                src={selectedPost.image}
                alt={selectedPost.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const img = e.currentTarget as HTMLImageElement;
                  img.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Crect fill='%23475569' width='800' height='600'/%3E%3Ctext x='50%25' y='50%25' font-size='32' fill='%2394a3b8' text-anchor='middle' dy='.3em'%3EBorewell Service%3C/text%3E%3C/svg%3E";
                }}
              />
            </div>

            {/* Content */}
            <div className="p-8">
              {/* Category & Meta */}
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
                <span className="px-3 py-1 bg-[#FF9900]/30 text-[#FF9900] rounded-full text-sm font-semibold">
                  {selectedPost.category || "General"}
                </span>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ✕
                </button>
              </div>

              {/* Title & Author Info */}
              <h1 className="text-3xl font-bold text-white mb-4">{selectedPost.title}</h1>

              <div className="flex items-center gap-6 text-sm text-gray-400 mb-6">
                <div className="flex items-center gap-2">
                  <User size={16} />
                  {getAuthorName(selectedPost.author)}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  {getDateString(selectedPost)}
                </div>
                {selectedPost.readTime && <span>{selectedPost.readTime} min read</span>}
              </div>

              {/* Content */}
              <p className="text-gray-300 leading-relaxed mb-8">{selectedPost.content}</p>

              {/* Actions */}
              <div className="flex gap-4 pt-6 border-t border-white/10">
                <button className="flex items-center gap-2 px-4 py-2 bg-[#FF9900] hover:bg-[#E68A00] text-white rounded-lg transition-colors font-semibold">
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              </div>
            </div>
          </motion.article>
        </motion.div>
      )}
    </div>
  );
};

export default BlogPage;
