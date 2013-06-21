module('validation');
test('episode', function () {
    ok(q.isO(gameBook), 'gameBook exists');
    ok(q.isF(gameBook.validEpisode), 'episode validator exists');
    ok(gameBook.validEpisode() === false, 'false by default');
    ok(gameBook.validEpisode({
        title: '',
        body: '',
        choices: []
    }) === true, 'accets a well formed episode')
    ok(gameBook.validEpisode({
        title: '',
        body: '',
        choices: [1]
    }) === true, 'accets a well formed episode')
    ok(gameBook.validEpisode({
        title: '',
        body: '',
        choices: [1, 'a']
    }) === false, 'rejects a badly formed episode choice array')
});
test('story', function () {
    ok(q.isF(gameBook.validStory), 'story validator exists');
    ok(gameBook.validStory() === false, 'rejects bad args');
    ok(gameBook.validStory([{
        title: '',
        body: '',
        choices: []
    }]) === true, 'a story of one valid episode validates')
    ok(gameBook.validStory([{
        title: '',
        body: '',
        choices: []
    }, {
        title: '',
        body: '',
        choices: []
    }]) === true, 'a story of multiple valid episodes validates')
});
