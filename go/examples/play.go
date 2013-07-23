package main

import(
	"github.com/rudenoise/GameBooks/go"//gb package
	"flag"
	//"fmt"
	"io/ioutil"
	"github.com/nsf/termbox-go"
)

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
	story, err := gb.Parse(jsonFile)
	if err != nil {
		panic(err)
	}
	onScreen(story)
	//fmt.Println(gb.GetEpisode(story, 0))
}

func onScreen(story gb.Story) {
	err := termbox.Init()
	if err != nil {
		panic(err)
	}
	defer termbox.Close()
	termbox.Clear(termbox.ColorDefault, termbox.ColorDefault)
	// write the title
	writeText(story[0].Title, 0)
	// write the body
	writeText(story[0].Body, 2)
	termbox.Flush()
loop:
	for {
		switch ev := termbox.PollEvent(); ev.Type {
		case termbox.EventKey:
			switch ev.Key {
			case termbox.KeyEsc:
				break loop
			}
		}
	}
}

func writeText(text string, y int) {
	for x := 0; x < len(text); x++ {
		termbox.SetCell(x, y, rune(text[x]), termbox.ColorYellow, termbox.ColorDefault)
	}
}
