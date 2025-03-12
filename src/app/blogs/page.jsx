import BlogCard from '../components/cards/blog_card';
import { getPostsData } from '@/api/blogs';


// The Blog Index page (server component)
export default async function BlogsPage() {
  const posts = await getPostsData();

  return (
    <main id="content" role="main">
      <div className="container content-space-t-1 content-space-t-lg-4 content-space-b-1 content-space-b-lg-1">
        <div className="w-md-75 w-lg-50 text-center mx-md-auto">
          <h1 className="display-4">Fundbook Blogs</h1>
        </div>
      </div>

      <div className="container content-space-b-2 content-space-b-lg-3">
        <div className="row mb-7">
          {posts.map((post) => (
            <BlogCard key={post.slug} 
              title={post.frontMatter.title}
              description={post.frontMatter.description}
              image={post.frontMatter.image}
              slug={`/blogs/${post.slug}`}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
