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
	x:= 1
	// write the title
	writeText(story[1].Title, 1, x)
	// write the body
	x = x + 2
	writeText(story[1].Body, 1, x)
	// write the opitons
	x = x + 2
	for _, choice := range story[1].Choices {
		writeText(strconv.FormatFloat(choice, 'g', -1, 64), 1, x);
		x++
	}
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

func writeText(text string, x, y int) {
	for i := 0; i < len(text); i++ {
		termbox.SetCell(x, y, rune(text[i]), termbox.ColorYellow, termbox.ColorDefault)
		x++
	}
}
