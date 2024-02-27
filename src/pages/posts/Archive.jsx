import Cards from "@/components/Cards";
import LoadingCard from "@/components/LoadingCard";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useLocation } from "react-router-dom";

const Blogs = () => {
  const location = useLocation();
  const { hash, pathname } = location;
  const lastElementURL = /[^/]*$/.exec(pathname)[0];
  // console.log(lastElementURL);
  const [isLoading, setLoading] = useState(true);
  const [isData, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${
            import.meta.env.VITE_API_ROOT
          }/posts?_fields[]=id&_fields[]=title&_fields[]=slug&_fields[]=categories&_fields[]=featured_media&_fields[]=excerpt&_fields[]=status&per_page=8&page=${currentPage}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        // console.log(res.data);
        if (res.status === 200 && res.statusText === "OK") {
          const { data, headers } = res;
          setTotalPages(Number(headers["x-wp-totalpages"]));
          setData(data);
          console.log(data);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);



  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scroll(0, 0);
  };

  return (
    <>
      <main className="container my-40">
        <h1
          className={`text-4xl capitalize font-bold mb-6 ${
            lastElementURL && lastElementURL === "blogs" ? "text-center" : ""
          }`}
        >
          {pathname.includes("tag")
            ? `Tag: ${lastElementURL}`
            : pathname.includes("category")
            ? `Category: ${lastElementURL}`
            : "Blogs"}
        </h1>

        <section>
          <div className="cards grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {isLoading ? (
              Array(8)
                .fill()
                .map((_, ind) => <LoadingCard key={ind} />)
            ) : (
              <Cards data={isData} testData="Hellow testing!" />
            )}
          </div>
          {!isLoading && (
            <div className="mt-12">
              <PostPagination
                paginate={{ currentPage, totalPages }}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </section>
      </main>
    </>
  );
};

export default Blogs;

export function PostPagination({ paginate, onPageChange }) {
  // console.log(paginate);
  const { currentPage, totalPages } = paginate;
  // console.log("Current Page", currentPage);
  // console.log("Total Pages", totalPages);
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => onPageChange(currentPage - 1)}
            className="cursor-pointer"
            style={currentPage === 1 ? { ...btnStyles } : {}}
          />
        </PaginationItem>

        <PaginationItem>
          <PaginationLink>{currentPage}</PaginationLink>
        </PaginationItem>
        <span>of</span>
        <PaginationItem>
          <PaginationLink>{totalPages}</PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationNext
            onClick={() => onPageChange(currentPage + 1)}
            className="cursor-pointer"
            style={currentPage === totalPages ? { ...btnStyles } : {}}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

const btnStyles = {
  cursor: "not-allowed",
  opacity: ".5",
  pointerEvents: "none",
};
