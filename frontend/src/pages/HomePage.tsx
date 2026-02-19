import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import RateLimited from "../components/RateLimited";
import api from "../lib/axios";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import NotesNotFound from "../components/NotesNotFound";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        setNotes(res.data);
        setIsRateLimited(false);
      } catch(error) {
        console.log("Error fetching notes", error)
        // if(error.response?.status === 429) {
        //   setIsRateLimited(true)
        // } else {
        //   toast.error("Failed to load Notes.")
        // }
        toast.error("Failed to load Notes.");
      } finally {
        setLoading(false);
      }
    }
    fetchNotes();
  }, [])
  console.log(notes)

  return (
    <div className="min-h-screen">
      <NavBar />

      {isRateLimited && <RateLimited />}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && <div className="text-center text-primary py-10">Loading notes...</div>}

        {notes.length === 0 && !isRateLimited && <NotesNotFound />}

        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {notes.map(note => (
              <NoteCard key={note.id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage;