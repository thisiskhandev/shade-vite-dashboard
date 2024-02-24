import Cards from "@/components/Cards";
import LoadingCard from "@/components/LoadingCard";
import axios from "axios";
import { useEffect, useState } from "react";

const Blogs = () => {
  const [isLoading, setLoading] = useState(true);
  const [isData, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${
            import.meta.env.VITE_API_ROOT
          }/posts?_fields[]=id&_fields[]=title&_fields[]=slug&_fields[]=categories&_fields[]=featured_media&_fields[]=excerpt&_fields[]=status`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        // console.log(res.data);
        if (res.status === 200 && res.statusText === "OK") {
          setData(res.data);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <main className="container my-40">
        <h1 className="text-4xl text-center font-bold mb-6">Blogs</h1>
        <section>
          <div className="cards grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {isLoading ? (
              Array(9)
                .fill()
                .map((_, ind) => <LoadingCard key={ind} />)
            ) : (
              <Cards data={isData} testData="Hellow testing!" />
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default Blogs;
