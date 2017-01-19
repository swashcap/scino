'use strict'

var Decimal = require('decimal.js')

module.exports = scino
module.exports.parse = parse

/**
 * Format a number using scientific notation.
 *
 * @param {number} num
 * @param {number} [precision]
 * @param {Object} [options] Formatting options
 * @returns {string} Formatted number
 */
function scino (num, precision, options) {
  if (typeof precision === 'object') {
    options = precision
    precision = undefined
  }

  if (typeof num !== 'number') {
    return num
  }

  var parsed = parse(num, precision)
  var opts = getValidOptions(options)
  var coefficient = parsed.coefficient
  var exponent = parsed.exponent.toString()
  var superscriptExponent = ''

  if (typeof coefficient === 'number' && isNaN(coefficient)) {
    return num
  }

  for (var i = 0; i < exponent.length; i++) {
    superscriptExponent += SUPERSCRIPTS[exponent[i]]
  }

  return opts.beforeCoefficient + coefficient + opts.afterCoefficient +
    opts.beforeMultiplicationSign + opts.multiplicationSign + opts.afterMultiplicationSign +
    opts.beforeBase + opts.base + opts.afterBase +
    opts.beforeExponent + superscriptExponent + opts.afterExponent
}

/**
 * Parse a number into its base and exponent.
 *
 * {@link http://mikemcl.github.io/decimal.js/#toSD}
 *
 * @param {number} num
 * @param {number} [precision]
 * @returns {Object}
 * @property {number} coefficient
 * @property {number} exponent
 */
function parse (num, precision) {
  var exponent = Math.floor(Math.log10(Math.abs(num)))
  var coefficient = new Decimal(num)
    .mul(new Decimal(Math.pow(10, -1 * exponent)))

  return {
    coefficient: typeof precision === 'number'
      ? coefficient.toSD(precision).toNumber()
      : coefficient.toNumber(),
    exponent: exponent
  }
}

/**
 * Pseudo-replacement for Object#assign for valid options.
 *
 * @param {Object} [options]
 * @returns {Object} Valid options for scino
 */
function getValidOptions (options) {
  if (typeof options !== 'object') {
    return DEFAULT_OPTIONS
  }

  var validOptions = {}

  for (var prop in DEFAULT_OPTIONS) {
    if (DEFAULT_OPTIONS.hasOwnProperty(prop)) {
      validOptions[prop] = typeof options[prop] === 'string'
        ? options[prop] : DEFAULT_OPTIONS[prop]
    }
  }

  return validOptions
}

var DEFAULT_OPTIONS = {
  // coefficient
  beforeCoefficient: '',
  afterCoefficient: '',

  // multiplication sign
  beforeMultiplicationSign: ' ',
  multiplicationSign: '×',
  afterMultiplicationSign: ' ',

  // base
  beforeBase: '',
  base: '10',
  afterBase: '',

  // exponent
  beforeExponent: '',
  afterExponent: ''
}

var SUPERSCRIPTS = {
  0: '⁰',
  1: '¹',
  2: '²',
  3: '³',
  4: '⁴',
  5: '⁵',
  6: '⁶',
  7: '⁷',
  8: '⁸',
  9: '⁹',
  '-': '⁻'
}

