import { TRPCError } from "@trpc/server";
import { prisma } from "../../db/index.ts";
import type {
  CreateNoteProps,
  GetNoteByIdProps,
  UpdateNoteProps,
  DeleteNoteProps,
} from "./note.types.ts";
import { asyncHandler } from "../../utils/asyncHandler.ts";

async function createNote({ content, title, userId }: CreateNoteProps) {
  const note = await prisma.note.create({
    data: {
      title,
      content,
      userId,
    },
  });

  return note;
}

async function getNoteById({ noteId, userId }: GetNoteByIdProps) {
  const note = await prisma.note.findUnique({
    where: {
      id: noteId,
      userId,
    },
  });

  if (!note) {
    throw new TRPCError({ code: "NOT_FOUND", message: "Note not found" });
  }

  return note;
}

async function updateNote({ noteId, userId, title, content }: UpdateNoteProps) {
  const note = await getNoteById({ noteId, userId });

  const updatedNote = await prisma.note.update({
    data: {
      title,
      content,
    },
    where: {
      id: note.id,
      userId: note.userId,
    },
  });

  return updatedNote;
}

async function deleteNote({ noteId, userId }: DeleteNoteProps) {
  const note = await getNoteById({ noteId, userId });

  await prisma.note.delete({
    where: {
      id: note.id,
      userId: note.userId,
    },
  });

  return { success: true };
}

async function getUserNotes(userId: number) {
  const notes = await prisma.note.findMany({
    where: {
      userId,
    },
  });

  return notes;
}

export default {
  createNote: asyncHandler(createNote),
  updateNote: asyncHandler(updateNote),
  deleteNote: asyncHandler(deleteNote),
  getNoteById: asyncHandler(getNoteById),
  getUserNotes: asyncHandler(getUserNotes),
};
