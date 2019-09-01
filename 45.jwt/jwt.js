let crypto = require('crypto');
function toBase64(str) {
    return new Buffer(str).toString('base64');
}
function sign(input, secret) {
    return crypto.createHmac('sha256', secret).update(input).digest('base64');
}
function encode(payload, secret) {
    let header = { alg: 'sha256', typ: 'JWT' };
    let headerSegment = toBase64(JSON.stringify(header));

    let payloadSegment = toBase64(JSON.stringify(payload));

    let signSegment = sign([headerSegment, payloadSegment].join('.'), secret);
    return [headerSegment, payloadSegment, signSegment].join('.');
}
function fromBase64(input) {
    return new Buffer(input, 'base64').toString();
}
function decode(token, secret) {
    let [headerSegment, payloadSegment, signSegment] = token.split('.');
    if (sign([headerSegment, payloadSegment].join('.'), secret) != signSegment) {
        throw new Error('verify failed');
    }
    let payload = JSON.parse(fromBase64(payloadSegment));
    let exp = payload.exp;
    if (Date.now() / 1000 >= exp) {
        throw new Error('token expired');
    }
    return payload;
}

module.exports = {
    encode,
    decode
}