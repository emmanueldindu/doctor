export default function HealthAdvice() {
  const blogPosts = [
    {
      id: 1,
      title: "Diet Tips for a Healthier Lifestyle",
      excerpt: "Discover 5 healthy diet choices for overall well-being and improved energy levels throughout your day.",
      readTime: "5 min read",
      category: "Nutrition",
      image: "/blog1.jpg" // Placeholder - replace with actual image
    },
    {
      id: 2,
      title: "The Importance of Regular Health Checkups",
      excerpt: "Regular health screenings are essential for early detection and prevention of serious health conditions.",
      readTime: "3 min read", 
      category: "Prevention",
      image: "/blog2.jpg" // Placeholder - replace with actual image
    },
    {
      id: 3,
      title: "Boosting Your Immune System Naturally",
      excerpt: "A strong immune system is crucial for good health. Learn natural ways to boost your body's defenses.",
      readTime: "4 min read",
      category: "Wellness",
      image: "/blog3.jpg" // Placeholder - replace with actual image
    }
  ];

  return (
    <section className="px-6 lg:px-20 py-16 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
              Expert <span className="italic text-[#2F80ED]">Health</span> Advice and Updates
            </h2>
            <p className="text-lg text-gray-600">
              Stay informed with the latest health tips and medical insights
            </p>
          </div>
          <button className="hidden md:flex items-center text-[#2F80ED] font-medium hover:text-[#2563EB] transition-colors">
            <span>See All</span>
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
                  <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                </div>
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-[#2F80ED] text-white text-xs font-medium rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#2F80ED] transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                {/* Meta Info */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{post.readTime}</span>
                  <button className="text-[#2F80ED] font-medium text-sm hover:text-[#2563EB] transition-colors flex items-center">
                    <span>Read More</span>
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Mobile See All Button */}
        <div className="text-center mt-8 md:hidden">
          <button className="inline-flex items-center px-6 py-3 bg-[#2F80ED] text-white font-medium rounded-full hover:bg-[#2563EB] transition-colors">
            <span>See All Articles</span>
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
