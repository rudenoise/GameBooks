var gb = (function (gb) {
    var isArrayOfInts;
    gb.validEpisode = function (episode) {
        return q.isO(episode) &&
            q.isS(episode.title) &&
            q.isS(episode.body) &&
            q.isA(episode.choices) &&
            isArrayOfInts(episode.choices);
    };
    gb.validStory = function (story) {
        return q.isA(story) && isArrayOfEpisodes(story);
    };
    // privates
    isArrayOfInts = function (arr) {
        return arr.length === 0 ?
            true :
            q.isN(q.h(arr)) ?
                isArrayOfInts(q.t(arr)) : false;
    };
    isArrayOfEpisodes = function (arr) {
        return arr.length === 0 ?
            true :
            gb.validEpisode(q.h(arr)) ?
                isArrayOfEpisodes(q.t(arr)) : false;
    };
    return gb;
}(gb || {}));
