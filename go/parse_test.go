package gb

import (
	"errors"
	"fmt"
	"testing"
)

var gbJSON = []byte(`
	[{"title": "hi", "body": "first episode", "choices": [0]}]
`)
var testEpisode = Episode{"hi", "first episode", []float32{0}}

func TestParse(t *testing.T) {
	tGBStory := make(Story, 0)
	tGBStory = append(tGBStory, testEpisode)
	expected := fmt.Sprintf("%s", tGBStory)
	actualStory, err := Parse(gbJSON)
	actualStr := fmt.Sprintf("%s", actualStory)
	if err != nil {
		t.Errorf("\n%s\n", err)
	}
	if expected != actualStr {
		t.Errorf("\nExpected: %s\nActual: %s\n", expected, actualStr)
	}
}

func TestGetEpisode(t *testing.T) {
	expected := fmt.Sprintf("%s", testEpisode)
	parsed, err := Parse(gbJSON)
	if err != nil {
		t.Errorf("\n%s\n", err)
	}
	episode, err := GetEpisode(parsed, 0)
	if err != nil {
		t.Errorf("\n%s\n", err)
	}
	actualEpisode := fmt.Sprintf("%s", episode)
	if actualEpisode != expected {
		t.Errorf("\nExpected: %s\nActual: %s\n", expected, actualEpisode)
	}
	invalidEpisode, err := GetEpisode(parsed, 1)
	if err == nil {
		t.Errorf("\nExpected an error to be raised as index is out of boundsn")
	}
	if invalidEpisode.Title != "" {
		t.Errorf("\nExpected empty episode, got:\n%s\n", invalidEpisode)
	}
	expectedErr := errors.New("Episode 1 is not in this Story")
	if fmt.Sprintf("%s", err) != fmt.Sprintf("%s", expectedErr) {
		t.Errorf("\nBad error message:\n%s\nexpected:\n%s\n", err, expectedErr)
	}
}
