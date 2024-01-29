import { tarotCards } from "../tarotCards.js"

const mainEl = document.getElementById("main")
const dialog = document.querySelector("dialog")

mainEl.innerHTML = tarotCards
	.map((card, index) => {
		return `
  <div>
    <img src="./falDictionary/tarot.jpg" id="tarot${index}" data-card='${card}' class='cardImg'></img>
    <p class="cardText">${card}</p>
  </div>
  `
	})
	.join("")

document.addEventListener("click", (e) => {
	if (e.target.dataset.card) {
		dialog.innerHTML = `
						<p class="text-center">${e.target.dataset.card}</p>
						<p>Buraya kartların açıklamaları yazılacak</p>
						<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
						officiis aperiam repellat suscipit aliquid. Dolore, explicabo saepe
						autem asperiores quisquam eius ut enim debitis, quo nobis eligendi
						suscipit, dicta sunt.
						</p>
						`

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
		dialog.close()
	}
})
