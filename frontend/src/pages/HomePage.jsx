import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import RateLimited from "../components/RateLimited";
import axios from "axios";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/notes/")

        console.log(res)
      } catch(error) {
        console.log("Error fetching notes", error)
      }
    }

    fetchNotes();
  }, [])

  return (
    <div className="min-h-screen">
      <NavBar />
      {isRateLimited && <RateLimited />}
    </div>
  )
}

export default HomePage;