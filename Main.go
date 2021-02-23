package main

import (
	"fmt"
	"math"
	"strconv"
	"strings"
	"sync"
)

func checkPrime(number int) bool {
	isPrime := true

	for i := 2; i <= int(math.Sqrt(float64(number))); i++ {
		if number%i == 0 {
			isPrime = false
			break
		}
	}
	return isPrime
}

func checkRange(n1, n2 int, wg *sync.WaitGroup, ch chan int) []int {
	list := []int{}
	defer wg.Done()
	for i := n1; i < n2; {
		checkPrime(i)
		if checkPrime(i) {
			println(i)
			list = append(list, i)
		}
		i++
	}
	fmt.Printf("list complete, amount: %d", len(list))
	return list
}

func main() {

	fmt.Println("Put ur numbers and threads")
	fmt.Println("Example: 10-100-10")

	var input string = "5-25-2"
	var boop []string = strings.Split(input, "-")

	n1, err := strconv.Atoi(boop[0])
	n2, err := strconv.Atoi(boop[1])
	nthreads, err := strconv.Atoi(boop[2])
	if err != nil {
		fmt.Println("Please input correctly")
	}

	var wg sync.WaitGroup
	ch := make(chan int)
	for i := 0; i < nthreads; i++ {
		fmt.Printf("thread %d starting\n", i+1)
		wg.Add(1)
		go checkRange(n1+1, n2, &wg, ch)
	}
	go func() {
		wg.Wait()
		close(ch)
	}()

	var list []int
	for k := range ch {
		list = append(list, k)
	}
	fmt.Printf("this is the end, %d primes", len(list))

}
