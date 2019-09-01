let mongoose = require('mongoose');
let conn = mongoose.createConnection('mongodb://127.0.0.1/zfpx');
//1.先定义学生模型并传入学生的Schema
let Student = conn.model('Student', new mongoose.Schema({
    name: String
}))
let Score = conn.model('Score', new mongoose.Schema({
    stuid: {
        type: mongoose.Schema.Types.ObjectId,//对象ID类型
        ref: 'Student' //引用 我是一个外键，我引用的是哪个集合的主键
    },
    grade: Number
}));
/**
Student.create({ name: 'zfpx' }).then(function (student) {
    console.log(student);
    return Score.create({ stuid: student._id, grade: 100 })
}).then(score => {
    console.log(score);
});
 */
/**
{ _id: 5ae539e281e33e216016d8f5, name: 'zfpx', __v: 0 } student
{ _id: 5ae539e381e33e216016d8f6,stuid: 5ae539e281e33e216016d8f5,__v: 0 } score
*/
//5ae53a27d3f03c216cd699da 分数集合中的一个文档ID 我要查这个文档它对应的学生名称和成绩
/**
Score.findById('5ae53a27d3f03c216cd699da', function (err, score) {
    let { stuid, grade } = score;
    Student.findById(stuid, function (err, student) {
        score.stuid = student;
        let { name } = student;
        console.log(`${name}:${grade}`);
    })
});
*/
//populate填充的意思，把集合文档中的一个外键转换成对应的文档
Score.findById('5ae53a27d3f03c216cd699da').populate('stu.stuid').populate('courseid').exec(function (err, doc) {
    console.log(doc);
    console.log(`${doc.stuid.name}:${doc.grade}`);
});

