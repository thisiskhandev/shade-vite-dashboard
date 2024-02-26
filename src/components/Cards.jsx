import { NavLink } from "react-router-dom";
import { Button } from "./ui/button";
import PostImage from "./posts/PostImage";
import PostCats from "./posts/PostCats";

const Cards = ({ data }) => {
  return (
    <>
      {data &&
        data.map((items, index) => {
          const { title, categories, featured_media, excerpt, slug } = items;
          return (
            <div className="card relative" key={index}>
              <div className="bg-gray-100 flex items-center justify-center rounded-md h-full relative">
                <div className="max-w-md bg-white p-6 rounded-md shadow-md h-full hover:shadow-lg transition-all">
                  {categories.length > 0 && (
                    <div className="category text-sm rounded-full text-end w-5/6 ml-auto py-0 z-10 absolute right-7 top-8">
                      <ul>
                        <PostCats list={categories} />
                      </ul>
                    </div>
                  )}
                  {featured_media == 0 ? (
                    <img
                      src={
                        import.meta.env.VITE_API_BASE_URL +
                        "/wp-content/uploads/woocommerce-placeholder.png"
                      }
                      alt={title.rendered}
                      className="rounded-sm mb-4 mx-auto w-full h-56 object-cover"
                    />
                  ) : (
                    <PostImage
                      mediaData={featured_media}
                      mediaTitle={title.rendered}
                      className="h-auto"
                    />
                  )}

                  <h2 className="text-2xl font-bold mb-2">{title.rendered}</h2>

                  <div
                    className="text-gray-600 mb-4 text-sm"
                    dangerouslySetInnerHTML={{ __html: excerpt.rendered }}
                  ></div>

                  <NavLink to={"/blogs/" + slug}>
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
