module('validation');
test('episode', function () {
    ok(q.isO(gb), 'gb exists');
    ok(q.isF(gb.validEpisode), 'episode validator exists');
    ok(gb.validEpisode() === false, 'false by default');
    ok(gb.validEpisode({
        title: '',
        body: '',
        choices: []
    }) === true, 'accets a well formed episode')
    ok(gb.validEpisode({
        title: '',
        body: '',
        choices: [1]
    }) === true, 'accets a well formed episode')
    ok(gb.validEpisode({
        title: '',
        body: '',
        choices: [1, 'a']
    }) === false, 'rejects a badly formed episode choice array')
});
test('story', function () {
    ok(q.isF(gb.validStory), 'story validator exists');
    ok(gb.validStory() === false, 'rejects bad args');
    ok(gb.validStory([{
        title: '',
        body: '',
        choices: []
    }]) === true, 'a story of one valid episode validates')
    ok(gb.validStory([{
        title: '',
        body: '',
        choices: []
    }, {
        title: '',
        body: '',
        choices: []
    }]) === true, 'a story of multiple valid episodes validates')
});
