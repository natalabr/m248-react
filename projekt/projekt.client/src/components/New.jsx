import "../styles/New.css";
import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import { LOCALSTORAGE_KEY } from "@/App.jsx";

const New = () => {
    const navigate = useNavigate();

    // variables for each input field
    const [trailName, setTrailName] = useState('');
    const [trailDate, setTrailDate] = useState('');
    const [trailLocation, setTrailLocation] = useState('');

    // local variables for input validation
    let trailNameRequired = false;
    let trailDateRequired = false;
    let trailDateInPast = false;
    let trailLocationRequired = false;

    // react variables for input validation
    const [trailNameRequiredShow, setTrailNameRequiredShow] = useState(false);
    const [trailDateRequiredShow, setTrailDateRequiredShow] = useState(false);
    const [trailDateInPastShow, setTrailDateInPastShow] = useState(false);
    const [trailLocationRequiredShow, setTrailLocationRequiredShow] = useState(false);

    // after form submission (create)
    const handleSubmit = (e) => {
        //prevent from posting request to server (reloading page)
        e.preventDefault();

        // input validation
        if (trailName.trim() === '') {
            trailNameRequired = true;
        }

        if (trailDate.trim() === '') {
            trailDateRequired = true;
        }
        if (new Date(trailDate) < new Date()) {
            trailDateInPast = true;
        }

        if (trailLocation.trim() === '') {
            trailLocationRequired = true;
        }

        // show validation messages
        setTrailNameRequiredShow(trailNameRequired);
        setTrailDateRequiredShow(trailDateRequired);
        setTrailDateInPastShow(trailDateInPast);
        setTrailLocationRequiredShow(trailLocationRequired);

        if(trailNameRequired || trailDateRequired || trailDateInPast || trailLocationRequired) {
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

        // save new trail to local storage
        let trails = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)) ?? [];
        trails.push(newTrailData);
        localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(trails));
        alert("You have successfully created a new trail");

        // reset input fields
        setTrailName('');
        setTrailDate('');
        setTrailLocation('');

        //redirect to home page
        location.href = '/'
    };

    return (
        <main id="mainNew">
            <div id="newContainer">
                <h2 className="form-title">New Trail</h2>
                <div className="form-content">
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input type="text"
                               id="name"
                               name="name"
                               className="form-input"
                               value={trailName}
                               onChange={(e) => setTrailName(e.target.value)}/>
                        {trailNameRequiredShow && <div class="field-required"><p>*This field is required</p></div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="date">Date:</label>
                        <input type="datetime-local"
                               id="date"
                               name="date"
                               className="form-input"
                               value={trailDate}
                               onChange={(e) => setTrailDate(e.target.value)}/>
                        {trailDateRequiredShow && <div class="field-required"><p>*This field is required</p></div>}
                        {trailDateInPastShow && <div class="field-required"><p>Date and Time cannot be in the past</p></div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="location">Location:</label>
                        <input type="text"
                               id="location"
                               name="location"
                               className="form-input"
                               value={trailLocation}
                               onChange={(e) => setTrailLocation(e.target.value)}/>
                        {trailLocationRequiredShow && <div class="field-required"><p>*This field is required</p></div>}
                    </div>
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