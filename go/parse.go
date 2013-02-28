package gb

import (
	"encoding/json"
	"errors"
	"fmt"
)

type Episode struct {
	Title   string
	Body    string
	Choices []float64
}

type Story []Episode

func Parse(jsonBlob []byte) (Story, error) {
	var story Story
	err := json.Unmarshal(jsonBlob, &story)
	return story, err
}

func GetEpisode(story Story, index int) (Episode, error) {
	var episode Episode
	var err error
	if index > -1 && index < len(story) {
		episode = story[index]
	} else {
		err = errors.New(fmt.Sprintf("Episode %d is not in this Story", index))
	}
	return episode, err
}
