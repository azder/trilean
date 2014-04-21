/**
 * Created by azder on 2014-04-21.
 */


(function () {

    // ALWAYS
    'use strict';


    var trilean = require('../source/trilean.js');

    var log = console.log.bind(console);

    var trileans = [-2, false, 0, null, 2, true];

    //noinspection JSPotentiallyInvalidConstructorUsage
    log(Array(50).join('-'));

    trileans.forEach(function (value) {
        var tril = trilean(value);
        log([value, '-->', tril, '-->', +tril, (+tril ? 'truthy' : 'falsy')  ].join('\t'));
    });


}());
