// package gb provides primitives for parsing, presenting
// and interacting with the gb.json Game Book format
package gb

import (
	"encoding/json"
	"errors"
	"fmt"
)

// the basic Type for an Episode in a Game Book
type Episode struct {
	Title   string
	Body    string
	Choices []float32
}

// a Story is a Slice of episodes
type Story []Episode

// Parse attempts to consume a json object assuming its
// in the gb format, otherwise it errors
func Parse(jsonBlob []byte) (Story, error) {
	// create a Story to absorb the gb.json
	var story Story
	// Unmarshal the json
	err := json.Unmarshal(jsonBlob, &story)
	// return the story and error
	return story, err
}

// GetEpisode looks up and returns an Episode
// looking up the episode's index withing the Story
func GetEpisode(story Story, index int) (Episode, error) {
	// create an episode to absorb any values from withing the Story Slice
	var episode Episode
	// create and error to absorb any errors encountered
	var err error
	// check that the index is withing the slice bounaries
	if index > -1 && index < len(story) {
		// it is so extract the Episode
		episode = story[index]
	} else {
		// it isn't, create an error
		err = errors.New(fmt.Sprintf("Episode %d is not in this Story", index))
	}
	return episode, err
}
