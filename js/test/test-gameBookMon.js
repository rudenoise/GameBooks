'use strict';
var gbm = require('../gameBookMonad.js').gameBookMonad,
    story = require('../../json/gb1.json');

exports.coreLoop = function (test) {
    var toString = Object.prototype.toString;
    test.equal(
        toString.call(gbm),
        '[object Function]',
        'gbm is a function'
    );
    test.equal(
        toString.call(gbm(story)),
        '[object Object]',
        'first story episode is an Object'
    );
    test.ok(
        gbm(story).hasOwnProperty('wakeUp'),
        'the object has the choices imprinted'
    );
    test.equal(
        toString.call(gbm(story).wakeUp),
        '[object Function]',
        'keyed function for story choice'
    );
    test.ok(
        gbm(story).wakeUp()
            .hasOwnProperty('jumpOutOfTheWindow'),
        'the object has the  first choice imprinted'
    );
    test.ok(
        gbm(story).wakeUp()
            .hasOwnProperty('brushTeeth'),
        'the object has the choices imprinted'
    );
    test.ok(
        gbm(story).wakeUp().brushTeeth()
            .hasOwnProperty('wakeUp'),
        'the chained function calls recurse and hold state'
    );
    test.ok(
        gbm(story)
            .wakeUp()
            .jumpOutOfTheWindow()
            .hasOwnProperty('keepEyesClosed'),
        '3 deep'
    );
    test.done();
};

exports.history = function (test) {
    test.ok(
        gbm(story).hasOwnProperty('back'),
        'all episodes can go back'
    );
    test.ok(
        gbm(story).back().hasOwnProperty('wakeUp'),
        'calling back, at start, returns start'
    );
    test.ok(
        gbm(story).wakeUp().hasOwnProperty('back'),
        'all episodes can go back'
    );
    test.ok(
        gbm(story)
            .wakeUp()
            .back()
            .hasOwnProperty('wakeUp'),
        'one forward, one back'
    );
    test.ok(
        gbm(story)
            .wakeUp()
            .jumpOutOfTheWindow()
            .back()
            .hasOwnProperty('jumpOutOfTheWindow'),
        'two forward, one back'
    );
    test.ok(
        gbm(story)
            .wakeUp()
            .jumpOutOfTheWindow()
            .keepEyesClosed()
            .back()
            .hasOwnProperty('keepEyesClosed'),
        'three forward, two back'
    );
    test.ok(
        gbm(story)
            .wakeUp()
            .jumpOutOfTheWindow()
            .keepEyesClosed()
            .back()
            .back()
            .hasOwnProperty('jumpOutOfTheWindow'),
        'three forward, two back'
    );
    test.ok(
        gbm(story)
            .wakeUp()
            .jumpOutOfTheWindow()
            .keepEyesClosed()
            .back()
            .back()
            .back()
            .hasOwnProperty('wakeUp'),
        'three forward, three back'
    );
    test.ok(
        gbm(story)// -> 0 A first...
            .wakeUp()// 0 -> 1 Wake
            .brushTeeth()// 0 -> 1 -> 3 Brush
            .wakeUp()//  0 -> 1 -> 3 -> 1 Wake
            .hasOwnProperty('jumpOutOfTheWindow'),
        'a complicated path'
    );
    test.done();
};
exports.sideEffects = function (test) {
    test.expect(17);
    var sideEffectVar = 0;
    gbm(story, function () {
        test.ok(true, 'side effects are run');
    });
    gbm(story).wakeUp(function (episodeAtIndex, episodeClosures) {
        test.ok(true, 'overide side effect');
        test.ok(episodeAtIndex.hasOwnProperty('title'));
        test.ok(episodeClosures.hasOwnProperty('brushTeeth'));
    });
    gbm(
        story,
        function () {
            test.ok(true, 'I should fire at every step of the story');
            sideEffectVar = 1;
        }
    ).wakeUp().brushTeeth(
        function () {
            sideEffectVar += 1;
            test.ok(sideEffectVar > 1);
        }
    ).back();// * 3

    test.ok(sideEffectVar === 3);

    sideEffectVar = 0;
    gbm(
        story,
        function (episode, option) {
            sideEffectVar += 1;
            test.ok(
                episode && option,
                'both episode and option are passed through to the side-effect'
            );
            if (sideEffectVar === 1) {
                test.ok(episode.title === 'A first Game Book written in JSON');
            }
            if (sideEffectVar === 2) {
                test.ok(episode.title === "Wake up.");
            }
            if (sideEffectVar === 3) {
                test.ok(episode.title === 'Jump out of the window.');
            }
            if (sideEffectVar === 4) {
                test.ok(episode.title === "Wake up.");
            }
        }
    ).wakeUp().jumpOutOfTheWindow().back();
    test.done();
};
