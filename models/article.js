var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

let articleField = {
  title: { //标题
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  subTitle: { //子标题
    type: String,
    length: 200,
    required: false,
    trim: true
  },
  author: { //作者
    type: String,
    required: false,
    default: '佚名',
    trim: true
  },
  editor: {
    type: ObjectId,
    required: true
  },
  createdDate: { //创建日期
    type: Date,
    default: Date.now
  },
  publishDate: { //发布日期
    type: Date
  },
  htmlContent: { //内容 html
    type: String,
    trim: true
  },
  textContent: { //内容 纯文本
    type: String,
    trim: true
  },
  source: { //来源
    type: String,
    trim: true
  }
};

let articleSchema = new Schema(articleField);

// let articleModel = db.model('article', articleSchema);

mongoose.model('Article', articleSchema);
