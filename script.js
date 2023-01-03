




const userInput = document.querySelector(".user-input")
const submitBtn = document.querySelector(".submit-btn")
const itemsList = document.querySelector(".items-list")
const events = document.querySelector(".events")
const eventBox = document.querySelector(".event")
const categoryName = document.querySelector("#category")

function fetchEvents() {
    submitBtn.addEventListener("click", () => {
        eventBox.innerHTML = ""
        type = categoryName.value
        city = userInput.value
        
        fetch(`https://api.seatgeek.com/2/events?type=${type}&venue.city=${city}&client_id=` + client_id)
        
            .then((response) => response.json())
            .then((event) => {
                let arr = event.events
                arr.forEach((event) => {
                    createBoxEvent(event)
                    userInput.value = ""
                })
        })
    })
}
fetchEvents()



function createBoxEvent(e) {
    console.log(e)
    const box = document.createElement("div")
    box.className = "box"
    eventBox.appendChild(box)

    const imgBox = document.createElement("img")
    imgBox.className = "imgBox"
    imgBox.src = e.performers[0].image
    box.appendChild(imgBox)

    const detailsBox = document.createElement("div")
    detailsBox.className = "detailsBox"
    box.appendChild(detailsBox)

    const titleBox = document.createElement("div")
    titleBox.className = "titleBox"
    titleBox.textContent = e.title
    detailsBox.appendChild(titleBox)

    const location = document.createElement("div")
    location.className = "location"
    location.innerText = e.venue.name_v2
    detailsBox.appendChild(location)

    const date = document.createElement("div")
    date.className = "date"
    date.innerText = e.datetime_local
    let dateEl = new Date(e.datetime_local)
    let formatedDate = { 
        day:    '2-digit', 
        month:  '2-digit', 
        year:   'numeric',
        hour:   '2-digit', 
        minute: '2-digit',
        hour12: true 
 };
    let dateString = dateEl.toLocaleDateString('en-US', formatedDate)
    console.log(typeof dateString)
    date.innerText = dateString
    detailsBox.appendChild(date)

    price = (e.stats.average_price)
    const purchaseBtn = document.createElement("button")
    purchaseBtn.className = "purchaseBtn"

    if (e.stats.average_price === null) {
        purchaseBtn.innerText = "Buy Tickets"
    } else {
        purchaseBtn.textContent = `Buy Now for only $${price}`
    }
    box.appendChild(purchaseBtn)

    purchaseBtn.onclick = () => {
        window.open(e.url)
    }

    const saveLater = document.createElement("button")
    saveLater.className = "saveLaterBtn"
    saveLater.textContent = "Save for later"
    box.appendChild(saveLater)
}

