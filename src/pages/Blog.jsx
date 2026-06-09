import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { blogPosts, blogCategories } from '../data/blogPosts';
import { fadeInUp } from '../utils/animations';

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered =
    activeCategory === 'All'
      ? blogPosts
      : blogPosts.filter((p) => p.category === activeCategory);

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div className="pt-24 pb-16 bg-cream min-h-screen">
      <section className="section-dark bg-brown py-12 mb-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h1 variants={fadeInUp} initial="hidden" animate="visible" className="font-serif text-4xl text-white">
            Wood Mart Journal
          </motion.h1>
          <motion.p variants={fadeInUp} initial="hidden" animate="visible" className="text-beige-muted mt-2">
            Design inspiration, tips, and trends
          </motion.p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {blogCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-sm rounded-full transition-colors ${
                activeCategory === cat ? 'bg-gold text-darktext' : 'bg-white border border-beige-dark text-brown-light hover:border-gold'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {featured && (
          <Link to={`/blog/${featured.slug}`} className="block mb-12 group">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-white border border-beige-dark rounded-lg overflow-hidden hover:border-gold transition-colors">
              <img src={featured.image} alt={featured.title} className="w-full aspect-[16/10] object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
              <div className="p-8 flex flex-col justify-center">
                <span className="inline-block px-3 py-1 text-xs uppercase tracking-wider bg-beige text-gold border border-beige-dark rounded w-fit">{featured.category}</span>
                <h2 className="font-serif text-2xl md:text-3xl text-darktext mt-3 group-hover:text-gold transition-colors">{featured.title}</h2>
                <p className="text-brown-light mt-3 line-clamp-3">{featured.excerpt}</p>
                <div className="flex items-center gap-4 mt-4 text-sm text-beige-muted">
                  <span className="text-brown-light">{featured.author}</span>
                  <span>{featured.date}</span>
                  <span>{featured.readTime}</span>
                </div>
              </div>
            </div>
          </Link>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rest.map((post) => (
            <Link key={post.id} to={`/blog/${post.slug}`} className="group bg-white border border-beige-dark rounded-lg overflow-hidden hover:border-gold hover:shadow-md transition-all">
              <img src={post.image} alt={post.title} className="w-full aspect-[16/10] object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
              <div className="p-5">
                <span className="inline-block px-2 py-0.5 text-xs uppercase tracking-wider bg-beige text-gold border border-beige-dark rounded">{post.category}</span>
                <h3 className="font-serif text-lg text-darktext mt-2 group-hover:text-gold transition-colors line-clamp-2">{post.title}</h3>
                <p className="text-brown-light text-sm mt-2 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center gap-3 mt-4 text-xs text-beige-muted">
                  <span className="text-brown-light">{post.author}</span>
                  <span>{post.readTime}</span>
                </div>
                <span className="inline-block text-gold text-sm mt-3 group-hover:underline">Read More →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
