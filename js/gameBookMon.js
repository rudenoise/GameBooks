'use strict';
exports.gameBookMonad = (function () {
    // create a "monad" that handles Game Books using
    // the schema described ../json/gb1.json
    var tokenise, read, replaceRE, trimRE, sE, createPossiblity;
    replaceRE = new RegExp('[^a-z]', 'g');
    trimRE = new RegExp('[\\_]{2,}|[\\_]{1,}$', 'g');
    sE = function () {};

    read = function (story, sideEffect, index, previous) {
        // a named recursive function that returns
        // an object encapsulating story state
        // inside functions that offer possibilities

        // default current episode index to story start point
        index = index || 0;
        sideEffect = sideEffect || sE;

        // set-up variables including
        // the episode object
        var episode = {}, l, choice, title;

        l = story[index].choices.length;

        while (l > 0) {
            l -= 1;
            // loop episode options
            choice = story[index].choices[l];
            title = tokenise(story[choice].title);

            // decorate the episode with the next story option
            episode[title] = createPossiblity(
                story,
                sideEffect,
                choice,
                episode
            );
        }

        // provide a way to go back
        episode.back = function (overrideSideEffect) {
            // a replacement side effect may be inserted at any juncture
            sideEffect = overrideSideEffect || sideEffect;
            // default previous episode to story start point
            // otherwise pass back the previous episode
            return previous || read(story, sideEffect);
        };
        // fire the side effect, assuming there is one
        // pass in the original episode JSON and episode possibilities
        sideEffect(story[index], episode);
        return episode;
    };

    tokenise = function (string) {
        // take a string and return a camel-cased token string
        // 'Oh hi.' -> 'ohHi'
        var i, l;
        // remove unwanted chars and trim
        string = string
            .toLowerCase()
            .replace(replaceRE, '_')
            .replace(trimRE, '').split('_');
        l = string.length;
        // slice and join to camelCase 
        while (l > 1) {
            l -= 1;
            string[l] = string[l]
                .charAt(0)
                .toUpperCase() + string[l].slice(1);
        }
        return string.join('');
    };

    createPossiblity = function (story, sideEffect, choice, episode) {
        // a "possibility" is a potential next step/option/decision
        // close over the arguments' scope
        return function (overrideSideEffect) {
            // a replacement side effect may be inserted at any juncture
            sideEffect = overrideSideEffect || sideEffect;
            // use the possibility
            return read(story, sideEffect, choice, episode);
        };
    };
    return read;
}());
