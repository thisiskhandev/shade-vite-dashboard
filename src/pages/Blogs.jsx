import Cards from "@/components/Cards";

const Blogs = () => {
  return (
    <>
      <main className="container my-40">
        <h1 className="text-4xl text-center font-bold mb-6">Blogs</h1>
        <section>
          <div className="cards grid grid-cols-4 gap-4">
            <Cards />
          </div>
        </section>
      </main>
    </>
  );
};

export default Blogs;
