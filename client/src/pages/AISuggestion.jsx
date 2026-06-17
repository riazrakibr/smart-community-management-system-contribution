import { useState } from "react";
import axios from "axios";

function AISuggestion() {

    const [water, setWater] = useState("");
    const [electricity, setElectricity] = useState("");
    const [waste, setWaste] = useState("");

    const [suggestion, setSuggestion] = useState("");

    const getSuggestion = async () => {

        try {

            const res = await axios.post(
                "https://smart-community-management-system.onrender.com/api/ai/suggestion",
                {
                    water,
                    electricity,
                    waste
                }
            );

            setSuggestion(res.data.suggestion);

        } catch (error) {

            console.log(error);
            alert("AI Suggestion Failed");
        }
    };

    return (

        <div>

            <h1>AI Eco Suggestions</h1>

            <input
                type="text"
                placeholder="Water Usage"
                value={water}
                onChange={(e) => setWater(e.target.value)}
            />

            <br /><br />

            <input
                type="text"
                placeholder="Electricity Usage"
                value={electricity}
                onChange={(e) => setElectricity(e.target.value)}
            />

            <br /><br />

            <input
                type="text"
                placeholder="Waste Generated"
                value={waste}
                onChange={(e) => setWaste(e.target.value)}
            />

            <br /><br />

            <button onClick={getSuggestion}>
                Generate Suggestion
            </button>

            <br /><br />

            <h3>AI Suggestion</h3>

            <p>{suggestion}</p>

        </div>
    );
}

export default AISuggestion;