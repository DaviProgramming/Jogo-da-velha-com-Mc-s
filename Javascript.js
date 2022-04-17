const  FRONT = "card_front"
const  BACK = "card_back"
const  CARD = "card"
const ICON = "icon"





startGame();

function startGame(){
    
   
    initializeCards(cards = game.createCardsFromTechs(game.techs));
    
    
    
}



function initializeCards(cards){
    let gameBoard = document.getElementById("gameboard");
    gameBoard.innerHTML='';

    cards.forEach(card =>{
        
        let cardElement = document.createElement('div');

        cardElement.id = card.id;
        cardElement.classList.add(CARD);
        cardElement.dataset.icon = card.icon;  

        createCardContent(card, cardElement);

        cardElement.addEventListener('click', flipCard)
        gameBoard.appendChild(cardElement);

    })
    
}


function createCardContent(card, cardElement){

    createCardFace(FRONT, card, cardElement);
    createCardFace(BACK, card, cardElement);
}

function createCardFace(face, card , element){

 let cardElementFACE = document.createElement('div');
 cardElementFACE.classList.add(face);
 if(face === FRONT){

    let iconELement = document.createElement('img');
    iconELement.classList.add(ICON);
    iconELement.src = "./assets/" + card.icon + ".png";
    cardElementFACE.appendChild(iconELement);


 }else{
     cardElementFACE.innerHTML = "&lt/&gt";
 }

    element.appendChild(cardElementFACE);
}










function flipCard(){
    if( game.setCard(this.id)){
        
        this.classList.add("flip");
        if(game.secondCard){
        if(game.checkMatch()){
            game.clearCards();
            if (game.checkGameOver()){
                let GameOverLayer = document.getElementById("gameOver");
                GameOverLayer.style.display = 'flex';

                let titulo = document.getElementById("titulo");
                titulo.style.display = 'none';

                let gameBoard = document.getElementById("gameboard");;
                gameBoard.style.display = 'none';

                let cartoon = document.getElementById("cartooninicio");
                cartoon.style.display = 'none';

                

                
            }
        }else{
            setTimeout(() => {
                let firstCardView = document.getElementById(game.firstCard.id);
                let secondCardView = document.getElementById(game.secondCard.id);

                firstCardView.classList.remove('flip');
                secondCardView.classList.remove('flip');
                game.unflip();

            }, 1000);

        }
        }
     
}

}

function restart(){
    startGame();
    game.clearCards;
    let GameOverLayer = document.getElementById("gameOver");
                GameOverLayer.style.display = 'none';

               

                let titulo = document.getElementById("titulo");
                titulo.style.display = 'flex';

                let gameBoard = document.getElementById("gameboard");;
                gameBoard.style.display = 'grid';

                let cartoon = document.getElementById("cartooninicio");
                cartoon.style.display = 'flex';               
}