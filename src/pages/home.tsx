import Feed from "@/components/feed";
import Post from "@/components/post";
import IFeed from "@/types/feed";
import { useEffect, useState } from "react";
import data from "@/mocks/feed.json";

export default function Home() {
  const [feed, setFeed] = useState<IFeed[]>([]);
  useEffect(() => {
    setFeed(data);
  }, []);
  return (
    <>
      <Post />
      {feed.map((item) => (
        <Feed key={item.id} {...item} />
      ))}
    </>
  );
}
