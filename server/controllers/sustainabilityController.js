const Sustainability = require("../models/Sustainability");

const addData = async (req, res) => {

    try {

        const { water, electricity, waste } = req.body;

        let ecoScore = 100;

        ecoScore -= Number(water);
        ecoScore -= Number(electricity);
        ecoScore -= Number(waste);

        const data = await Sustainability.create({

            water,
            electricity,
            waste,
            ecoScore,

            

        });

        res.status(201).json(data);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

module.exports = {
    addData
};