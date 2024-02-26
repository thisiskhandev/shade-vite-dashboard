import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import axios from "axios";

const PostImage = ({ mediaData, mediaTitle, className: customClass }) => {
  const [isLoading, setLoading] = useState(true);
  // console.log("Media hits!", mediaData);
  const [media, setMedia] = useState();
  useEffect(() => {
    const fetchMedia = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${
            import.meta.env.VITE_API_ROOT
          }/media?include=${mediaData}&_fields=source_url`
        );
        if (res.status === 200) {
          setMedia(res.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMedia();
  }, [mediaData]);
  return (
    <>
      {isLoading ? (
        <Skeleton className="h-56 mb-2 w-full" />
      ) : (
        media &&
        media.map((items, index) => {
          return (
            <img
              src={items.source_url}
              key={index}
              alt={mediaTitle}
              className={
                "rounded-sm mb-4 mx-auto w-full h-56 object-cover" +
                " " +
                customClass
              }
            />
          );
        })
      )}
    </>
  );
};

export default PostImage;
