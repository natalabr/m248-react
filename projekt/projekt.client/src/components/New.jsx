import "../styles/New.css";
import React, { useState } from 'react';
import {data, useNavigate} from "react-router-dom";
import { LOCALSTORAGE_KEY } from "@/App.jsx";

const New = () => {
    //const [trails, setTrails] = useState([]);
    const navigate = useNavigate();

    // variables for each input field
    const [trailName, setTrailName] = useState('');
    const [trailDate, setTrailDate] = useState('');
    const [trailLocation, setTrailLocation] = useState('');

    // TODO: Make it work
    let trailNameRequired = false;
    const [trailNameRequiredShow, setTrailNameRequiredShow] = useState(false);

    // after form submission (create)
    const handleSubmit = (e) => {
        //prevent from posting request to server (reloading page)
        //TODO: check if needed
        e.preventDefault();

        // Name validation
        if (trailName.trim() === '') {
            trailNameRequired = true;
        }
        else {
            trailNameRequired = false;
        }

        // Date validation
        if (trailDate.trim() === '') {
            alert('Please fill in date details.');
        }
        if (trailDate < new Date()) {
            alert("Date & Time cannot be in the past."); // macht das sinn?
            //ich lese warte kurz.. wieso setTrails und nicht setTrail? also weil du die nimmtst? von local storage? [beantwortet oben]
            // also settrails kommt von dem hier - nein. von weiter oben
        }

        // Location validation
        if (trailLocation.trim() === '') {
            alert('Please fill in location details.');
        }

        setTrailNameRequiredShow(trailNameRequired);
        if(trailNameRequired){
            return;
        }

        // new object with collected data
        const newTrailData = {
            id: crypto.randomUUID(),
            name: trailName,
            date: trailDate,
            location: trailLocation,
            created: Date.now()
        };

        let trails = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)) ?? [];// jetzt haben wir die stored trails von localstorage gelesen und in ein json ARRAY umgewandelt.
        trails.push(newTrailData); // hier
        localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(trails));
        alert("Sucess😋😋😋, yippiii");

        // clear the form fields after submission
        setTrailName('');
        setTrailDate('');
        setTrailLocation('');
        // ich mache hier ein redirect zum '/' also root von der webseite... ist das gut?
        //wieso willst du das machen?
        // gute frage..... idk willst du?
        // bahahja oki mach
        // nein nur wenn du willst... normalerweise macht man wenn man eine seite aufmacht für eine aktion, (automatisch [siehe sabo projekt bei admin dashoard)
        // wieder zu... aber es ist schon nice feature wenn man mehrere aufs mal machen kann igues.... idk das kannst du entscheiden...
        // ahhhh ik ik oki
        // sonst das ist der code: location.href = '/' falls du es nacher benützen willst und so....
        // ich habe eine frage: wenn du so presets hast für so 
    };

    return (
        <main id="mainNew">
            <div id="newContainer">
                <h2 className="form-title">New Trail</h2>

                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" className="form-input"
                           value={trailName}
                           onChange={(e) => setTrailName(e.target.value)}/>
                    {trailNameRequiredShow && <div><p>This field is required</p></div>}
                </div>
                <div className="form-group">
                    <label htmlFor="date">Date:</label>
                    <input type="datetime-local" id="date" name="date" className="form-input" value={trailDate} onChange={(e) => setTrailDate(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="location">Location:</label>
                    <input type="text" id="location" name="location" className="form-input" value={trailLocation} onChange={(e) => setTrailLocation(e.target.value)}/>
                </div>

                <div className="form-buttons">
                    <button onClick={() => navigate("/")} type="button" id="cancelButton">Cancel</button>
                    <button onClick={(e) => handleSubmit(e)} type="button" id="createButton">Create</button>
                </div>
            </div>
        </main>
    )
}

export default New;