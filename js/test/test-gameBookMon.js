var gbm = require('../gameBookMon.js').gameBookMonad,
    story = require('../../json/gb1.json');

exports.stepOne = function (test) {
    var toString = Object.prototype.toString;
    test.equal(
        toString.call(gbm),
        '[object Function]',
        'gbm is a function');
    test.equal(
        toString.call(gbm(story)),
        '[object Object]',
        'first story episode is an Object');
    test.ok(
        gbm(story).hasOwnProperty('Wake up.'),
        'the object has the choices imprinted');
    test.equal(
        toString.call(gbm(story)['Wake up.']),
        '[object Function]',
        'keyed function for story choice');
    test.ok(
        gbm(story)['Wake up.']()
            .hasOwnProperty('Jump out of the window.'),
        'the object has the  first choice imprinted');
    test.ok(
        gbm(story)['Wake up.']()
            .hasOwnProperty('Brush teeth.'),
        'the object has the choices imprinted');
    test.done();
};
