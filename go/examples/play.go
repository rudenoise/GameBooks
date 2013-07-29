package main

import (
	"flag"
	"github.com/nsf/termbox-go"
	"github.com/rudenoise/GameBooks/go" //gb package
	"io/ioutil"
	"strconv"
)

var story gb.Story

func main() {
	// read file path
	flag.Parse()
	jsonFilePath := flag.Arg(0)
	// read the file and close, eventuality
	jsonFile, err := ioutil.ReadFile(jsonFilePath)
	if err != nil {
		panic(err)
	}
	// turn it into a story
	story, err = gb.Parse(jsonFile)
	if err != nil {
		panic(err)
	}
	startScreen()
}

func showEpisode(index int) {
	episode, err := gb.GetEpisode(story, index)
	if err != nil {
		panic(err)
	}
	writeEpisode(episode)
}

func writeEpisode(episode gb.Episode) {
	err := termbox.Init()
	if err != nil {
		panic(err)
	}
	termbox.Clear(termbox.ColorDefault, termbox.ColorDefault)
	x := 1
	// write the title
	writeText(episode.Title, 1, x)
	// write the body
	x = x + 2
	writeText(episode.Body, 1, x)
	// write the opitons
	x = x + 2
	for _, choice := range episode.Choices {
		writeText(strconv.FormatFloat(choice, 'g', -1, 64), 1, x)
		x++
	}
	termbox.Flush()
}

func startScreen() {
	defer termbox.Close()
	showEpisode(0)
loop:
	for {
		switch ev := termbox.PollEvent(); ev.Type {
		case termbox.EventKey:
			if ev.Ch == '1' {
				showEpisode(1)
				break
			}
			if ev.Ch == '2' {
				showEpisode(2)
				break
			}
			/*
			if ev.Ch >= '3' && ev.Ch <= '9' {
				index, err := strconv.Atoi(strconv.QuoteRune(ev.Ch))
				if err != nil {
					panic(err)
					//break loop
				}
				showEpisode(index)
				break
			}
			*/
			switch ev.Key {
			case termbox.KeyEsc:
				break loop
			}
		case termbox.EventError:
			panic(ev.Err)
		}
	}
}

func writeText(text string, x, y int) {
	for i := 0; i < len(text); i++ {
		termbox.SetCell(x, y, rune(text[i]), termbox.ColorYellow, termbox.ColorDefault)
		x++
	}
}
