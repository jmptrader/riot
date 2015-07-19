/* Riot WIP, @license MIT, (c) 2015 Muut Inc. + contributors */

;(function(window, undefined) {
  'use strict'
  var riot = { version: 'WIP', settings: {}, hack: {} }

  // This globals 'const' helps code size reduction

  // for typeof == '' comparisons
  var T_STRING = 'string',
      T_OBJECT = 'object',
      T_UNDEF  = 'undefined',

      RIOT_PREFIX = 'riot-',
      RIOT_TAG = RIOT_PREFIX + 'tag'

// eof browser/wrap/prefix.js
