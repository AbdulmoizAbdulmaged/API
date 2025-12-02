const mongoose = require("mongoose");

const ControlSchema = new mongoose.Schema(
    {
        app_name: {type: String},
        cash:{type: Boolean},
        crdt:{type: Boolean},
        free:{type: Boolean},
        isActive:{type: Boolean},

    },
    {timestamps:true},
);
module.exports = mongoose.model("Control",ControlSchema);