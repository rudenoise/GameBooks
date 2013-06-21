var gbm = require('../gameBookMon.js').gameBookMonad,
    story = require('../../json/gb1.json');

exports.stepOne = function (test) {
    var toString = Object.prototype.toString;
    test.equal(toString.call(gbm), '[object Function]');
    test.equal(toString.call(gbm(story).read), '[object Function]');
    test.equal(gbm(story).read(), story[0].body);
    test.equal(toString.call(gbm(story)['Wake up.']), '[object Function]');
    // confused! work out api then flow, scope etc..
    //test.equal(gbm(story).read()['Wake up.'], story[1].body);
    test.done();
};
