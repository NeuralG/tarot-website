import { tarotCards } from "../tarotCards.js"

const mainEl = document.getElementById("main")
const dialog = document.querySelector("dialog")

function render(arr = tarotCards) {
	if (arr.length === 0) {
		mainEl.innerHTML = `
			<p class="col-span-full text-center text-4xl">Aradığınız kart bulunamamıştır</p>
			
		`
	} else {
		mainEl.innerHTML = arr
			.map((card) => {
				return `
<div class="grid">
	<img src="${card.src}" data-card='${card.name}' data-desc='${card.description}' class='cardImg'></img>
	<p class="justify-self-center text-center text-[0.7rem] font-bold hover:cursor-pointer hover:text-[#2d2a2a] sm:text-[0.85rem] lg:text-[1rem]">${card.name}</p>
</div>
`
			})
			.join("")
	}
}

render()

document.addEventListener("click", (e) => {
	if (e.target.dataset.card) {
		dialog.innerHTML = `
						<p class="text-center text-2xl font-bold">${e.target.dataset.card}</p>
						<p class="text-center">${e.target.dataset.desc}</p>
						`

		dialog.showModal()
	} else if (e.target.previousElementSibling.dataset.card) {
		dialog.innerHTML = `
						<p class="text-center text-2xl font-bold">${e.target.previousElementSibling.dataset.card}</p>
						<p class="text-center">${e.target.previousElementSibling.dataset.desc}</p>
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

document.getElementById("search").addEventListener("input", function (e) {
	render(
		tarotCards.filter((card) => {
			return card.name
				.toLowerCase()
				.includes(e.target.value.toLowerCase())
		})
	)
})
