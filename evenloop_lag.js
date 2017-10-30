var SECONDS_TO_MILLIS = 1e3;
var NANO_TO_MILLIS = 1e6;


function eventloopLag(ms) {

    var start = time();
    var delay = 0;

    if (typeof ms !== 'number') throw new TypeError('ms must be a number');

    var timeout = setTimeout(lagTime, ms)

    //Timeout will be closed the loop if this is only thing running 
    timeout.unref();

    function lagTime() {

        clearTimeout(timeout);
        var t = time();

        delay = Math.max(0, t - start - ms);

        timeout = setTimeout(lagTime, ms);

        start = t;
    }

    return function () {
        return delay;
    }
}

function time() {
    var t = process.hrtime()
    t = t[0] * SECONDS_TO_MILLIS + t[1] / NANO_TO_MILLIS;
    return t;
}

