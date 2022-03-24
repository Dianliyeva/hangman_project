const WordList = ['iphone', 'software', 'fisherman', 'airpods', 'forest', 'guitar', 'mario', 'project', 'tigers', 'sourpatch'];
let word = "";
let currentword = [];
let wordContainer = document.getElementById("wordContainer");
let app = document.getElementsByClassName('App')
let wrongwordContainer = [];
let rightwordContainer = [];
let counter = 0;

const initialize = () =>{

  word = WordList[Math.floor(Math.random() * WordList.length)];

  while (wordContainer.firstChild){
    wordContainer.removeChild(wordContainer.firstChild)
  }

  for (let i = 0; i < word.length; i++){
    letter = document.createElement('div')
    letter.textContent = '_'
    letter.classList.add('letter')
    wordContainer.appendChild(letter);
  }
  currentword = word.split('')
}


const guessLetter = event =>{

    event.preventDefault();
    let allLetter = document.getElementsByClassName('letter');
    let textValue = document.getElementById('text').value;
    let finalmessage = document.getElementById('finalMessage');

    console.log(counter)
    for(let i = 0; i < currentword.length; i++){
        if(textValue === currentword[i]){
            allLetter[i].innerText = textValue;
            rightwordContainer.push(textValue);
            counter+=1;
        }
    }
    if (!currentword.includes(textValue) && textValue.length === 1 && !wrongwordContainer.includes(textValue)){
      wrongwordContainer.push(textValue);
      showHangman();
    }
    document.getElementById('wrongword').innerText = "Wrong Letters: " + wrongwordContainer.toString();

    if(textValue.length > 1){
      finalmessage.innerText = " Sorry, please enter one letter at a time"
    }else{
      finalmessage.innerText = ""
    }

    if(wrongwordContainer.length >= 6){
      finalmessage.innerText = " Game Ended, You Lost!";
      let restartButton = document.getElementById('restartButton')
      restartButton.style.display = 'block'
      restartButton.addEventListener("click", restartGame)
      document.getElementById('submitButton').style.display = 'none'
    }

    let letter = document.getElementsByClassName("letter")
    for(let i = 0; i < word.length; i++){
        if(counter === word.length && letter[i].innerText !== '_'){
          finalmessage.innerText = " Game Ended, You Won!";
          let restartButton = document.getElementById('restartButton')
          restartButton.style.display = 'block'
          restartButton.addEventListener("click", restartGame)
          document.getElementById('submitButton').style.display = 'none'
        }
    }
}

const restartGame = () =>{
  wrongwordContainer = [];
  counter = 0;
  document.getElementById('wrongword').innerText = " "
  document.getElementById('finalMessage').innerText = " ";
  document.getElementById('restartButton').style.display = 'none'
  document.getElementById('submitButton').style.display = 'block'

  document.getElementById('head').style.display='none'
  document.getElementById('body').style.display='none'
  document.getElementById('leftarm').style.display='none'
  document.getElementById('rightarm').style.display='none'
  document.getElementById('leftleg').style.display='none'
  document.getElementById('rightleg').style.display='none'
  initialize();
}

const showHangman = () =>{
  if(wrongwordContainer.length === 1){
    document.getElementById('head').style.display='block'
  }
  if(wrongwordContainer.length === 2){
    document.getElementById('body').style.display='block'
  }
  if(wrongwordContainer.length === 3){
    document.getElementById('leftarm').style.display='block'
  }
  if(wrongwordContainer.length === 4){
    document.getElementById('rightarm').style.display='block'
  }
  if(wrongwordContainer.length === 5){
    document.getElementById('leftleg').style.display='block'
  }
  if(wrongwordContainer.length === 6){
    document.getElementById('rightleg').style.display='block'
  }

}

document.addEventListener('DOMContentLoaded', initialize )
document.addEventListener('submit', guessLetter)