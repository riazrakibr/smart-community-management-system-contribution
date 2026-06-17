const getSuggestion = require("../services/aiService");

const generateSuggestion = async (req, res) => {

    try {

        const { water, electricity, waste } = req.body;

        const suggestion = await getSuggestion({
            water,
            electricity,
            waste
        });

        res.status(200).json({
            success: true,
            suggestion
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    generateSuggestion
};