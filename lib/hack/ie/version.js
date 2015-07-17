// Version# for IE 8-11, 0 for others
var ieVersion = (function (win) {
return (window && window.document || {}).documentMode | 0
})()
