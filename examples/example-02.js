/**
 * Created by azder on 2014-04-20.
 */

// ALWAYS
'use strict';

var trilean = require('../source/trilean.js');


var log = console.log.bind(console);

[-1, 0, 1].forEach(function (i) {
    log('for number', i, '' + trilean(i), '' + new trilean(i));
});


var trileans = [ trilean(true), trilean(false), trilean()];

trileans.forEach(function (tril) {
    log('not', '' + tril, '->', +tril.not());
});

trileans.forEach(function (i) {
    trileans.forEach(function (j) {
        log([i, 'and', j, '->', i.and(j), i, 'or', j, '->', i.or(j)].join('\t'));
    });
});
