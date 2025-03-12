import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function getPostsData(maxPosts = -1) {
  const postsDirectory = path.join(process.cwd(), 'src', 'posts');
  const filenames = fs.readdirSync(postsDirectory);

  let selectedFilenames = filenames;
  if (maxPosts !== -1) {
    selectedFilenames = filenames.slice(0, maxPosts);
  }
  
  const posts = selectedFilenames.map((filename) => {
    const slug = filename.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);
    return { slug, frontMatter: data };
  });
  
  return posts;
}
