const Issue = require("../models/Issue");
const Notification = require("../models/Notification");


// CREATE ISSUE
const createIssue = async (req, res) => {
 console.log("CREATE ISSUE HIT");
    try {

        const {
            title,
            description,
            category,
            location
        } = req.body;

        const issue = await Issue.create({

            title,
            description,
            category,
            location,

            image: req.file ? req.file.path : "",

            createdBy: req.user.id

        });
      await Notification.create({
    userId: issue.createdBy,
    message: `New issue reported: ${issue.title}`
});
        console.log("Notification Created for Issue:");

        res.status(201).json({
            message: "Issue created successfully",
            issue
        });

    } catch (error) {

    console.log("ERROR:", error);

    res.status(500).json({
        message: error.message
    });

    }
};



// GET ALL ISSUES
const getIssues = async (req, res) => {

    try {

        let issues;

        if (req.user.role === "admin") {

            issues = await Issue.find()
            .populate("createdBy", "name email");

        } else {

            issues = await Issue.find({
                createdBy: req.user.id
            })
            .populate("createdBy", "name email");

        }

        res.status(200).json(issues);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};



// UPDATE ISSUE STATUS
const updateIssueStatus = async (req, res) => {
console.log("UPDATE ISSUE HIT");
    try {

        const issue = await Issue.findById(req.params.id);

        if (!issue) {

            return res.status(404).json({
                message: "Issue not found"
            });

        }

        issue.status = req.body.status || issue.status;

        await issue.save();

        // CREATE NOTIFICATION
      console.log("Issue Found:", issue);

await Notification.create({
    userId: issue.createdBy,
    message: `Your issue "${issue.title}" has been resolved`
});

console.log("Notification Saved");


        res.status(200).json({
            message: "Issue updated successfully",
            issue
        });

    } catch (error) {

    console.log("ERROR:", error);

    res.status(500).json({
        message: error.message
    });

    }
};



// DELETE ISSUE
const deleteIssue = async (req, res) => {

    try {

        const issue = await Issue.findById(req.params.id);

        if (!issue) {

            return res.status(404).json({
                message: "Issue not found"
            });

        }

        await Issue.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Issue deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};



module.exports = {
    createIssue,
    getIssues,
    updateIssueStatus,
    deleteIssue
};