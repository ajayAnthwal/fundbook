import { getPostsData } from "@/api/blogs";
import BlogCard from "./blog_card";

async function HomePageBlogs() {
  const posts = await getPostsData(3);

  return (
    <div className="container content-space-b-2 content-space-b-lg-3">
      <h2>Our Blogs</h2>
        <div className="row">
          {posts.map((post) => (
            <BlogCard key={post.slug} 
              title={post.frontMatter.title}
              description={post.frontMatter.description}
              image={post.frontMatter.image}
              slug={`/blogs/${post.slug}`}
            />
          ))}
        </div>
        <a className="btn btn-primary btn-transition" href="/blogs">All Blogs</a>
      </div>
  );
}

export default HomePageBlogs;