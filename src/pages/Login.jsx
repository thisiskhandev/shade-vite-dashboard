import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import LoginCover from "@/assets/images/login-cover.svg";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Loader2 } from "lucide-react";

import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/redux/slice/authSlice";

export const Login = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { toast } = useToast();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    // Validation Schema
    validationSchema: Yup.object({
      email: Yup.string().required().email(),
      password: Yup.string().required(),
    }),

    // Submission
    onSubmit: async (data) => {
      console.log("Data is: ", data);
      dispatch(login(data)); // Sending data into store
      // setLoading(true);
      // const { email, password } = data;
      /* await axios
        .post(`${import.meta.env.VITE_API_AUTH}`, {
          username: email,
          password: password,
        })
        .then((res) => {
          console.log("Response", res);
          if (res.status === 200) {
            localStorage.setItem("user", JSON.stringify(res.data));
            toast({
              title: "Welcome back " + res.data.user_display_name + " 👋",
            });
            navigate("/profile");
          }
        })
        .catch((err) => {
          console.log("Error", err);
          if (err.response.status === 404 || err.response.status === 403) {
            toast({
              variant: "destructive",
              title: "Wrong Credentials or User not Found!",
              description: "Please check your credentials again!",
              action: (
                <ToastAction altText="Error Message">Dismiss</ToastAction>
              ),
            });
          }
        }); */
      // setLoading(false);
    },
  });

  //   console.log("Values ", formik.values);
  //   console.log("Errors ", formik.errors);
  return (
    <>
      {/* {import.meta.env.VITE_API_ROOT} */}

      <main
        className="container flex flex-col items-center justify-center"
        style={{ ...styles }}
      >
        <h1 className="text-4xl font-bold mb-6">Login Page</h1>
        <section className="py-16 flex items-center justify-center flex-col shadow-xl rounded-lg w-2/3">
          <section className="form_section flex w-full gap-6 items-center justify-center">
            <div>
              <img src={LoginCover} alt="" srcSet={LoginCover} width={300} />
            </div>
            <div>
              <h3 className="py-5 text-1xl">Fill the details to login</h3>
              <form className="w-72" onSubmit={formik.handleSubmit}>
                <Input
                  type="email"
                  placeholder="Email"
                  id="email"
                  name="email"
                  autoComplete="off"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
                <br />
                <Input
                  type="password"
                  placeholder="Password"
                  id="password"
                  name="password"
                  autoComplete="off"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
                <br />
                <Button
                  type="submit"
                  className="disabled:bg-slate-800 w-full"
                  disabled={authState.isLoading}
                >
                  {authState.isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Submit
                </Button>
              </form>
            </div>
          </section>
        </section>
      </main>
    </>
  );
};

const styles = {
  height: "90vh",
};
