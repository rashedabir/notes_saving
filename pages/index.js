import fetch from "isomorphic-unfetch";
import Card from "../components/Card";

const Index = ({ notes }) => {
  return (
    <div className="container mx-auto">
      <h1 className="my-3 text-3xl font-semibold text-center">Notes</h1>
      <div className="flex flex-wrap mx-auto mb-3">
        {notes &&
          notes.map((note) => {
            return <Card key={note._id} note={note} />;
          })}
      </div>
    </div>
  );
};

Index.getInitialProps = async () => {
  let dev = process.env.NODE_ENV !== "production";
  let { DEV_URL, PROD_URL } = process.env;
  const res = await fetch(`${dev ? DEV_URL : PROD_URL}/api/notes`);
  const { data } = await res.json();

  return { notes: data };
};

export default Index;
