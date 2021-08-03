const BASE_URL = `https://raw.githubusercontent.com/Dane-Dawson/json-server-collection/main/bob-ross-paintings/db.json`
// On page load call the getName function which asks for the current users name with a window prompt
document.addEventListener("DOMContentLoaded", getName)
getPaintings()
addPaintings()

function getPaintings() {
    let randomNumber = (Math.floor(Math.random() * 403) - 10)    
    fetch(BASE_URL)
    .then(response => response.json())
    .then(data => renderPaintings(data.paintings.slice(randomNumber, randomNumber + 10)))
}

function renderPaintings(data) {
    data.map(painting => {
        const paintingContainer = document.createElement('div')
        paintingContainer.setAttribute('id', painting.id)
        document.getElementById('collection').setAttribute('class', 'gridWrap')
        document.getElementById('liked-paintings').setAttribute('class', 'gridWrap')
        document.getElementById('discarded-paintings').setAttribute('class', 'gridWrap')
        const title = painting.painting_title
        paintingContainer.innerHTML = `
        <h3 id="${painting.id}">${title}</h3>
        <img id="${painting.id}" class = "img" src="${painting.img_src}"</img>
        <br>
        <div id="wrapper">
        <button type="button" class="liked" id="Liked ${painting.id}">I'll Take It!</button><button type="button" class="discarded" id="Discarded ${painting.id}">I'll Pass.</button>
        </div>
        `
        document.getElementById('collection').append(paintingContainer)
    })
    buttonClicks()
    clickOnPictures()
}

function getName() {
    // window prompt takes the user input and interpolates value into multiple gallery titles
    let name = window.prompt("Let's build your personal art gallery, please enter your name to begin.")
    document.getElementById('gallery').innerHTML += `${name}'s Personal Gallery`
    document.getElementById('take to auction').innerHTML += `${name}'s taking these to the Auction House!`
}

function buttonClicks() {
    // event listeners are added to each button and passes that event into a function that sorts the paintings 
    const buttons = document.querySelectorAll('.liked, .discarded')
    buttons.forEach(button => {
        button.addEventListener('click', event => sortPaintings(event))
    })
}

function sortPaintings(event) {
    // compare event.target.id with div id's
    // if id's match, move div contents to corresponding div
    const paintingContainer = document.getElementById('collection')
    const addPaintingsButton = document.getElementById('add-paintings')
    // extract numbers from a string
    let index = event.target.id.match(/\d+/g).map(Number)
    const div = document.getElementById(index)
    likedCollection = document.getElementById('liked-paintings')
    discardedCollection = document.getElementById('discarded-paintings')
    if (event.target.id.includes('Liked')) {
        likedCollection.append(div)
    } else if (event.target.id.includes('Discarded')) {
            discardedCollection.append(div)
        }
}

function clickOnPictures() {
    const picture = document.querySelectorAll('img')
    picture.forEach(thumbnail => {
        thumbnail.addEventListener('click', event => enlargePictures(event))
    })
}

function enlargePictures(event) {
    console.log(event.target.src)
    // Get the modal
    const modal = document.getElementById("myModal");
    // Get the image and insert it inside the modal
    const modalImg = document.getElementById('modal-image')
    // const captionText = document.getElementById("caption");
    modal.style.display = "block";
    modalImg.src = event.target.src;
    // Get the <span> element that closes the modal
    const span = document.getElementsByClassName("close")[0];
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
    modal.style.display = "none";
    }
}

function addPaintings() {
    const paintingContainer = document.getElementById('collection')
    const addPaintingsButton = document.getElementById('add-paintings')
    // add event listener to the button to add more pictures
    addPaintingsButton.addEventListener('click', () => getPaintings())
    // add event listener to the sorting section and if there are no pictures to sort make button visible
    paintingContainer.addEventListener('click', () => {
    if (paintingContainer.childElementCount === 0) {
        addPaintingsButton.style.visibility = "visible"
        }
        else if (paintingContainer.childElementCount > 0){
            addPaintingsButton.style.visibility = "hidden"

        }
    })
}