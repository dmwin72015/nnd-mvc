let articleField = {
    cn_name: {          //标题
        type: String,
        required: true,
        trim: true
    },
    en_name: {          //子标题
        type: String,
        required: true,
        trim: true
    },
    trans_name: {       //译名
        type: String,
        trim: true
    },
    year: String,       //年份
    origin: {           //产地
        type: String,
        default: '未知'
    },
    category: {         //分类
        type: String,
        enum: ['']
    },
    language: String,   //语言
    subtitle: String,   //字幕
    release_date: {     //上映日期
        type: String
    },
    IMDb_score: String,
    IMDb_link: String,
    douban_score: String,   //豆瓣评分
    file_format: String,    //文件格式
    resolution: String,     //分辨率,视屏尺寸
    file_size: {            //文件大小
        val: Number,
        unit: String
    },
    duration: {             //时长
        val: Number,
        unit: String
    },
    director: [String],      //导演
    performer: [String],     //演员
    introduction: String,    //简介
    awards: [String],        //获奖情况
    poster: String,          //海报
    creenshots: [String],    //其他图片
    download_urls: [{        //下载地址
        type: String,
        url: String
    }]
};

module.exports = exports = factoryModel('movie', articleField);