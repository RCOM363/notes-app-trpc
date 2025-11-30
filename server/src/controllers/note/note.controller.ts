import { protectedProcedure } from "../../config/trpc.ts";
import { createNoteSchema, updateNoteSchema, idSchema } from "./note.schema.ts";
import noteService from "./note.service.ts";

const createNote = protectedProcedure
  .input(createNoteSchema)
  .mutation(async ({ ctx, input }) => {
    const { user } = ctx;
    const { title, content } = input;

    return noteService.createNote({ title, content, userId: user.id });
  });

const updateNote = protectedProcedure
  .input(updateNoteSchema)
  .mutation(async ({ ctx, input }) => {
    const { user } = ctx;
    const { title, content, noteId } = input;

    return noteService.updateNote({ title, content, noteId, userId: user.id });
  });

const deleteNote = protectedProcedure
  .input(idSchema)
  .mutation(async ({ ctx, input }) => {
    const { user } = ctx;
    return noteService.deleteNote({ noteId: input, userId: user.id });
  });

const getNoteById = protectedProcedure
  .input(idSchema)
  .query(async ({ ctx, input }) => {
    const { user } = ctx;
    return noteService.getNoteById({ noteId: input, userId: user.id });
  });

const getUserNotes = protectedProcedure.query(async ({ ctx }) => {
  const { user } = ctx;
  return noteService.getUserNotes(user.id);
});

export default {
  createNote,
  updateNote,
  deleteNote,
  getNoteById,
  getUserNotes,
};
