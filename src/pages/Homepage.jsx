import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import Wrapper from "@/components/Wrapper";
const Homepage = () => {
  // const auth = JSON.parse(localStorage.getItem("user"));
  const auth = useSelector((state) => state.auth.user);
  return (
    <>
      <Wrapper className="container">
        <section className="text-center">
          <div>
            <h1 className="text-4xl font-extrabold mb-6">
              Hello This is Headless work 🐱‍👤
            </h1>
            {auth.token ? (
              <>
                <h3 className="text-xl font-semibold mb-3">
                  Hi buddy! 😎{" "}
                  <NavLink to={"/profile"}>
                    <span className="text-2xl capitalize font-extrabold underline">
                      {auth.user_display_name}
                    </span>
                  </NavLink>
                </h3>
                <NavLink to={"/admin"}>
                  <Button className="">Go to Dashboard</Button>
                </NavLink>
              </>
            ) : (
              <>
                <h3 className="text-xl font-semibold mb-3">
                  It seems you are not login, get logged in to start work!
                </h3>
                <NavLink to={"/login"}>
                  <Button className="">Go to Login Page</Button>
                </NavLink>
              </>
            )}
          </div>
        </section>
      </Wrapper>
    </>
  );
};

export default Homepage;
