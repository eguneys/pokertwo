import test from 'ava';
import { fen_headsup, card_uci } from '../main'

test('fen_headsup', t => {


  let hu = fen_headsup('10d 11h/?/?/?/?')

  t.is(card_uci(hu.hand1[0]), '10d')

  t.falsy(hu.hand2)
  t.falsy(hu.flop)

})
