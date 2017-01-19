'use strict'

var scino = require('./index.js')
var tape = require('tape')

tape('parses numbers', function (t) {
  t.deepEqual(
    scino.parse(-0.00000000000000357),
    {
      coefficient: -3.57,
      exponent: -15
    },
    'small negative number'
  )
  t.deepEqual(
    scino.parse(0.001234567890),
    {
      coefficient: 1.23456789,
      exponent: -3
    },
    'small positive number'
  )
  t.deepEqual(
    scino.parse(-10203.04),
    {
      coefficient: -1.020304,
      exponent: 4
    },
    'big negative number'
  )
  t.deepEqual(
    scino.parse(987000654000),
    {
      coefficient: 9.87000654,
      exponent: 11
    },
    'big positive number'
  )
  t.end()
})

tape('formats numbers', function (t) {
  t.equal(scino(0.0012345), '1.2345 × 10⁻³', 'small positive number')
  t.equal(scino(-98765432100), '-9.87654321 × 10¹⁰', 'big negative number')
  t.equal(
    scino(0.00051927528, 4),
    '5.193 × 10⁻⁴',
    'custom precision'
  )
  t.equal(
    scino(-1234.56, {
      beforeCoefficient: '<strong>',
      afterCoefficient: '</strong>',
      multiplicationSign: '✖︎',
      beforeExponent: '<span>',
      afterExponent: '</span>'
    }),
    '<strong>-1.23456</strong> ✖︎ 10<span>³</span>',
    'custom options'
  )
  t.equal(scino(0), 0, 'returns zero')
  t.equal(
    scino('not-a-number'),
    'not-a-number',
    'returns non-numeric values as-is'
  )
  t.end()
})

