package gb
import(
	"testing"
)

func TestParse(t *testing.T) {
	const gbJSON = `
		[{"title": "hi", "body": "first episode", "choices": [0]}]
	`
	tGBStory := make(Story, 0)
	tGBStory = append(tGBStory, Episode{"hi", "first episode", []float64{0}})
}
