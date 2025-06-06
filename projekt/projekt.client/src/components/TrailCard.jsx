import "../styles/TrailCard.css";
import {useState} from "react";

export default function TrailCard({trail, onDelete}) {
    const [showDetailsVar, setShowDetailsVar] = useState(false);

    //display details
    const showDetails = () => {
        if(showDetailsVar)
            setShowDetailsVar(false);
        else
            setShowDetailsVar(true);
    }

    return (
        <div className={"trail " + (new Date(trail.date) < new Date() ? "in-the-past" : "")}>
            <div className={"accordion-header"}>

                <div className={"trail-title"}>Name: {trail.name}</div>
                <div className={"trail-date"}>Date: {new Date(trail.date).toLocaleString()}</div>
                <div className={"trail-location"}>Location: {trail.location}</div>
            </div>
                <button className={"show-button"} type={"button"} onClick={showDetails}>
                    {showDetailsVar ? (
                        <span>Hide details</span>
                    ) : (
                        <span>Show details</span>
                    )}
                </button>

            {showDetailsVar &&
                <div className={"accordion-body"}>
                    <div className={"trail-created"}>This trail has been created
                        at: {new Date(trail.created).toLocaleString()}</div>
                    <button className={"deleteButton"} onClick={() => onDelete(trail.id)}>Delete</button>
                </div>
            }
        </div>
    );
}

