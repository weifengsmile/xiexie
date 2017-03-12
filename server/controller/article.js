var articleScheMa = require('../model/article.js');  // 引入的model，可用来操作数据库和生成Entity

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var db1 = mongoose.createConnection('mongodb://127.0.0.1:27017/xiexie');
var article = db1.model('article', articleScheMa);
db1.on('connected', function () {
    console.log('Mongoose1 connection success');
});
db1.on('error', function (err) {
    console.log('connection1 error');
});
// exports.list = function(req, res) {
//     user.find(function (err, user) {
//         console.log(';');
//         res.json(user);
//     });
// };

exports.add = function(req, res) {
    console.log(req.body)
    if(!req.body.hasOwnProperty('title') ||
        !req.body.hasOwnProperty('content')) {
        res.statusCode = 400;
        return res.send('Error 400: Post syntax incorrect.');
    }
    // 实例化新添加的内容
    var newArticle = {
        title : req.body.title,
        content : req.body.content
    };
    var ArticleEntity = new article(newArticle);
    ArticleEntity.save();
    res.json('article success');
};

// exports.get = function(req, res){
//     var q = article.find({_id:req.params.id}, function(err, article) {
//         if (err) {
//             console.log("查询文章错误！");
//         };
//         console.log(article);
//         res.json(article)
//     })
// };


// exports.delete = function(req, res){
//   Comment.remove({_id: req.params.id},function (err) {
//     if (err) {
//       console.log(err);
//     };
//     Comment.find(function (err, comment) {
//       res.json(comment);
//     });
//   });
// };


//
//
// exports.commentList = function (req, res) {
//     comment.find({articleId: req.params.id.toString()}, function (err, comments) {
//         if (err) {
//             console.log("获取评论出错");
//         }
//         res.json(comments);
//     })
// };
// exports.commentAdd = function (req, res, next) {
//     if(!req.body.hasOwnProperty('author') ||
//         !req.body.hasOwnProperty('text') ||
//         !req.body.hasOwnProperty('articleId')) {
//         res.statusCode = 400;
//         return res.send('Error 400: Post syntax incorrect.');
//     }
//     // 实例化新添加的内容
//     var newComment = {
//         articleId: req.body.articleId,
//         author : req.body.author,
//         text : req.body.text
//     };
//     var commentEntity = new comment(newComment);
//     /*
//      *  在save的成功回调函数里使用中间件next，再次执行commentList，获取完整的数据
//      */
//     commentEntity.save(function () {
//         next();
//     });
// };