'use strict';

const state = [];
let roundsOfVoting = 25;

function Image(name, source) {
  this.name = name;
  this.timesClicked = 0;
  this.timesShown = 0;
  this.source = source;
  state.push(this);
}

new Image('bag','imgs/bag.jpg');
new Image('banana','imgs/banana.jpg');
new Image('bathroom','imgs/bathroom.jpg');
new Image('boots','imgs/boots.jpg');
new Image('breakfast','imgs/breakfast.jpg');
new Image('bubblegum','imgs/bubblegum.jpg');
new Image('chair','imgs/chair.jpg');
new Image('cthulhu','imgs/cthulhu.jpg');
new Image('dog-duck','imgs/dog-duck.jpg');
new Image('dragon','imgs/dragon.jpg');
new Image('pen','imgs/pen.jpg');
new Image('pet-sweep','imgs/pet-sweep.jpg');
new Image('scissors','imgs/scissors.jpg');
new Image('shark','imgs/shark.jpg');
new Image('sweep','imgs/sweep.png');
new Image('tauntaun','imgs/tauntaun.jpg');
new Image('unicorn','imgs/unicorn.jpg');
new Image('water-can','imgs/water-can.jpg');
new Image('wine-glass','imgs/wine-glass.jpg');

let imgEls = document.querySelectorAll('img'); 
let imageOne=document.getElementById('image-1');
let imageTwo=document.getElementById('image-2');
let imageThree=document.getElementById('image-3');
let voteTrackerEl = document.getElementById('vote-tracker'); 

console.log("CURRENTLY RENDERED IMAGES", imgEls);

console.log('CURRENT STATE', state);

imageOne.src = state[0].source;
// imgEls[0].id = state[0].name;
imageTwo.src = state[1].source;
// imgEls[1].id = state[1].name;
imageThree.src = state[2].source;
// imgEls[2].id = state[2].name;
renderDuck();

function generateRandomDuck() {
  return Math.floor(Math.random() * state.length);
}

function renderDuck() {
  // find some goats from state
  let duck1 = state[generateRandomDuck()];
  let duck2 = state[generateRandomDuck()];
  console.log('DUCKS to re-render', imgEls, duck1, duck2);
  while (duck1.name === duck2.name){
    duck2 = state[generateRandomDuck()];
  }
  // this should garuantee fresh goats
  imgEls[0].src = duck1.source; // this makes things render
  imgEls[0].id = duck1.name;
  duck1.timesShown += 1;
  imgEls[1].src = duck2.source;
  imgEls[1].id = duck2.name;
  duck2.timesShown += 1;
}

function handleDuckClick(event) {
  console.log(event.target); // event.target always represents the exact element where an event occurred.

  // identify which image was clicked on??
  let duckThatWasClicked = event.target.id;
  state.forEach(image => {
    if (image.name === duckThatWasClicked) {
      image.timesClicked += 1; // mutation of an object
    }
  });
  console.log('UPDATED STATE', state);

  // re-render new goat images -> random goat image from state
  if (roundsOfVoting) {
    renderDucks();
    roundsOfVoting--;
  } else {
    voteTrackerEl.removeEventListener('click', handleDuckClick);
  }
}

voteTrackerEl.addEventListener('click', handleDuckClick);

// let eventId = voteTrackerEl.addEventListener('click', function(event) {
//   console.log(event.target); // event.target always represents the exact element where an event occurred.

//   // identify which image was clicked on??
//   let goatThatWasClicked = event.target.id;
//   state.forEach(image => {
//     if (image.name === goatThatWasClicked) {
//       image.timesClicked += 1; // mutation of an object
//     }
//   });
//   console.log('UPDATED STATE', state);

//   // re-render new goat images -> random goat image from state
//   if (roundsOfVoting) {
//     renderGoats();
//     roundsOfVoting--;
//   } else {
//     voteTrackerEl.removeEventListener('click', eventId);
//   }
// });