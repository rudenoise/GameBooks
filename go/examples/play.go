package main

import(
	"github.com/rudenoise/GameBooks/go"//gb package
	"flag"
	//"fmt"
	"strconv"
	"io/ioutil"
	"github.com/nsf/termbox-go"
)

func main() {
	defer termbox.Close()
	// read file path
	flag.Parse()
	jsonFilePath := flag.Arg(0)
	// read the file and close, eventuality
	jsonFile, err := ioutil.ReadFile(jsonFilePath)
	if err != nil {
		panic(err)
	}
	// turn it into a story
	story, err := gb.Parse(jsonFile)
	if err != nil {
		panic(err)
	}
	showEpisode(story, 0)
}

func showEpisode(story gb.Story, index int) {
	episode, err := gb.GetEpisode(story, index)
	if err != nil {
		panic(err)
	}
	onScreen(episode)
}

func onScreen(episode gb.Episode) {
	err := termbox.Init()
	if err != nil {
		panic(err)
	}
	termbox.Clear(termbox.ColorDefault, termbox.ColorDefault)
	x:= 1
	// write the title
	writeText(episode.Title, 1, x)
	// write the body
	x = x + 2
	writeText(episode.Body, 1, x)
	// write the opitons
	x = x + 2
	for _, choice := range episode.Choices {
		writeText(strconv.FormatFloat(choice, 'g', -1, 64), 1, x);
		x++
	}
	termbox.Flush()
loop:
	for {
		switch ev := termbox.PollEvent(); ev.Type {
		case termbox.EventKey:
			/*
			if ev.Ch == '3' {
				showEpisode(3)
				break loop
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
