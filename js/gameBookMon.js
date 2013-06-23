exports.gameBookMonad = (function () {
    var read = function (story, index) {
        index = index || 0;
        var episode = {}, i, l, choice, title;
        l = story[index].choices.length;
        for (i = 0; i < l; i += 1) {
            choice = story[index].choices[i];
            title = story[choice].title;
            episode[title] = (function (choice) {
                return function () {
                    return read(story, choice);
                };
            }(choice));
        }
        return episode;
    };
    return read;
}());

