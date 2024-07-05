import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

type Prop = {
  title: string;
  description: string;
  image: string;
  slug: string;
};

export default function PostCard({ title, description, image, slug }: Prop) {
  return (
    <Link href={`/blog/${slug}`}>
      <Card className="">
        <CardHeader>
          <Image src={image} alt="blog post" height={500} width={500}></Image>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent></CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </Link>
  );
}
