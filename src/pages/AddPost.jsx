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

const AddPost = () => {
  const { output, fetchOutput } = useRichTextEditor();
  const [isLoading, setLoading] = useState(false);
  const [isContent, setContent] = useState("");
  const formik = useFormik({
    initialValues: {
      title: "",
      content: output,
      status: "publish",
    },

    validationSchema: Yup.object({
      title: Yup.string().required().max(300),
      //   content: Yup.required(),
    }),

    onSubmit: (data) => {
      setLoading(true);
      console.log(data);
      console.log(output);
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
            <form className="w-full" onSubmit={formik.handleSubmit}>
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
                value={output}
              />
              <RichTextEditor
                value={formik.values.content}
                // onChange={formik.handleChange}
                toolbarOptions={["word_count", "clear_format", "undo", "redo"]}
                customizeUI={{
                  backgroundColor: "#fcfcfc",
                  primaryColor: "#20464b",
                }}
                fetchOutput={fetchOutput}
              />
              <br />
              <br />
              <Button
                type="submit"
                className="disabled:bg-slate-800 w-full"
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
