import { useParams, Link } from 'react-router-dom';
import { MessageCircle, Share2, Link2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { getBlogPostBySlug, blogPosts } from '../data/blogPosts';

export default function BlogPost() {
  const { slug } = useParams();
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return (
      <div className="pt-32 pb-16 bg-cream text-center">
        <h1 className="font-serif text-2xl text-darktext mb-4">Post not found</h1>
        <Link to="/blog" className="text-gold hover:underline">Back to Blog</Link>
      </div>
    );
  }

  const related = blogPosts.filter((p) => p.id !== post.id && p.category === post.category).slice(0, 3);
  const postUrl = window.location.href;

  const copyLink = () => {
    navigator.clipboard.writeText(postUrl);
    toast.success('Link copied!');
  };

  const formatContent = (content) =>
    content
      .trim()
      .split('\n')
      .map((line) => {
        if (line.startsWith('## ')) return `<h2 class="font-serif text-2xl text-darktext mt-8 mb-4">${line.slice(3)}</h2>`;
        if (line.trim() === '') return '';
        return `<p class="text-darktext mb-4" style="line-height:1.8">${line}</p>`;
      })
      .join('');

  return (
    <div className="pt-24 pb-16 bg-cream min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        <nav className="text-sm text-brown-light mb-6" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-gold">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/blog" className="hover:text-gold">Blog</Link>
          <span className="mx-2">/</span>
          <span className="text-darktext">{post.title}</span>
        </nav>

        <img src={post.image} alt={post.title} className="w-full aspect-[21/9] object-cover rounded-lg mb-8" />

        <span className="section-tag">{post.category}</span>
        <h1 className="font-serif text-3xl md:text-4xl text-darktext mt-2 mb-4">{post.title}</h1>
        <div className="flex items-center gap-4 text-sm text-beige-muted mb-8 pb-8 border-b border-beige-dark">
          <span className="text-brown-light">{post.author}</span>
          <span>{post.date}</span>
          <span>{post.readTime}</span>
        </div>

        <article
          className="article-content mb-10"
          dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
        />

        <div className="flex items-center gap-3 mb-12 pb-8 border-b border-beige-dark">
          <span className="text-sm text-brown-light">Share:</span>
          <a href={`https://wa.me/?text=${encodeURIComponent(`${post.title} - ${postUrl}`)}`} target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-beige rounded" aria-label="Share on WhatsApp">
            <MessageCircle className="w-5 h-5 text-green-600" />
          </a>
          <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`} target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-beige rounded" aria-label="Share on Facebook">
            <Share2 className="w-5 h-5 text-blue-600" />
          </a>
          <button onClick={copyLink} className="p-2 hover:bg-beige rounded" aria-label="Copy link">
            <Link2 className="w-5 h-5 text-darktext" />
          </button>
        </div>

        {related.length > 0 && (
          <div className="mb-10">
            <h2 className="font-serif text-2xl text-darktext mb-6">Related Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link key={r.id} to={`/blog/${r.slug}`} className="group bg-white border border-beige-dark rounded-lg overflow-hidden hover:border-gold">
                  <img src={r.image} alt={r.title} className="w-full aspect-[16/10] object-cover group-hover:opacity-90 transition-opacity" loading="lazy" />
                  <h3 className="font-serif text-darktext p-3 group-hover:text-gold transition-colors line-clamp-2">{r.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        )}

        <Link to="/blog" className="text-gold hover:text-gold-light font-medium">
          ← Back to Blog
        </Link>
      </div>
    </div>
  );
}
