import { NavLink } from "react-router-dom";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";

const Cards = ({ data }) => {
  return (
    <>
      {data &&
        data.map((items, index) => {
          {
            /* console.log(items); */
          }
          return (
            <div className="card relative" key={index}>
              <div className="bg-gray-100 flex items-center justify-center rounded-md h-full relative">
                <div className="max-w-md bg-white p-6 rounded-md shadow-md h-full hover:shadow-lg transition-all">
                  {items.categories.length > 0 && (
                    <div className="category text-sm rounded-full text-end w-5/6 ml-auto py-0 z-10 absolute right-7 top-8">
                      <ul>
                        <PostCats list={items.categories} />
                      </ul>
                    </div>
                  )}
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
  const [isLoading, setLoading] = useState(true);
  // console.log("Media hits!", mediaData);
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
              className="rounded-sm mb-4 mx-auto w-full h-56 object-cover"
            />
          );
        })
      )}
    </>
  );
};

const PostCats = ({ list }) => {
  const [isLoading, setLoading] = useState(true);
  const [category, setCategory] = useState();
  // console.log(list);
  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const res = await axios.get(
          `${
            import.meta.env.VITE_API_ROOT
          }/categories?include=${list}&_fields=name,slug`
        );
        if (res.status === 200) {
          setCategory(res.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMedia();
  }, [list]);

  return (
    !isLoading &&
    category &&
    category.map((items, index) => {
      return (
        <li key={index} className="inline-block my-1">
          <NavLink
            className="capitalize bg-white mr-1 shadow-sm hover:bg-slate-100 px-2 transition-all rounded-full"
            to={items.slug}
          >
            {items.name}
          </NavLink>
        </li>
      );
    })
  );
};
