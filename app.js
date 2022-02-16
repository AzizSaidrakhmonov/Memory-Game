const cards = document.querySelectorAll(".memory-card");

let numberOfAttempts = document.querySelector(".attempt-counter");

let modal = document.querySelector(".memory-game__modal-wrapper");
let new_game_btn = document.querySelector("#newGame")
let timeCountdown = document.querySelector(".timer")

let userResults = [];
let counter = 0;
let score = 0;
let attempt = 0;
let gameState;
let firstCardAttempt;
let secondCardAttempt;
let first; 
let second;
let spendingTime;

new_game_btn.addEventListener('click', () => {
  modal.classList.remove("active");
  document.body.style.overflow = "none"; 
  this.newGame()
  setTimeout(() => {
    this.shuffleCards()
    timeCountdown.innerHTML = ''
    attempt = 0
    score = 0
  }, 200)
})

let cardDetails = [
  {id: 1, alt: 'js', dataImage: 'js'},
  {id: 2, alt: 'react', dataImage: 'react'},
  {id: 3, alt: 'sass', dataImage: 'sass'},
  {id: 4, alt: 'vue', dataImage: 'vue'},
  {id: 5, alt: 'angular', dataImage: 'angular'},
  {id: 6, alt: 'bootstrap', dataImage: 'bootstrap'},
  {id: 7, alt: 'js', dataImage: 'js'},
  {id: 8, alt: 'react', dataImage: 'react'},
  {id: 9, alt: 'sass', dataImage: 'sass'},
  {id: 10, alt: 'vue', dataImage: 'vue'},
  {id: 11, alt: 'angular', dataImage: 'angular'},
  {id: 12, alt: 'bootstrap', dataImage: 'bootstrap'},
]

let randImgArr = []
window.onload = function(){
  shuffleCards();
}

function newGame() {
  for (let i = 0; i < cards.length; i++) {
    cards[i].classList.remove("rotate")
    cards[i].style.removeProperty('pointer-events')

    numberOfAttempts.innerText = "0";
  }
}

function shuffleCards() {
  let randSet;
  let randomImgPosition = Math.round((Math.random() +1) * 6)
  for (let i = 0; i < cards.length; i++) {       
        randomImgPosition = Math.round((Math.random() + 1) * 6)
        randImgArr.push(randomImgPosition);
        randSet = new Set(randImgArr);
  }

  for (let i = 1; i < 13; i++) {
    if(!randSet.has(i)){
      randSet.add(i)
    }
  }
  let randomImgSrc = [...randSet]

  for (let i = 0; i < cards.length; i++) { 
    let childElement = cards[i].children;
    for(let j=0; j<childElement.length; j++){
      if(childElement[j].classList.contains('front-face')){ 
        imgSrc = `./img-${randomImgSrc[i]}.png`
        let imgAlt
        let dataImage
        cardDetails.forEach((element) => {
          if(element.id === randomImgSrc[i]){
            imgAlt = element.alt,
            dataImage = element.dataImage
            childElement[j].setAttribute('alt', imgAlt)
            cards[i].setAttribute("data-image", dataImage);
          } 
        })
        childElement[j].setAttribute('src', imgSrc)
      }
    }
  }
  randImgArr = []
}

function gameTimer(countDownDate) {
  let timer = setInterval(function () {
    // Get start date and time
    let now = new Date().getTime()
    // Find the distance between start time and now
    let distance = now - countDownDate
    // Time calculations for days, hours, minutes and seconds
    let days = Math.floor(distance / (1000 * 60 * 60 * 24))
    let hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    )
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    let seconds = Math.floor((distance % (1000 * 60)) / 1000)
    // Save result
    
     spendingTime =
      (days > 0 ? days + 'd ' : '') +
      (hours > 0 ? hours + 'h ' : '') +
      (minutes > 0 ? minutes + 'm ' : '') +
      seconds +
      's'
    timeCountdown.innerHTML = spendingTime
    // If the game is over, stop
    if (gameState == 'ended') {
      clearInterval(timer)
    }
  }, 500)
}

for (let i = 0; i < cards.length; i++) {
  cards[i].addEventListener("click", function () { 
    gameState = 'running'
    if(gameState == 'running' && timeCountdown.innerHTML == ''){
      gameTimer(Date.now())
    }
    this.classList.add("rotate");

    attempt++;
    numberOfAttempts.innerText = attempt; 
    if (counter === 0) {
      firstCardAttempt = cards[i].getAttribute("data-image");   
      first = i;
      counter++;
      cards[first].style.pointerEvents = 'none'
    } else if (counter === 1) {
      secondCardAttempt = cards[i].getAttribute("data-image")
      second = i
      counter = 0
      cards[second].style.pointerEvents = 'none'
    }

    
   
    if (first !== undefined && second !== undefined){ 
      if (firstCardAttempt !== secondCardAttempt){
        setTimeout(function(){
          cards[first].classList.remove('rotate')
          cards[second].classList.remove('rotate')

          cards[first].style.pointerEvents = ''
          cards[second].style.pointerEvents = ''

          firstCardAttempt = undefined
          secondCardAttempt = undefined
          first = undefined
          second = undefined
        }, 500)
      } else {
          setTimeout(()=>{
            score++
            
            cards[first].style.pointerEvents = 'none'
            cards[second].style.pointerEvents = 'none'

            first = undefined
            second = undefined
             if(score === 6){
              timeCountdown.innerHTML = '' 
              gameState = 'ended'
              modal.classList.add("active");
              document.body.style.overflow = "auto"; 
              userResults.push({
                time: spendingTime,
                attempts: attempt 
              })
              console.log(userResults);
            }
          }, 500)
      }
    } 
  });
}