exports.gameBookMonad = (function () {
    // create a "monad" that handles Game Boks using
    // the schema described
    var tokenise, read,
        replaceRE = new RegExp('[^a-z]', 'g'), 
        trimRE = new RegExp('[\-]{2,}|[\-]{1,}$', 'g');
    
    read = function (story, index) {
        // a named recursive function that returns
        // an object encapsulating state and
        // provides a chained API 
        
        // default to story start point
        index = index || 0;
        
        // set-up varilables including
        // the episode object
        var episode = {}, i, l, choice, title;
        
        l = story[index].choices.length;
        
        for (i = 0; i < l; i += 1) {
            
            // loop episode options
            choice = story[index].choices[i];
            title = tokenise(story[choice].title);
            
            // decorate the episode with the next story options
            episode[title] = function () {
                // progress with story option
                return read(story, choice);
            };
        }
        return episode;
    };
    
    tokenise = function (string) {
        // take a string and return a token string
        // 'Oh hi.' -> 'oh-hi'
        return string
            .toLowerCase()
            .replace(replaceRE, '-')
            .replace(trimRE, '');
    };
    return read;
}());

