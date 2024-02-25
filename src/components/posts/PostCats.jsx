import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

const PostCats = ({ list }) => {
  const [isLoading, setLoading] = useState(true);
  const [category, setCategory] = useState();
  // console.log(list);
  useEffect(() => {
    const fetchMedia = async () => {
      try {
        setLoading(true);
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

export default PostCats;
