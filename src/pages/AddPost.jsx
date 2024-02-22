import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";

import { Loader2 } from "lucide-react";

import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import RichTextEditor from "rich-text-editor-for-react";
import useRichTextEditor from "rich-text-editor-for-react/hook";
import DisplayTheOutput from "rich-text-editor-for-react/display-output";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSelector } from "react-redux";

const AddPost = () => {
  // const auth = JSON.parse(localStorage.getItem("user"));
  const auth = useSelector((state) => state.auth.user);
  const { output, fetchOutput } = useRichTextEditor();
  const [isLoading, setLoading] = useState(false);
  const [isContent, setContent] = useState("");
  const [postStatus, sePostStatus] = useState("");
  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
    },

    validationSchema: Yup.object({
      title: Yup.string().required().max(300),
      content: Yup.string().required(),
    }),

    onSubmit: async (data) => {
      // selectEnums.forEach((selectedEnums) => {
      //   if (postStatus !== selectedEnums) {
      //     console.log("Did not matched!");
      //     console.warn("The value is: " + selectEnums);
      //     return;
      //   }
      // });
      const post = { ...data, status: postStatus };
      const { title, content, status } = data;
      setLoading(true);
      console.log(data, "Data");
      await axios
        .post(`${import.meta.env.VITE_API_ROOT}/posts`, post, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      setLoading(false);
    },
  });

  console.log("Formik Values", formik.values);
  console.log("Formik Errors", formik.errors);
  return (
    <main
      className="container flex flex-col items-center justify-center"
      style={{ ...styles }}
    >
      <h1 className="text-4xl font-bold mb-6">Add Post</h1>
      <section className="py-16 flex items-center justify-center flex-col shadow-xl rounded-lg w-2/3">
        <section className="form_section w-full gap-6">
          <div>
            <form className="w-3/4 m-auto" onSubmit={formik.handleSubmit}>
              <Input
                type="text"
                placeholder="Post Title"
                id="title"
                name="title"
                autoComplete="off"
                value={formik.values.title}
                onChange={formik.handleChange}
              />
              <br />
              <Textarea
                placeholder="Add your content..."
                id="content"
                name="content"
                autoComplete="off"
                value={formik.values.content}
                onChange={formik.handleChange}
              />
              {/* <RichTextEditor
                value={formik.values.content}
                // onChange={formik.handleChange}
                toolbarOptions={["word_count", "clear_format", "undo", "redo"]}
                customizeUI={{
                  backgroundColor: "#fcfcfc",
                  primaryColor: "#20464b",
                }}
                fetchOutput={fetchOutput}
              /> */}
              <br />
              <Select onValueChange={(e) => sePostStatus(e)}>
                <SelectTrigger className="">
                  <SelectValue placeholder="Post Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Select Status</SelectLabel>
                    {selectEnums.map((val, ind) => {
                      return (
                        <SelectItem value={val} key={ind}>
                          {val.charAt(0).toLocaleUpperCase() + val.slice(1)}
                        </SelectItem>
                      );
                    })}
                    {/* <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="private">Private</SelectItem> */}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Button
                type="submit"
                className="disabled:bg-slate-800 w-full mt-5"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <span>Publishing</span>
                  </>
                ) : (
                  <span>Publish</span>
                )}
              </Button>
            </form>
          </div>
        </section>
      </section>
    </main>
  );
};

export default AddPost;

const styles = {
  height: "90vh",
};

const selectEnums = ["publish", "draft", "pending", "private"];
