// set the width, height and number of images as convinent
const IMG_WIDTH = 400;
const IMG_HEIGHT = 300;
const IMG_COUNT = 4;

// Setting up CarContainer (Visible Area) Accordingly
let CarContainer = document.getElementsByClassName('car-container')[0];
CarContainer.style.width = `${IMG_WIDTH}px`;
CarContainer.style.height = `${IMG_HEIGHT}px`;

// Setting up sliderImage accordingly 
let sliderImage = document.getElementsByClassName('slider-image')[0];
sliderImage.style.width = `${IMG_WIDTH * IMG_COUNT}px`;
sliderImage.style.height = `${IMG_HEIGHT}px`;

// Ensuring image are of same size 
let images = sliderImage.querySelectorAll('img');
for(let i = 0; i < images.length; i++) {
  images[i].style.width = `${IMG_WIDTH}px`;
  images[i].style.height = `${IMG_HEIGHT}px`;
  }

  // Arrow Formation - Left Arrow
var leftArrow = document.createElement('div');
var imgTag = document.createElement('img');
imgTag.src = `./images/left-arrow.png`;
leftArrow.appendChild(imgTag);
leftArrow.className = "left-arrow";
CarContainer.appendChild(leftArrow);

// Arrow Formation - Right Arrow
var rightArrow = document.createElement('div');
var imgTag = document.createElement('img');
imgTag.src = `./images/right-arrow.png`;
rightArrow.appendChild(imgTag);
rightArrow.className = "right-arrow";
CarContainer.appendChild(rightArrow);

// Set the following as per convinient and need
const FPS = 60;
const HOLD_TIME = 4000;
const ANIMATION_TIME = 40;

// Defining variables for the logic 
let posLeft = 0;
let currentIndex = 0;
let left = true;
let right = false;
let onHold = false;
let onTransit = false;
let onButtonTransit = false;

// Radio Button Formation 
let radioClass = document.createElement('div');
radioClass.className = "radio-class";
CarContainer.appendChild(radioClass);
for(let i = 0; i < IMG_COUNT; i++) {
  let radio = document.createElement('div');
  radio.className = "radio";
  radioClass.appendChild(radio);
  radio.addEventListener('click', function() {
    if(!onTransit) {
      changeImage(i);
      clearInterval(isAutomaticAnimation);
      isAutomaticAnimation = null;
    }      
  })
}

  function changeImage(nextIndex) {
    transition(currentIndex, nextIndex);
    currentIndex = nextIndex;
  }

  rightArrow.addEventListener("click",function() {
    if(!onTransit) {
        onButtonTransit = true;
        moveInLeftDirection();
        clearInterval(isAutomaticAnimation);
        isAutomaticAnimation = null;
    }
  })

  function moveInLeftDirection() {
    if(currentIndex === IMG_COUNT - 1) {
      transition(currentIndex, 0);
      currentIndex = 0;
    }else {
      transition(currentIndex, currentIndex + 1)
      currentIndex++;
    }
  }

  leftArrow.addEventListener("click",function() {
    if(!onTransit) {
        onButtonTransit = true;
        moveInRightDirection();
        clearInterval(isAutomaticAnimation);
        isAutomaticAnimation = null;
    }
})
  
  function moveInRightDirection() {
    if(currentIndex == 0) {
      transition(currentIndex, IMG_COUNT - 1);
      currentIndex = IMG_COUNT - 1;
    }else {
      transition(currentIndex, currentIndex - 1)
      currentIndex--;
  }
}
  
  
  isAutomaticAnimation = setInterval(animate, HOLD_TIME);
  function animate() {
    // set the direction of animation.
    if(currentIndex == 0) {
      right = false;
      left = true;
    }else if(currentIndex == IMG_COUNT - 1) {
      left = false;
      right = true;
    }

    // animate the carousel depending on the direction.
    if(left) {
      nextIndex = currentIndex + 1;
      transition(currentIndex, nextIndex)
      currentIndex++;
    }
    if(right) {
      nextIndex = currentIndex - 1;
      transition(currentIndex, nextIndex)
      currentIndex--;
    } 

}

  function transition(currentIndex, nextIndex) {
    
    // set the old margin value.
    let oldMarginValue = posLeft;
  
    clearInterval(isAutomaticAnimation);
    isAutomaticAnimation = null;
  
    // if no transition is taking place
    if(!onTransit) {
      var transitionTimer = setInterval(() => {
        onTransit = true;
        let indexDifference = (nextIndex - currentIndex);
        let distance = indexDifference * IMG_WIDTH;
        posLeft -= (distance / ANIMATION_TIME);
        sliderImage.style.marginLeft = `${posLeft}px`;
        let changeInMargin = oldMarginValue - posLeft;
        if(changeInMargin === distance) {
            onTransit = false;
            clearInterval(transitionTimer);
            if(!isAutomaticAnimation) {
              isAutomaticAnimation = setInterval(animate, HOLD_TIME);
            }
        }
      }, (1000 / FPS))     
    }

  }   

