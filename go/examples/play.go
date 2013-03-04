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
	termbox.SetCell(0, 0, rune("H"[0]), termbox.ColorYellow, termbox.ColorDefault)
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
