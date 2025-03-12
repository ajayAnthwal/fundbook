import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

// Generate static params for each blog post
export async function generateStaticParams() {
  // Adjusted to reflect the 'src/posts' folder
  const postsDirectory = path.join(process.cwd(), 'src', 'posts');
  const filenames = fs.readdirSync(postsDirectory);

  return filenames.map((filename) => ({
    slug: filename.replace(/\.md$/, ''),
  }));
}

// Helper function to read and process a Markdown file by slug
async function getPostData(slug) {
  const postsDirectory = path.join(process.cwd(), 'src', 'posts');
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Parse the front matter and content with gray-matter
  const { data, content } = matter(fileContents);

  // Convert markdown content to HTML using remark
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return { frontMatter: data, contentHtml };
}

// The dynamic blog post page component
export default async function BlogPost({ params }) {
  const { slug } = await params;
  const { frontMatter, contentHtml } = await getPostData(slug);
  console.log('frontmatter', frontMatter);

  return (
    <main id="content" role="main">
      <div className="container content-space-t-1 content-space-t-lg-4">
        <div className="w-md-75 w-lg-50 text-center mx-md-auto">
          <h1 className="display-4">{frontMatter.title}</h1>
          {frontMatter.description && 
            <p className="lead">{frontMatter.description}</p>
          }
        </div>
      </div>

      <div className="container content-space-b-2">
        <div className="row">
          <div className="col">
            {frontMatter.image && 
              <div className="my-4 my-sm-8">
                <img className="img-fluid rounded-lg" src={frontMatter.image} alt="Image Description" />
            </div>}
            <div className="blog-content" dangerouslySetInnerHTML={{ __html: contentHtml }} />
          </div>
        </div>
      </div>
    </main>
  );
}
