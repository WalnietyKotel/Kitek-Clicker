const clickButton = document.getElementById("clickButton");
const scoreDisplay = document.getElementById("score");
const upgradeButton = document.getElementById("upgrade");
const level = document.getElementById("currentLevel")
const gablota = document.getElementById("gablotaNaKitki");
const next = document.getElementById("next");
const myButton = document.getElementById('button');
const movingObject = document.getElementById('movingObject');
const goToGablota = document.getElementById('goToKitek');
const aside = document.getElementById('aside');

let score = 0;
let drugiKitek = false;
let trzeciKitek = false;
let czwartyKitek = false;
let ukrytyElement = false;

const levels = [
  { requiredPoints1: 10, reward: "Kitek kosmonauta", imageSrc1: "img/Astronauta Koteł.jpg"},
  { requiredPoints2: 100, reward: "Kitek Gentleman", imageSrc2: "img/kitek gentleman.jpg" },
  { requiredPoints3: 252, reward: "Kitek Pirat", imageSrc3: "img/Ahoj Kamraci.jpg" }
];

// Function that add Kitek to your Kitek count (score)
function addKitek() {
  score++;
  
  if(drugiKitek == true){
    score += 1;
  };
  
  if (trzeciKitek == true) {
    score += 2;
  };
  
  if (czwartyKitek == true) {
    score += 3;
  };

  if (score >= 10) {
    goToGablota.style.display = 'block';
    aside.style.display = 'flex';
  }
  
  if(score >= 500){
    next.style.display = "block";
  }

  if (score >= 250) {
    pokazUkrytyElement();
  }
  
  scoreDisplay.textContent = score;
  
  Rewards();
}

clickButton.addEventListener("click", addKitek);
movingObject.addEventListener("click", addKitekBoosted);
myButton.addEventListener("click", goToAnotherLevel);


// Function that gets you rewards and boosters
function Rewards() {
  for (const level of levels) {
      if (score === level.requiredPoints1) {
        drugiKitek = true;
        alert(`Ilość kitków: ${level.requiredPoints1}. Nagroda: ${level.reward}`);
        createAndAppendImage(level.imageSrc1);
        
      } else if (score === level.requiredPoints2) {
        trzeciKitek = true;
        alert(`Ilość kitków: ${level.requiredPoints2}. Nagroda: ${level.reward}`);
        createAndAppendImage(level.imageSrc2);

        }else if(score === level.requiredPoints3){
        czwartyKitek = true;
        alert(`Ilość kitków: ${level.requiredPoints3}. Nagroda: ${level.  reward}`);
        createAndAppendImage(level.imageSrc3);
      }
  }
  }


// Function that creates an image of a cat and puts it in the cat box at the bottom of the wepsite
function createAndAppendImage(imageSrc) {
  let img = document.createElement("img");
  img.src = imageSrc;
  let gablota = document.getElementById("gablotaNaKitki");
  gablota.appendChild(img);
}

// Function that teleports you to another html site
function goToAnotherLevel(){
  document.location.href="drugiSwiat.html";
  alert("Przechodzisz na 2 swiat")
  score == 0;
  scoreDisplay.textContent = score;
}

// Function that moves element (image)
let posX = 0;
let posY = 0;
let directionX = 1;
let directionY = 1;
const speed = 5;

function moveObject() {
  posX += speed * directionX;
  posY += speed * directionY;

  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  if (posX >= screenWidth - movingObject.offsetWidth || posX <= 0) {
    directionX *= -1;
  }

  if (posY >= screenHeight - movingObject.offsetHeight || posY <= 0) {
    directionY *= -1;
  }

  movingObject.style.left = posX + 'px';
  movingObject.style.top = posY + 'px';
}

setInterval(moveObject, 10);


// function that adds kitek that moves around the page and gives you a lot of kitkas
function pokazUkrytyElement() {
  const losowyCzasPokazania = losujCzas(60000, 120000);
  ukrytyElement = true;

  movingObject.style.display = 'block';

  setTimeout(function() {
    movingObject.style.display = 'none';
    const losowyCzasZnikania = losujCzas(10000, 20000);

    setTimeout(function() {
      pokazUkrytyElement();
    }, losowyCzasZnikania);
  }, losowyCzasPokazania);
}

function losujCzas(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


function addKitekBoosted(){
  if (ukrytyElement == true) {
    score += 20;
  }
  if(score >= 500){
    next.style.display = "block";
  }

  scoreDisplay.textContent = score;
  Rewards();
}

// Smooth scroll on arrow click
window.smoothScroll = function(target) {
  var scrollContainer = target;
  do {
      scrollContainer = scrollContainer.parentNode;
      if (!scrollContainer) return;
      scrollContainer.scrollTop += 1;
  } while (scrollContainer.scrollTop == 0);

  var targetY = 0;
  do {
      if (target == scrollContainer) break;
      targetY += target.offsetTop;
  } while (target = target.offsetParent);

  scroll = function(c, a, b, i) {
      i++; if (i > 30) return;
      c.scrollTop = a + (b - a) / 30 * i;
      setTimeout(function(){ scroll(c, a, b, i); }, 20);
  }

  scroll(scrollContainer, scrollContainer.scrollTop, targetY, 0);
}







