import "../styles/Content.css";
import { useNavigate } from "react-router-dom";
import TrailCard from "./TrailCard.jsx"
import {useCallback, useEffect, useState} from "react";
import {LOCALSTORAGE_KEY} from "@/App.jsx";

const Content = () => {
    const [trails, setTrails] = useState([]);

    const reloadTrails = useCallback(() => {
        let storedTrails = localStorage.getItem(LOCALSTORAGE_KEY);
        if (storedTrails) {
            setTrails(JSON.parse(storedTrails));
        }
    }, []);

    useEffect(() => {
        reloadTrails();
    }, [reloadTrails]);
    // diesen code oben ist so automatisches neuladen von localstorage --> automatisches updaten von webseite.

    const navigate = useNavigate();

    async function deleteTrail(id) {
        if (!confirm("Are you sure you want to delete this trail?")) {
            return;
        }
        let storedTrails = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
        let filteredTrails = storedTrails.filter(trail => trail.id !== id);
        localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(filteredTrails));

        setTrails(filteredTrails);
    }

    return (
        <main>
            <div id="headerContent">
                <h2>Your Trails</h2>
                <button className="btn btn-primary btn-lg" id="newButton" onClick={() => navigate("/new-trail")} type="button">New</button>
            </div>
            <div className="trails-container">
                {trails.length === 0 ? (
                    <p>No trails added yet. Click "New" to add one!</p>
                ) : (
                    trails.sort((a, b) => {
                        const dateComparison = new Date(a.date) - new Date(b.date);
                        if (dateComparison !== 0) return dateComparison;
                        return a.name.localeCompare(b.name);
                    })
                        .map((trail) => ( //hier ist blablabla... eine lambda funktion. (object : hier bei uns ein trail von array oben) => {erstelle ein neuen TrailCard component. und du gibst den trail object mit.}
                            <TrailCard
                                key={trail.id} // Important for React list rendering
                                trail={trail} //hier übergibst du das object von lambda function (trail). jetzt können wir das bei TrailCard benützen.... lies das und sag ob es sinn macht. auch oben... ich gehe Trail Card machen... wen du fragen hast, komm auch zum file
                                onDelete={(id) => deleteTrail(id)} //If you want individual delete - das macht keinen sinn... onDelete ist so wenn das html objekt gelöscht wird.. das ist nicht was du willst.. du willst es ja aus dem localstorage löschen
                            />
                    ))
                )}
                {/*der code oben, ist eigentlich eine schlaufe. trails.map schaut immer ob trails konstante oben content hat und falls ja, mach für jeden (also map) trail blablabla*/}
            </div>
        </main>
    );
};

export default Content;