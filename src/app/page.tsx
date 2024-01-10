import Image from "next/image";
import { client } from "../../sanity/lib/client";
type Post = {
  _id: string
  title?: string
  slug?: {
    current: string
  }
}

export default async function Home() {
  const posts = await client.fetch<Post[]>(`*[_type == "post"]`,{ cache: 'no-store' } )
  
  console.log("🚀 ~ Home ~ p33osts:", posts)
  return (
    <>
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            <a href={post?.slug?.current}>{post?.title}</a>
          </li>
        ))}
      </ul>
    </>
  );
}
