/**
 * Created by azder on 2014-04-21.
 */

(function () {

    // ALWAYS
    'use strict';


    var trilean = require('../source/trilean.js');

    var log = console.log.bind(console);

    var trileans = [-1, 0, 1];

    var table = function (iterator) {
        var results = [];
        trileans.forEach(function (p) {
            trileans.forEach(function (q) {
                results.push(iterator.call(this, trilean(p), trilean(q)));
            });
        });
        return results;
    };

    //noinspection JSPotentiallyInvalidConstructorUsage
    log(Array(50).join('-'));

    table(function (p, q) {
        var a = p.not().or(q);
        var b = p.imp(q);
        log(['not' , p , 'or' , q , '<=>' , a , '|' , b].join('\t'));
    });

    //noinspection JSPotentiallyInvalidConstructorUsage
    log(Array(105).join('-'));

    table(function (p, q) {

        var b = q.imp(p);
        var c = p.eq(q);
        var a = p.imp(q);

        log([ p , '=>' , q , '<=>' , a , '|' , b, '<=>' , q , '=>' , p, ' | ', a, 'and', b, '<=>', c ].join('\t'));

    });


}());
