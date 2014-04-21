/**
 * Created by azder on 2014-04-21.
 */


(function () {

    // ALWAYS
    'use strict';


    var trilean = require('../source/trilean.js');

    var log = console.log.bind(console);

    var trileans = [2, [], -2, '', NaN, void 0, -0.0, +0.0, null, false, true, {}];

    log(['value', 'trilean', 'open', 'close', '+trilean' ].join('\t'));
    //noinspection JSPotentiallyInvalidConstructorUsage
    log(Array(50).join('-'));

    trileans.forEach(function (value) {
        var tril = trilean(value);
        log([value, '-->', tril, tril.open(), tril.close(), +tril ].join('\t'));
    });


}());
