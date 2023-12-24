import Feed from "@/feature/thread/component/Feeds";
import Post from "@/feature/thread/component/post";
import { IFeed } from "@/types/thread";
import { useEffect, useState } from "react";
import { API } from "@/lib/api";

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
