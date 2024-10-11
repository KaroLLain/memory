// import card1 from '../assets/card_1.jpg'
// import card2 from '../assets/card_2.jpg'
// import card3 from '../assets/card_3.jpg'
// import card4 from '../assets/card_4.jpg'
// import card5 from '../assets/card_5.jpg'
// import card6 from '../assets/card_6.jpg'
// import card7 from '../assets/card_7.jpg'
// import card8 from '../assets/card_8.jpg'
// import cardBack from '../assets/card_back.jpg'

// export type CardType = {
//   id: string
//   flipped: boolean
//   backImage: string
//   frontImage: string
//   clickable: boolean
//   matchingCardId: string
// }

// const cards: string[] = [card1, card2, card3, card4, card5, card6, card7, card8]

// export const createBoard = (size: number): CardType[] => {
//   const selectedCards = cards.slice(0, size / 2)
//   return [...selectedCards, ...selectedCards].map((card, i) => ({
//     id: `card${i}`,
//     flipped: false,
//     backImage: cardBack,
//     frontImage: card,
//     clickable: true,
//     matchingCardId:
//       i < selectedCards.length
//         ? `card${i + selectedCards.length}`
//         : `card${i - selectedCards.length}`
//   }))
// }


import card1 from '../assets/card_1.jpg';
import card2 from '../assets/card_2.jpg';
import card3 from '../assets/card_3.jpg';
import card4 from '../assets/card_4.jpg';
import card5 from '../assets/card_5.jpg';
import card6 from '../assets/card_6.jpg';
import card7 from '../assets/card_7.jpg';
import card8 from '../assets/card_8.jpg';
// Cardback
import cardBack from '../assets/card_back.jpg';

export type CardType = {
id: string;
flipped: boolean;
backImage: string;
frontImage: string;
clickable: boolean;
matchingCardId: string;
};

const cards: string[] = [card1, card2, card3, card4, card5, card6, card7, card8];

export const createBoard = (size: number): CardType[] => {
const selectedCards = cards.slice(0, size / 2);
return [...selectedCards, ...selectedCards].map((card, i) => ({
id: `card${i}`,
flipped: false,
backImage: cardBack,
frontImage: card,
clickable: true,
matchingCardId:
i < selectedCards.length
? `card${i + selectedCards.length}`
: `card${i - selectedCards.length}`,
}));
};