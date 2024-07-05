import PostCard from "@/components/PostCard";
import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { groq } from "next-sanity";
import Image from "next/image";
import { PostList } from "./types/Post";
const getPosts = async () => {
  const query = groq`*[_type == 'blog' ] | order(_createdAt desc) {
    _id,
      title,
      smallDescription,
      _createdAt,
      "currentSlug": slug.current,
      titleImage
  }`;
  return client.fetch(query);
};
export default async function Home() {
  const posts: PostList[] = await getPosts();
  console.log(posts);
  return (
    <section className="grid grid-cols-3 gap-5 container justify-center items-center">
      {/* <div className="max-w-xl"> */}
      {posts.map((post, index) => (
        <div key={index} className="max-w-md">
          <PostCard
            key={post._id}
            title={post.title}
            description={post.smallDescription}
            image={urlForImage(post.titleImage)}
            slug={post.currentSlug}
          />
        </div>
      ))}
      {/* </div> */}
    </section>
  );
}
