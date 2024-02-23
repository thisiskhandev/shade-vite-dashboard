import Cards from "@/components/Cards";
import axios from "axios";
import { useEffect, useState } from "react";

const Blogs = () => {
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      await axios
        .get(
          `${
            import.meta.env.VITE_API_ROOT
          }/posts?_fields[]=id&_fields[]=slug&_fields[]=categories&_fields[]=featured_media&_fields[]=excerpt`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchData();
    setLoading(false);
  }, []);
  return (
    <>
      {console.log("Inside Blog component")}
      <main className="container my-40">
        <h1 className="text-4xl text-center font-bold mb-6">Blogs</h1>
        <section>
          <div className="cards grid grid-cols-4 gap-4">
            {isLoading ? "Loading..." : <Cards />}
          </div>
        </section>
      </main>
    </>
  );
};

export default Blogs;
