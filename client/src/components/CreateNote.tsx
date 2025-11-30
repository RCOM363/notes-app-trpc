import { useForm } from "react-hook-form";
import type { INote } from "./Note";
import { useTRPC } from "../utils/trpc";
import { useMutation } from "@tanstack/react-query";

export default function CreateNote() {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      title: "",
      content: "",
    },
  });

  /* ----- Create note mutation ----- */
  const { mutateAsync: createNote, isPending } = useMutation(
    useTRPC().note.createNote.mutationOptions()
  );

  const onSubmit = async (data: Pick<INote, "title" | "content">) => {
    const res = await createNote({
      title: data.title,
      content: data.content,
    });
    if (res) {
      alert("Note Added");
      reset();
      window.location.reload();
    }
  };

  return (
    <div className="w-4/5 mx-auto my-20">
      <form
        className="flex flex-col wrap p-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full flex-col">
          <label>Title</label>
          <input
            className="w-full my-2 border p-2"
            type="text"
            {...register("title")}
          />
        </div>
        <div className="w-full flex-col">
          <label>Content</label>
          <textarea
            className="w-full my-2 border p-2"
            {...register("content")}
          />
        </div>
        <button
          className="my-2 h-10 flex justify-center items-center"
          type="submit"
          disabled={isPending}
        >
          Add
        </button>
      </form>
    </div>
  );
}
