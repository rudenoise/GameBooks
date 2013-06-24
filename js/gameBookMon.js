exports.gameBookMonad = (function () {
    // create a "monad" that handles Game Boks using
    // the schema described
    var tokenise, read,
        replaceRE = new RegExp('[^a-z]', 'g'), 
        trimRE = new RegExp('[\_]{2,}|[\_]{1,}$', 'g');
    
    read = function (story, index, previous) {
        // a named recursive function that returns
        // an object encapsulating state and
        // provides a chained API 
        
        // default current episode index to story start point
        index = index || 0;

        // set-up varilables including
        // the episode object
        var episode = {}, l, choice, title;
        
        l = story[index].choices.length;
        
        while (l > 0) {
            l -= 1;
            // loop episode options
            choice = story[index].choices[l];
            title = tokenise(story[choice].title);

            // decorate the episode with the next story option
            episode[title] = (function (story, choice, episode) {
                // encapsulate scope
                return function () {
                    // progress with story option
                    return read(story, choice, episode);
                };
            }(story, choice, episode));
        }

        // provide a way to go back
        episode.back = function () {
            // default previous episode to story start point
            return previous || read(story);
        };
        return episode;
    };
    
    tokenise = function (string) {
        // take a string and return a camel-cased token string
        // 'Oh hi.' -> 'ohHi'
        var i, l;
        string = string
            .toLowerCase()
            .replace(replaceRE, '_')
            .replace(trimRE, '').split('_');
        l = string.length;
        while (l > 1) {
            l -= 1;
            string[l] = string[l]
                .charAt(0)
                .toUpperCase() + string[l].slice(1);
        }
        return string.join('');
    };
    return read;
}());

