import test from 'ava';
import { fen_headsup, card_uci } from '../main.js'

test('fen_headsup', t => {

  let no = fen_headsup('?/?/?/?/?')
  t.falsy(no.deals)

  let hu = fen_headsup('10d 11h/?/?/?/?')

  t.is(card_uci(hu.deals!.hand1[0]), '10d')

  t.falsy(hu.deals!.hand2)
  t.falsy(hu.deals!.flop)

})
