import { useState } from "react";
import { useTRPC } from "../utils/trpc";
import Note from "../components/Note";
import CreateNote from "../components/CreateNote";
import { useQuery } from "@tanstack/react-query";

function Dashboard() {
  const [createNote, setCreateNote] = useState(false);

  /* ----- Get user notes query ----- */
  const { data: notes, isLoading } = useQuery(
    useTRPC().note.getUserNotes.queryOptions()
  );

  const handleLogout = () => {
    localStorage.removeItem("notes-app-token");
    window.location.reload();
  };

  if (isLoading) {
    return <div className="w-1/3 mx-auto my-20">Loading...</div>;
  }
  return (
    <div className="w-1/3 mx-auto my-20">
      <button
        className="absolute top-10 right-10 h-10 flex justify-center items-center"
        onClick={handleLogout}
      >
        Logout
      </button>
      <div className="flex items-center justify-between">
        <h3 className="text-2xl">Notes</h3>
        <button
          className="my-2 h-10 flex justify-center items-center"
          type="submit"
          onClick={() => setCreateNote((prev) => !prev)}
        >
          {createNote ? "x" : "+"}
        </button>
      </div>
      {createNote ? (
        <CreateNote />
      ) : (
        <div className="flex flex-col max-h-1/6 gap-4 mt-10 overflow-y-scroll">
          {notes?.map((note) => (
            <Note key={note.id} note={note} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
