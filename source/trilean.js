/**
 * Created by azder on 2014-04-20.
 */


/*global define:false, module:false */

(function (G) {

    return function (name, factory) {

        // ALWAYS
        'use strict';

        if (module && module.exports) {
            module.exports = factory();
            return;
        }

        if ('function' === typeof define && define.amd) {
            define(factory);
            return;
        }

        G[name] = factory(G);

    };

}(this))

('trilean', function () {

    // ALWAYS
    'use strict';

    var FALSE, NIL, TRUE, primitive, trilean, proto;

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
        return true === value ? TRUE : ( false === value ? FALSE : NIL);

    };


    proto = {

        and: function (value) {

            var a = primitive(this);
            var b = primitive(value);

            if (false === a || false === b) {
                return FALSE;
            }

            if (null === a || null === b) {
                return NIL;
            }

            return TRUE;

        },

        or: function (value) {

            var a = primitive(this);
            var b = primitive(value);

            if (true === a || true === b) {
                return TRUE;
            }

            if (null === a || null === b) {
                return NIL;
            }

            return FALSE;

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
                return TRUE;
            }

            if (true === p) {
                return value;
            }

            if (true === primitive(value)) {
                return TRUE;
            }

            return NIL;

        },

        eq: function (value) {

            var p = primitive(this), q = primitive(value);

            if (null === p || null === q) {
                return NIL;
            }

            return p === q ? TRUE : FALSE;

        },

        open: function () {
            return false !== primitive(this);
        },

        close: function () {
            return true === primitive(this);
        }

    };

    Trilean.prototype = proto;

    FALSE = new Trilean(false);
    NIL = new Trilean(null);
    TRUE = new Trilean(true);

    proto.FALSE = FALSE;
    proto.NIL = NIL;
    proto.TRUE = TRUE;

    return trilean;

});
