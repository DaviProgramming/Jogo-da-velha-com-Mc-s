let game ={
    techs : ['matue',
'dex',
'derek',
'krawk',
'sidoka',
'costagold',
'duzz',
'vino',
'dfideliz',
'dudu'],


lockmode: false,
firstCard: null,
secondCard: null,

setCard: function (id){

    let cards  = this.cards.filter(card=>card.id === id)[0];
    
    if(cards.flipped || this.lockmode){
        return false;
    }

    if(!this.firstCard){
        this.firstCard = cards;
        this.firstCard.flipped = true;
        return true;
    }else{
        this.secondCard = cards;
        this.secondCard.flipped = true;
        this.lockmode = true;
        return true;
    }

},





cards : null,

createCardsFromTechs: function (){
    this.cards = [];

    this.techs.forEach((tech) => {
        this.cards.push(this.createPairFromTech(tech));
    })
    
    this.cards = this.cards.flatMap(pair => pair);
    this.shuffleCards();

    return this.cards;
},

createPairFromTech: function (tech){

return [{
    id: this.createIdWithTech(tech),
    icon: tech,
    flipped: false,
},{
    id: this.createIdWithTech(tech),
    icon: tech,
    flipped: false,
}]

},

createIdWithTech: function (tech){
    return tech + parseInt(Math.random() * 1000);
},

shuffleCards: function (cards){
    let currentIndex = this.cards.length;
    let randomIndex = 0;

    while(currentIndex !== 0){

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]];
    }
},

checkMatch: function(){
    if(!this.firstCard || !this.secondCard){
        return false;
    }
    return (this.firstCard.icon===this.secondCard.icon);

},

clearCards:function(){
    this.firstCard = null;
    this.secondCard= null;
    this.lockmode = false;

},

unflip : function(){
    this.firstCard.flipped = false;
    this.secondCard.flipped = false;
    this.clearCards();  
},
checkGameOver(){
    return this.cards.filter(card =>!card.flipped).length ==0;
}


}