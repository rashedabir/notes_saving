import Link from "next/link";
function Card({ note }) {
  return (
    <div className="p-5 m-3 border-2 rounded-md card">
      <h1 className="text-2xl capitalize">{note.title}</h1>
      <div className="flex mt-3 border-t-2">
        <Link href={`${note._id}`}>
          <a
            className="w-1/2 py-1 mt-3 mr-2 text-lg text-center text-white uppercase border-2 rounded-md"
            style={{ backgroundColor: "#28d" }}
          >
            view
          </a>
        </Link>
        <Link href={`${note._id}/edit`}>
          <a
            className="w-1/2 py-1 mt-3 ml-2 text-lg text-center text-white uppercase border-2 rounded-md"
            style={{ backgroundColor: "#28d" }}
          >
            edit
          </a>
        </Link>
      </div>
    </div>
  );
}

export default Card;
