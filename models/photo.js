/**
 * Created by mjj on 2017/8/14.
 */
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;

let movieField = {
    title: String,
    description:String,
    images:{
        type:[String]
    },
    comment:{
        type:[String]
    }

};