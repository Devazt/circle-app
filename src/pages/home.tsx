import Feed from "@/components/thread";
import Post from "@/components/post";
import IFeed from "@/types/thread";
import { useEffect, useState } from "react";
import API from "@/lib/axios";

export default function Home() {
  const [feed, setFeed] = useState([]);

  const getFeed = async () => {
    const res = await API.get("/thread");
    const json = await res.data;
    setFeed(json.data);
  };
  useEffect(() => {
    getFeed();
  }, []);
  return (
    <>
      <Post />
      {feed.map((item: IFeed) => (
        <Feed key={item.id} {...item} />
      ))}
    </>
  );
}
