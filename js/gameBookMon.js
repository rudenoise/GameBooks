exports.gameBookMonad = (function () {
    var gbm, read;
    gbm = function (story) {
        return read(story, 0)
    };
    read = function (story, index) {
        var episode = {}, i, l, choice, title;
        episode.read = function () {
            return story[index].body;
        };
        l = story[index].choices.length;
        for (i = 0; i < l; i += 1) {
            choice = story[index].choices[i];
            title = story[choice].title;
            console.log(title, choice, i);
            episode[title] = function () {
                return read(story, choice)();
            };
            //episode[title] = read(story, choice);
        }
        return episode;
    };
    return gbm;
}());

