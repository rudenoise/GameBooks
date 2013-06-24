var gbm = require('../gameBookMon.js').gameBookMonad,
    story = require('../../json/gb1.json');

exports.coreLoop = function (test) {
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
        gbm(story).hasOwnProperty('wake_up'),
        'the object has the choices imprinted');
    test.equal(
        toString.call(gbm(story)['wake_up']),
        '[object Function]',
        'keyed function for story choice');
    test.ok(
        gbm(story).wake_up()
            .hasOwnProperty('jump_out_of_the_window'),
        'the object has the  first choice imprinted');
    test.ok(
        gbm(story).wake_up()
            .hasOwnProperty('brush_teeth'),
        'the object has the choices imprinted');
    test.ok(
        gbm(story).wake_up().brush_teeth()
            .hasOwnProperty('wake_up'),
        'the chained function calls recurse and hold state');
    test.done();
};
