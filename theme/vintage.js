(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['exports', 'iVizCharts'], factory);
    } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
        // CommonJS
        factory(exports, require('iVizCharts'));
    } else {
        // Browser globals
        factory({}, root.iVizCharts);
    }
}(this, function (exports, iVizCharts) {
    var log = function (msg) {
        if (typeof console !== 'undefined') {
            console && console.error && console.error(msg);
        }
    };
    if (!iVizCharts) {
        log('iVizCharts is not Loaded');
        return;
    }
    var colorPalette = ['#d87c7c','#919e8b', '#d7ab82',  '#6e7074','#61a0a8','#efa18d', '#787464', '#cc7e63', '#724e58', '#4b565b'];
    iVizCharts.registerTheme('vintage', {
        color: colorPalette,
        backgroundColor: '#fef8ef',
        graph: {
            color: colorPalette
        }
    });
}));