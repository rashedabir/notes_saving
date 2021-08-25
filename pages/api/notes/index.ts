import dbCoonect from "../../../utils/dbConnect";
import Note from "../../../models/Notes";

dbCoonect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const notes = await Note.find();

        res.status(200).json({ success: true, data: notes });
      } catch (error) {
        res.status(500).json({ success: false });
      }
      break;
    case "POST":
      try {
        const { title, description } = req.body;
        if (!title || !description) {
          return res
            .status(400)
            .json({ success: false, msg: "Invalid Credential" });
        }
        const existingNote = await Note.findOne({ title });
        if (existingNote) {
          return res
            .status(400)
            .json({ success: false, msg: "Note Already Exists" });
        }
        const newNote = new Note({
          title,
          description,
        });
        await newNote.save();
        res.json({ msg: "Note Saved" });
      } catch (error) {
        return res.status(500).json({ success: false });
      }
      break;
    default:
      res.status(500).json({ success: false });
      break;
  }
};
