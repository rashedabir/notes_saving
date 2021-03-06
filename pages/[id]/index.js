import { useRouter } from "next/router";
import fetch from "isomorphic-unfetch";
import { toast } from "react-toastify";

function Note({ note }) {
  const router = useRouter();

  const deleteNote = async () => {
    let dev = process.env.NODE_ENV !== "production";
    let { DEV_URL, PROD_URL } = process.env;
    const noteId = router.query.id;
    try {
      if (window.confirm(`want to delete ${note.title}?`)) {
        await fetch(`${dev ? DEV_URL : PROD_URL}/api/notes/${noteId}`, {
          method: "Delete",
        });
        toast.success("Note Deleted");
        router.push("/");
        console.log(noteId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container justify-center m-auto mx-auto my-5 text-center">
      <label className="text-2xl font-bold">Title</label>
      <h1 className="mb-5 text-xl capitalize">{note.title}</h1>
      <label className="text-2xl font-bold">Description</label>
      <p className="mb-5 text-xl capitalize"> {note.description}</p>
      <button
        className="px-4 py-2 text-xl text-white uppercase transition-all delay-75 bg-red-600 border-2 rounded-md hover:bg-red-700"
        onClick={deleteNote}
      >
        delete
      </button>
    </div>
  );
}

Note.getInitialProps = async ({ query: { id } }) => {
  let PROD_URL = "https://notes-saving.vercel.app";
  const res = await fetch(`${PROD_URL}/api/notes/${id}`);
  const { data } = await res.json();

  return { note: data };
};

export default Note;
