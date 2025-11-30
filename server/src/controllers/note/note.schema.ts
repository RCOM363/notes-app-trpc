import * as z from "zod";

export const createNoteSchema = z.object({
  title: z.string().nonempty(),
  content: z.string().nonempty(),
});

export const idSchema = z.number();

export const updateNoteSchema = createNoteSchema.extend({
  noteId: idSchema,
});
