let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;

/*
*   电影分类
* */
let movieField = {
    cn_name: {          //中文name
        type: String,
        required: true,
        trim: true
    },
    en_name: {          //英文
        type: String,
        required: true,
        trim: true
    },
    description:String,
    addedBy: ObjectId,
    created: {
        type: Date,
        default: Date.now
    }
};

let movieSchema = new Schema(movieField);

mongoose.model('Movie', movieSchema);