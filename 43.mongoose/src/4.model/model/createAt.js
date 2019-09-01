module.exports = function (schema) {
    schema.add({
        lastModify: Date
    });
    schema.pre('save', function (next) {
        this.lastModify = new Date();
        next();
    });
}