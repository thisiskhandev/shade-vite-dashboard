import { NavLink } from "react-router-dom";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import axios from "axios";

const Cards = ({ data }) => {
  return (
    <>
      {data &&
        data.map((items, index) => {
          return (
            <div className="card" key={index}>
              <div className="bg-gray-100 flex items-center justify-center rounded-md h-full">
                <div className="max-w-md bg-white p-6 rounded-md shadow-md h-full hover:shadow-lg transition-all">
                  {items.featured_media == 0 ? (
                    <img
                      src={
                        import.meta.env.VITE_API_BASE_URL +
                        "/wp-content/uploads/woocommerce-placeholder.png"
                      }
                      alt={items.title.rendered}
                      className="rounded-sm mb-4 mx-auto w-full h-56 object-cover"
                    />
                  ) : (
                    <CardImage
                      mediaData={items.featured_media}
                      mediaTitle={items.title.rendered}
                    />
                  )}

                  <h2 className="text-2xl font-bold mb-2">
                    {items.title.rendered}
                  </h2>

                  <div
                    className="text-gray-600 mb-4 text-sm"
                    dangerouslySetInnerHTML={{ __html: items.excerpt.rendered }}
                  ></div>

                  <NavLink to={"/blogs/" + items.slug}>
                    <Button>Read More</Button>
                  </NavLink>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default Cards;

const CardImage = ({ mediaData, mediaTitle }) => {
  console.log("Media hits!", mediaData);
  const [media, setMedia] = useState();
  useEffect(() => {
    const fetchMedia = async () => {
      try {
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
      }
    };
    fetchMedia();
  }, [mediaData]);
  return (
    <>
      {media &&
        media.map((items, index) => {
          return (
            <img
              src={items.source_url}
              key={index}
              alt={mediaTitle}
              className="rounded-sm mb-4 mx-auto w-full h-56 object-cover"
            />
          );
        })}
    </>
  );
};
