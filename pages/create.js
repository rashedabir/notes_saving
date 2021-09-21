import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import fetch from "isomorphic-unfetch";
import { toast } from "react-toastify";

function create() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isSubmitting) {
      if (Object.keys(errors).length === 0) {
        createNote();
        toast.success("Note Created");
      } else {
        setIsSubmitting(false);
      }
    }
  }, [errors]);

  const createNote = async () => {
    const data = {
      title: title,
      description: description,
    };
    try {
      await fetch("http://localhost:3000/api/notes", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const validate = () => {
    let err = {};

    if (!title) {
      err.title = "Title is required";
      toast.error(err.title);
    }
    if (!description) {
      err.description = "Description is required";
      toast.error(err.description);
    }

    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errs = validate();
    setErrors(errs);
    setIsSubmitting(true);
  };

  return (
    <div className="container justify-center mx-auto my-5 text-center">
      {isSubmitting ? (
        "Loading..."
      ) : (
        <>
          <h1 className="py-4 text-3xl capitalize">create note</h1>
          <div className="justify-center p-4 mx-auto text-center">
            <form
              className="max-w-lg p-4 mx-auto border-2 rounded-md"
              onSubmit={handleSubmit}
            >
              <div className="mb-4">
                <label className="text-xl capitalize">title</label>
                <br />
                <input
                  type="text"
                  placeholder="Title"
                  className="w-full h-10 px-2 mt-2 border-2 rounded-md"
                  error={
                    errors.title ? { content: "Please enter a title" } : null
                  }
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  value={title}
                />
              </div>
              <div className="mb-4">
                <label className="text-xl capitalize">description</label>
                <br />
                <textarea
                  type="text"
                  placeholder="Description"
                  className="w-full h-20 px-2 mt-2 border-2 rounded-md"
                  error={
                    errors.description
                      ? {
                          content: "Please enter a description",
                        }
                      : null
                  }
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  value={description}
                />
              </div>
              <button
                type="submit"
                className="py-2 text-lg text-white uppercase rounded-md px-7"
                style={{ backgroundColor: "#28d" }}
              >
                save
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}

export default create;
