const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const coordinateSchema = new Schema(
    {
        lat : {type : String, required : true},
        lng : {type : String, required : true},
        pucename : {type : String, required : true},
        username : {type : String, required : true}
    },
    {
    timestamps: true,
    });
const Coordinate = mongoose.model('Coordinate', coordinateSchema);

module.exports = Coordinate;