import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { format } from "date-fns";
import { groq } from "next-sanity";
import Image from "next/image";
import React from "react";
import { PortableText } from "@portabletext/react";

const getPost = async (slug: string) => {
  const query = groq`*[_type== 'blog' && slug.current == $slug]
    {
    _id,
      title,
      smallDescription,
      content,
      _createdAt,
      "currentSlug": slug.current,
      titleImage
  }`;
  return client.fetch(query, { slug });
};

export default async function Post({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const [post] = await getPost(slug);
  console.log(post);
  return (
    <div className="container mx-auto">
      <div className="min-h-screen">
        <div className="rounded-md shadow-md flex items-center">
          <div className="md:max-w-2xl mx-auto">
            <div className="py-8 px-4 text-black">
              <time dateTime={post._createdAt}>
                {format(post._createdAt, "LLLL d, yyyy")}
              </time>
              <h1 className="leading-10 font-extrabold text-4xl text-zinc-900 pb-4">
                {post.title}
              </h1>
              <Image
                src={urlForImage(post.titleImage)}
                height={500}
                width={500}
                alt=""
                className="h-100 w-100 object-contain"
              ></Image>
              <div className="prose prose-xl">
                <PortableText value={post.content} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
