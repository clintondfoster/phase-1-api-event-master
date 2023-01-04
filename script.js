
const userInput = document.querySelector(".user-input")
const submitBtn = document.querySelector(".submit-btn")
const itemsList = document.querySelector(".items-list")
const events = document.querySelector(".events")
const eventBox = document.querySelector(".event")
const categoryName = document.querySelector("#category")
const popularEvents = document.querySelector(".popular-events")
const container = document.querySelector(".container")
const scoreInput = document.querySelector(".score-input")
const header = document.querySelector(".header")
const body = document.querySelector(".body")
const trendingHeader = document.querySelector(".trending-header")
const on = document.querySelector(".light-mode")
const off = document.querySelector(".dark-mode")
let darkMode = false

function toggle() {
    header.style.backgroundColor = darkMode? "blue" : "black"
    body.style.backgroundColor = darkMode? "white" : "rgb(31, 33, 44)"
    body.style.color = darkMode? "black" : "white"
    trendingHeader.style.color = darkMode? "black" : "white"
    on.style.border = darkMode?   "blue": "2px solid white"
    off.style.border = darkMode?  "2px solid white" : "blue"
    
    darkMode =!darkMode
}
on.addEventListener("click",(e) => {
   toggle()
})
off.addEventListener("click",(e) => {
    toggle()
})

fetch(`https://api.seatgeek.com/2/events?&geoip=true&per_page=3&client_id=` + client_id)
            .then((response) => response.json())
            .then((event) => {
                let arr = event.events
                arr.forEach((event) => {
                    trending(event)
                    userInput.value = ""
        })
    })


function trending(e) {
    console.log(e)
    const trendingContent = document.createElement("div")
    trendingContent.className="trending-content"
    popularEvents.appendChild(trendingContent)

    const trendingEvent= document.createElement("div")
    trendingEvent.className="trending-event"
    trendingContent.appendChild(trendingEvent)
   
    const trendingImg = document.createElement("img")
    trendingImg.className="trending-img"
    trendingImg.src = e.performers[0].image
    trendingEvent.appendChild(trendingImg)

    const trendingInfo = document.createElement("div")
    trendingInfo.classname="trending-info"
    trendingEvent.appendChild(trendingInfo)
    
    const trendingTitle = document.createElement("h2")
    trendingTitle.className="trending-title"
    trendingTitle.textContent = e.title
    trendingInfo.appendChild(trendingTitle)

    function dates() {
        const trendingDate = document.createElement("p")
        trendingDate.className="trending-date"
        trendingDate.textContent = e.datetime_local
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
        trendingDate.innerText = dateString
        trendingInfo.appendChild(trendingDate)
    }
    dates()
    
    const trendingLocation = document.createElement("p")
    trendingLocation.className="trending-location"
    trendingLocation.textContent = e.venue.name_v2
    trendingInfo.appendChild(trendingLocation)

    const priceDiv=document.createElement("div")
    priceDiv.className="price-ranking"
    trendingEvent.appendChild(priceDiv)

    const trendingPrice = document.createElement("p")
    trendingPrice.className="trending-price"
    
    if (e.stats.average_price === null) {
        trendingPrice.textContent = "Check price"
    } else {
        trendingPrice.textContent = "$" + e.stats.average_price
    }
    priceDiv.appendChild(trendingPrice)
    trendingPrice.addEventListener('click', (e) =>{
        window.open(e.url)
    })
        
}


console.log(scoreInput.value)
function fetchEvents() {
    submitBtn.addEventListener("click", () => {
        eventBox.innerHTML = ""
        type = categoryName.value
        city = userInput.value
        score= scoreInput.value
        fetch(`https://api.seatgeek.com/2/events?type=${type}&sort=score.${score}&per_page=8&venue.city=${city}&client_id=` + client_id)
        
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

    const popularity = document.createElement("div")
    popularity.className = "popularity"
    popularity.textContent = "Score: " + parseInt(e.popularity.toFixed(2) * 10) + "/10"
    detailsBox.appendChild(popularity)

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
    
    saveLater.addEventListener("click", () => {
        fetch(`http://localhost:3000/savedItems`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify({
                "img_url":imgBox.src,
                "title":titleBox.textContent,
                "price":e.stats.average_price,
                "reviews": "Write a review"
            })
        })
        .then((response) => response.json())
        .then(data =>createBox(data))

    })
    
 
}
const savedItemsSection = document.querySelector(".saved-items-section")
const savedItemsList = document.querySelector(".saved-items-list")
const savedItemsBtn = document.querySelector(".saved-items")

savedItemsBtn.addEventListener("click", (e) => {
    e.preventDefault()
    fetch("http://localhost:3000/savedItems")
       .then(res => res.json())
       .then(data => {
        console.log(data)
        data.forEach(createBox)
       })
})

function createBox(data) {
    console.log(data)
    const savedDetails = document.createElement("div")
    savedDetails.className = "saved-details"
    savedItemsList.appendChild(savedDetails)
   
    const image = document.createElement("img")
    image.className = "saved-img"
    image.src = data.img_url
    savedDetails.appendChild(image)


    const title = document.createElement("h2")
    title.className = "saved-title"
    title.textContent = data.title
    savedDetails.appendChild(title)

    const price = document.createElement("h2")
        price.className = "saved-price"
        price.innerText = "$" + data.price
        savedDetails.appendChild(price)

    const purchaseBtn = document.createElement("button")
    purchaseBtn.className = "saved-purchaseBtn"
    purchaseBtn.innerText = "Buy"
    savedDetails.appendChild(purchaseBtn)

    const deleteButton = document.createElement("button")
    deleteButton.className = "saved-deleteBtn"
    deleteButton.innerText = "Delete"
    savedDetails.appendChild(deleteButton)

    deleteButton.addEventListener("click", () =>{
        fetch(`http://localhost:3000/savedItems/${data.id}`,{
        method: "DELETE"
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            savedItemsList.removeChild(savedDetails)
            savedItemsList.removeChild(reviews)
        })
    })

    const reviews = document.createElement("div")
    reviews.className = "saved-reviews"
    savedItemsList.appendChild(reviews)
    
    const reviewsHeader = document.createElement("h3")
    reviewsHeader.className = "saved-reviewsHeader"
    reviewsHeader.innerText = "Reviews"
    reviews.appendChild(reviewsHeader)
    
    const review = document.createElement("p")
    review.className = "saved-review"
    review.textContent = `"${data.reviews}"`
    reviews.appendChild(review)
    
    const changeReview = document.createElement("input")
    changeReview.type = "text"
    changeReview.className = "saved-changeReview"
    changeReview.placeholder = "Change Review"
    review.appendChild(changeReview)

    const changeReviewBtn = document.createElement("button")
    changeReviewBtn.className = "saved-changeReviewBtn"
    changeReviewBtn.innerText = "Change"
    reviews.appendChild(changeReviewBtn)
    changeReviewBtn.addEventListener("click", (e) => {
        e.preventDefault()
        fetch(`http://localhost:3000/savedItems/${data.id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify({
                "reviews": changeReview.value
            })
        })
        .then(response => response.json())
        .then(data => { 
            console.log(data)
            review.textContent = `"${data.reviews}"`
            changeReviewBtn.style.visibility = "hidden"
        })
    })

}
