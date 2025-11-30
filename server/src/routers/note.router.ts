import { router } from "../config/trpc.ts";
import noteController from "../controllers/note/note.controller.ts";

/* ----- Define note procedures ----- */
export const noteRouter = router({
  createNote: noteController.createNote,
  updateNote: noteController.updateNote,
  deleteNote: noteController.deleteNote,
  getNoteById: noteController.getNoteById,
  getUserNotes: noteController.getUserNotes,
});
