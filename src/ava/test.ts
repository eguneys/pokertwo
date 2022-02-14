import test from 'ava';
import { fen_headsup } from '../main'

test('fen_headsup', t => {


  let hu = fen_headsup('10d 11h/?/?/?/?')

  t.is(hu.hand1[0].rank, 10)
  t.is(hu.hand1[0].suit, 4)

  t.falsy(hu.hand2)
  t.falsy(hu.flop)

})
