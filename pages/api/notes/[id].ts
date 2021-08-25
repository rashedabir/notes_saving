import dbConnect from "../../../utils/dbConnect";
import Note from "../../../models/Notes";

dbConnect();

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "GET":
      try {
        const note = await Note.findById(id);
        if (!note) {
          return res
            .status(400)
            .json({ success: false, msg: "Note not Found" });
        }
        res.json({ note });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "PUT":
      try {
        const { title, description } = req.body;
        if (!title || !description) {
          return res
            .status(400)
            .json({ success: false, msg: "Invalid Credentials" });
        }
        const existingTitle = await Note.findOne({ title });
        if (existingTitle) {
          return res
            .status(400)
            .json({ success: false, msg: "Note Already Exists" });
        }
        await Note.findByIdAndUpdate(
          { _id: id },
          {
            title,
            description,
          }
        );
        res.json({ msg: "Note Updated" });
      } catch (error) {
        res.status(400).json({ success: false });
      }

    default:
      res.status(500).json({ success: false });
      break;
  }
};
