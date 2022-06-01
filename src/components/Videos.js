import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import useVideoList from "../Hooks/useVideoList";
import Video from "./Video";

export default function Videos() {
  const [page, setPage] = useState(1);
  const { loading, error, videos, hasMore } = useVideoList(page);

  //const [render, setRender] = useState(1);

  return (
    <>
      <div>
        {videos.length > 0 && (
          <InfiniteScroll
            dataLength={videos.length} //This is important field to render the next data
            next={() => setPage(page + 8)}
            hasMore={hasMore}
            //loader={<h4>Loading...</h4>}
          >
            {videos.map((video, index) =>
              video.noq > 0 ? (
                <Link
                  to={`/quiz/${video.youtubeID}`}
                  key={index}
                  state={{ videoTitle: video.title }}
                >
                  <Video
                    title={video.title}
                    id={video.youtubeID}
                    noq={video.noq}
                  />
                </Link>
              ) : (
                <Video
                  title={video.title}
                  id={video.youtubeID}
                  noq={video.noq}
                  key={index}
                />
              )
            )}{" "}
          </InfiniteScroll>
        )}
        {!loading && videos.length === 0 && <div>No data found</div>}
        {error && <p>There was an error!</p>}
        {loading && <div>Loading...</div>}
      </div>
    </>
  );
}
