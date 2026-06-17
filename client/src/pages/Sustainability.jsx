import { useState } from "react";
import axios from "axios";

function Sustainability() {

    const [water, setWater] = useState("");
    const [electricity, setElectricity] = useState("");
    const [waste, setWaste] = useState("");
    const [ecoScore, setEcoScore] = useState("");

    const submitData = async () => {

        try {

            const res = await axios.post(
                "https://smart-community-management-system.onrender.com/api/sustainability",
                {
                    water,
                    electricity,
                    waste
                }
            );

            setEcoScore(res.data.ecoScore);

        } catch (error) {

            console.log(error);
            alert("Failed to save sustainability data");
        }
    };

    return (

        <div>

            <h1>Sustainability Module</h1>

            <input
                type="number"
                placeholder="Water Usage"
                value={water}
                onChange={(e) => setWater(e.target.value)}
            />

            <br /><br />

            <input
                type="number"
                placeholder="Electricity Usage"
                value={electricity}
                onChange={(e) => setElectricity(e.target.value)}
            />

            <br /><br />

            <input
                type="number"
                placeholder="Waste Generated"
                value={waste}
                onChange={(e) => setWaste(e.target.value)}
            />

            <br /><br />

            <button onClick={submitData}>
                Calculate Eco Score
            </button>

            <br /><br />

            <div className="score-box">
                    Eco Score: {ecoScore}
            </div>

        </div>
    );
}

export default Sustainability;