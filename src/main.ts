export type Fen = string

export type Suit = 1 | 2 | 3 | 4
export type Rank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

export type Card = number

export type Hand = [Card, Card]
export type Flop = [Card, Card, Card]

export type HeadsUp = {
  hand1: Hand,
  hand2?: Hand,
  flop?: [Card, Card, Card],
  turn?: Card,
  river?: Card
}


export function make_card(suit: Suit, rank: Rank) {
  return suit * 20 + rank
}

export function card_suit(card: Card) {
  return (card - card % 20) / 20 as Suit
}

export function card_rank(card: Card) {
  return card % 20 as Rank
}

const rank_ucis = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
const suit_ucis = ['h', 's', 'c', 'd']

export function rank_uci(rank: Rank) {
  return rank_ucis[rank-1]
}

export function suit_uci(suit: Suit) {
  return suit_ucis[suit - 1]
}

export function card_uci(card: Card) {
  return rank_uci(card_rank(card)) + suit_uci(card_suit(card))
}


function read_rank(_rank: string): Rank | undefined {
  let res = rank_ucis.indexOf(_rank) + 1
  if (res >= 1 && res <= 12) {
    return res as Rank
  }
}

function read_suit(_suit: string): Suit | undefined {
  let res = suit_ucis.indexOf(_suit) + 1

  if (res >= 1 && res <= 4) {
    return res as Suit
  }
}

function read_card(_card: string): Card | undefined {
  let RE = /(\d\d?)(h|d|c|s)/

  let [_, _rank, _suit] = _card.match(RE) || []

  let rank = read_rank(_rank),
    suit = read_suit(_suit)


  if (rank && suit) {
    return make_card(suit, rank)
  }
}

function read_cards(_cards: string): Array<Card> | undefined {
  if (_cards !== '?') {
    return _cards.split(' ').map(_ => read_card(_)!)
  }
}

/* 10d 11h/?/?/?/? */
export function fen_headsup(fen: Fen): HeadsUp {
  let [_hand1, _hand2, _flop, _turn, _river]  = fen.split('/')
  return {
    hand1: read_cards(_hand1) as Hand,
    hand2: read_cards(_hand2) as Hand | undefined,
    flop: read_cards(_flop) as Flop,
    turn: read_card(_turn),
    river: read_card(_river) 
  }
}



