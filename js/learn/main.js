// function declaration
function funcDec (a, b) {
    return a + b;
}

console.log( funcDec(3, 4) );
console.log( funcDec );

// function expression
var funcExp = function(a, b) {
    return a + b;
};

console.log( funcExp(2, 3) );

// hosting
function func1() {
    function funcExample() {
        return 'one';
    }

    var result = funcExample();

    function funcExample() {
        return 'two';
    }

    return result;
}

function func2() {
    var funcExample = function () {
        return 'one';
    }

    var result = funcExample();

    var funcExample = function () {
        return 'two';
    }

    return result;
}

console.log( func1() );
console.log( func2() );

// callback
var func3 = function(callback) {
    var name = 'Nick';
    return callback(name);
};

console.log( func3(function(n) {
    return 'Hello ' + n;
}) );

// function return
var func4 = function() {
    return function() {
        console.log('Hello');
    }
};

func4()();

// anonymous self executing function
(function() {
    var undef = 2;
    console.log('Hello anonymous');
})();

//console.log( undef );

// pattern module
var jQuery = {version: 1.8};

;(function($) {
    console.log($);
})(jQuery);

console.log( jQuery );

var funcArgs = function() {
    var i,
        sum = 0;

    for (i = 0; i < arguments.length; i++) {
        sum += arguments[i];
    }

    return sum;
};

console.log (funcArgs(1, 2, 3, 4, 5) );