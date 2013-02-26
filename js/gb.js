var gb = (function (gb) {
    var isArrayOfInts;
    gb.validEpisode = function (episode) {
        return q.isO(episode) &&
            q.isS(episode.title) &&
            q.isS(episode.body) &&
            q.isA(episode.choices) &&
            isArrayOfInts(episode.choices);
    };
    // privates
    isArrayOfInts = function (arr) {
        return arr.length === 0 ? true :
            q.isN(q.h(arr)) ?
                isArrayOfInts(q.t(arr)) : false;
    };
    return gb;
}(gb || {}));
