import Wrapper from "@/components/Wrapper";
import { useParams } from "react-router";

const SinglePost = () => {
  const params = useParams();
  return (
    <Wrapper>
      <section>
        <h1 className="text-4xl text-center font-bold mb-6">
          The Id is {params.id}
        </h1>
      </section>
    </Wrapper>
  );
};

export default SinglePost;
