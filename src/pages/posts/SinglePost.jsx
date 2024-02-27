import Wrapper from "@/components/Wrapper";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { author, categories, tags } from "@/api/api";
import { Skeleton } from "@/components/ui/skeleton";
import PostImage from "@/components/posts/PostImage";
import { NavLink } from "react-router-dom";

const SinglePost = () => {
  const params = useParams();
  const [isLoading, setLoading] = useState(true);
  const [postData, setPostData] = useState(null);
  const [users, setUserData] = useState(null);
  const [postCats, setPostCats] = useState(null);
  const [postTags, setPostTags] = useState(null);
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_ROOT}/posts?slug=${
            params.id
          }&_fields=title,date,content,author,featured_media,categories,tags`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setPostData(res.data[0]);
        console.log("Post Data", res.data[0]);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (!postData) {
      fetchPostData();
    }
  }, [params.id, postData]);

  useEffect(() => {
    if (postData) {
      const fetchUserData = async () => {
        try {
          setUserLoading(true);
          const resAuthors = await author(postData.author);
          setUserData(resAuthors.data);
          const resTags = await tags(postData.tags);
          setPostTags(resTags.data);
          const resCats = await categories(postData.categories);
          setPostCats(resCats.data);
        } catch (error) {
          console.log(error);
        } finally {
          setUserLoading(false);
        }
      };
      fetchUserData();
    }
  }, [postData]);

  return (
    <Wrapper style={{ height: "auto" }} className="my-24">
      {!isLoading && (
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="">
            <div className="overflow-hidden rounded-lg">
              {postData.featured_image === 0 ? (
                <img
                  src="https://via.placeholder.com/800x400"
                  alt="Featured Image"
                  className="rounded-t-lg w-full"
                />
              ) : (
                <PostImage
                  mediaData={postData.featured_media}
                  mediaTitle={postData.title.rendered}
                  className="h-96"
                />
              )}
            </div>
            <div className="mt-4 flex justify-between items-center">
              <div className="flex items-center space-x-4 text-gray-600">
                <span>
                  {userLoading ? (
                    <Skeleton className="w-[140px] h-5" />
                  ) : (
                    users &&
                    users.map((authors, userInd) => {
                      return <span key={userInd}> Author: {authors.name}</span>;
                    })
                  )}
                </span>
                <span>Published: February 26, 2024</span>
                <span>Read Time: 5 min</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-600">Tags:</span>
                {userLoading ? (
                  <Skeleton className="w-[140px] h-5" />
                ) : (
                  postTags &&
                  postTags.map((tag, tagInd) => {
                    return (
                      <NavLink to={"/tag/" + tag.slug} key={tagInd}>
                        <span className="text-blue-500 hover:text-blue-600">
                          #{tag.name}
                        </span>
                      </NavLink>
                    );
                  })
                )}
              </div>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <span className="text-gray-600">Categories:</span>
                {userLoading ? (
                  <Skeleton className="w-[140px] h-5" />
                ) : (
                  postCats &&
                  postCats.map((cat, catInd) => {
                    return (
                      <NavLink to={"/category/" + cat.slug} key={catInd}>
                        <span className="text-blue-500">#{cat.name}</span>
                      </NavLink>
                    );
                  })
                )}
              </div>
            </div>
            <h1 className="text-6xl font-bold mt-4 capitalize">
              {postData.title.rendered}
            </h1>
            <div className="mt-4">
              <p
                dangerouslySetInnerHTML={{ __html: postData.content.rendered }}
              ></p>
            </div>
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default SinglePost;
