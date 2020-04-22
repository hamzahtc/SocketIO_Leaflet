const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const carteSchema = new Schema(
    {
        pucename : {type : String, required : true},
        username : {type : String, required : true}
    },
    {
    timestamps: true,
    });
const Carte = mongoose.model('Carte', carteSchema);

module.exports = Carte;