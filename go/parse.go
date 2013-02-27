package gb

type Episode struct {
	Title string
	Body string
	Choices []float64
}

type Story []Episode
