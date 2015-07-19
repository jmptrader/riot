
/**
 * hack/ie/version.js
 *
 * Version# for IE 8-11, 0 for other browsers/versions (there will be no IE12)
 */

riot.hack.ieVersion = (window && window.document || {}).documentMode | 0

// eof hack/ie/version.js
