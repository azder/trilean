/**
 * Created by azder on 2014-04-20.
 */

/*global define:false, module:false */

(function (G, factory) {

    // ALWAYS
    'use strict';

    if ('object' === typeof module && 'object' === typeof module.exports) {
        module.exports = factory();
        return;
    }

    if ('function' === typeof define && define.amd) {
        define(factory);
        return;
    }

    G['trilean'] = factory(G);


}(this, function () {

    // ALWAYS
    'use strict';

    var F, N, T, primitive, trilean, proto;

    function Trilean(value) {

        value = primitive(value);

        Object.defineProperties(this, {

            valueOf: {
                configurable: false,
                enumerable:   false,
                writable:     false,
                value:        function () {
//                    return null === value ? 0 : (true === value ? 1 : -1);
                    return value;
                }

            },

            toString: {
                configurable: false,
                enumerable:   false,
                writable:     false,
                value:        function () {
                    return  '' + value;
                }
            }

        });

    }

    primitive = function (value) {

        if (null === value || void 0 === value) {
            return null;
        }

        if (isNaN(value)) {
            return null;
        }

        if (value instanceof Trilean) {
            return value.valueOf();
//            return 0 < value ? true : ( 0 > value ? false : null);
        }

        if (value === +value) {
            return 0 > value ? false : (0 < value ? true : null);
        }

        return !!value;

    };

    trilean = function (value) {

        value = primitive(value);
        return true === value ? T : ( false === value ? F : N);

    };


    proto = {

        and: function (value) {

            var a = primitive(this);
            var b = primitive(value);

            if (false === a || false === b) {
                return F;
            }

            if (null === a || null === b) {
                return N;
            }

            return T;

        },

        or: function (value) {

            var a = primitive(this);
            var b = primitive(value);

            if (true === a || true === b) {
                return T;
            }

            if (null === a || null === b) {
                return N;
            }

            return F;

        },

        not: function () {

            var value = primitive(this);

            if (null !== value) {
                value = !value;
            }

            return trilean(value);

        },

        imp: function (value) {

            var p = primitive(this);

            if (false === p) {
                return T;
            }

            if (true === p) {
                return value;
            }

            if (true === primitive(value)) {
                return T;
            }

            return N;

        },

        eq: function (value) {

            var p = primitive(this), q = primitive(value);

            if (null === p || null === q) {
                return N;
            }

            return p === q ? T : F;

        },

        open: function () {
            return false !== primitive(this);
        },

        close: function () {
            return true === primitive(this);
        }

    };

    Trilean.prototype = proto;

    F = new Trilean(false);
    N = new Trilean(null);
    T = new Trilean(true);

    proto.F = F;
    proto.N = N;
    proto.T = T;

    return trilean;

}));
