import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTRPC } from "../utils/trpc";
import { useMutation } from "@tanstack/react-query";

export interface INote {
  id: number;
  title: string;
  content: string;
  userId: number;
}

function Note({ note }: { note: INote }) {
  const [editNote, setEditNote] = useState(false);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: note.title,
      content: note.content,
    },
  });

  /* ----- Update note mutation ----- */
  const { mutateAsync: updateNote, isPending: updatingNote } = useMutation(
    useTRPC().note.updateNote.mutationOptions()
  );

  /* ----- Delete note mutation ----- */
  const { mutateAsync: deleteNote, isPending: deletingNote } = useMutation(
    useTRPC().note.deleteNote.mutationOptions()
  );

  const onSubmit = async (data: Pick<INote, "title" | "content">) => {
    const res = await updateNote({
      noteId: note.id,
      title: data.title,
      content: data.content,
    });
    if (res) {
      alert("Note updated");
      window.location.reload();
    }
  };

  const handleDelete = async () => {
    const res = await deleteNote(note.id);
    if (res.success) {
      alert("Note Deleted");
      window.location.reload();
    }
  };

  return (
    <div className="w-4/5 mx-auto">
      <form className="border p-2" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col max-h-1/5 wrap gap-2 p-4 overflow-y-scroll">
          <input
            className={editNote ? "border p-2" : undefined}
            type="text"
            {...register("title")}
            disabled={!editNote}
          />
          <input
            className={editNote ? "border p-2" : undefined}
            type="text"
            {...register("content")}
            disabled={!editNote}
          />
        </div>
        <div className="flex justify-start items-center gap-4">
          {editNote ? (
            <>
              <button
                className="my-2 h-10 flex justify-center items-center"
                type="submit"
                disabled={updatingNote}
              >
                Update
              </button>
              <button
                className="my-2 h-10 flex justify-center items-center"
                type="button"
                onClick={() => setEditNote(false)}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                className="my-2 h-10 flex justify-center items-center"
                type="button"
                onClick={() => setEditNote(true)}
              >
                Edit
              </button>
              <button
                className="my-2 h-10 flex justify-center items-center"
                type="button"
                onClick={handleDelete}
                disabled={deletingNote}
              >
                Delete
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
}

export default Note;
