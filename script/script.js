const mainContainer = document.querySelector(".main-container")
const slots = document.querySelectorAll(".slot")
const modelEl = document.querySelector(".modal")
const resetGame = document.querySelector(".reset")
const result = modelEl.querySelector("strong")

let marcador = "X"
let jogando = true

resetGame.addEventListener("click", () => {
    slots.forEach(slot => {
        slot.setAttribute("class", "slot")
        slot.textContent = ""
        modelEl.close()
        jogando = true
        marcador = "X"
    })
})

slots.forEach(slot => {
    slot.addEventListener("click", () => {
        if (!jogando) return
        if (slot.classList.contains("marcado")) return

        slot.classList.add("marcado")
        slot.textContent = marcador

        let m = ""
        slots.forEach(s => m += s.textContent || " ")

        let possibilidades = [(m[0] + m[1] + m[2]), (m[3] + m[4] + m[5]), (m[6] + m[7] + m[8]), (m[0] + m[3] + m[6]), (m[1] + m[4] + m[7]), (m[2] + m[5] + m[8]), (m[0] + m[4] + m[8]), (m[2] + m[4] + m[6])]

        let ganhou = false

        possibilidades.forEach(p => {
            let txtGanhou = marcador.repeat(3)
            if (p == txtGanhou) ganhou = true
        })

        if (ganhou) {
            const result = modelEl.querySelector("strong")
            result.textContent = `Jogador ${marcador} ganhou`
            modelEl.showModal()

            jogando = false
        } else if (!m.includes(" ")) {
            result.textContent = "Empate"
            modelEl.showModal()
        }

        marcador == "X" ? marcador = "O" : marcador = "X"

    })
})
