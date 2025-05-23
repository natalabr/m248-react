import "../styles/TrailCard.css";
import {useState} from "react";

export default function TrailCard({trail, onDelete}) {
    const [showDetailsVar, setShowDetailsVar] = useState(false);

    const showDetails = () => {
        if(showDetailsVar)
            setShowDetailsVar(false);
        else
            setShowDetailsVar(true);
    }

    return (
        <div className={"trail"}>

            <div className={"trail-title"}>{trail.name}</div>
            <div className={"trail-date"}>Date: {new Date(trail.date).toLocaleString()}</div>
            <div className={"trail-location"}>Location: {trail.location}</div>

            <button onClick={showDetails}>
                {showDetailsVar ? (
                    <span>Hide details</span>
                ) : (
                    <span>Show details</span>
                )}
            </button>

            {showDetailsVar &&
                <div>
                    <div className={"trail-created"}>Created at: {trail.created}</div>
                    <div>
                        <button onClick={() => onDelete(trail.id)}>Delete</button>
                    </div>
                </div>
            }
        </div>
    );
}

