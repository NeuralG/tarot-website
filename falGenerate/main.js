import { tarotCards } from "../tarotCards.js"

const mainEl = document.getElementById("main")
const dialog = document.querySelector("dialog")

//TAKEN FROM https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array <3
function shuffle(array) {
	let currentIndex = array.length,
		randomIndex

	// While there remain elements to shuffle.
	while (currentIndex > 0) {
		// Pick a remaining element.
		randomIndex = Math.floor(Math.random() * currentIndex)
		currentIndex--

		// And swap it with the current element.
		;[array[currentIndex], array[randomIndex]] = [
			array[randomIndex],
			array[currentIndex],
		]
	}

	return array
}

const randomizedArray = shuffle(tarotCards)
let selectedCardsArray = []

mainEl.innerHTML = randomizedArray
	.map((card) => {
		return `
  <div>
    <img src="./falDictionary/card.png" data-card='${card.name}' data-desc='${card.description}' class='cardImg'></img>
  </div>
  `
	})
	.join("")

document.addEventListener("click", (e) => {
	if (e.target.dataset.card && selectedCardsArray.length != 3) {
		if (!selectedCardsArray.includes(e.target)) {
			selectedCardsArray.push(e.target)
			e.target.classList.add("selected")
		} else {
			selectedCardsArray = selectedCardsArray.filter(
				(card) => card != e.target
			)
			e.target.classList.remove("selected")
		}
	}
	if (selectedCardsArray.length === 3) {
		dialog.innerHTML = selectedCardsArray
			.map((card, index) => {
				return `
                <div class="${index !== 2 && "mb-5"}">
                    <p class="text-center text-2xl font-bold">${
						card.dataset.card
					}</p>
                    <p class="text-center">${card.dataset.desc}</p>
                </div>
            `
			})
			.join(" ")
		dialog.showModal()
	}
})

dialog.addEventListener("click", (e) => {
	const dialogDimensions = dialog.getBoundingClientRect()
	if (
		e.clientX < dialogDimensions.left ||
		e.clientX > dialogDimensions.right ||
		e.clientY < dialogDimensions.top ||
		e.clientY > dialogDimensions.bottom
	) {
		location.reload()
	}
})
