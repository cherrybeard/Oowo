(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  $(function() {
    var DEBUG_MODE, addNumber, checkGuess, d, initGame, pickRandom, secret, selectActive;
    DEBUG_MODE = true;
    d = function(string) {
      if (DEBUG_MODE) {
        return console.log(string);
      }
    };
    secret = [];
    pickRandom = function(array) {
      var index, number;
      index = Math.floor(Math.random() * array.length);
      number = array[index];
      array.splice(index, 1);
      return number;
    };
    selectActive = function(element) {
      $('.guess .number').removeClass('number--active');
      if ($.isNumeric(element)) {
        element = $('.guess .number').eq(element);
      }
      return element.addClass('number--active');
    };
    addNumber = function(number) {
      var current, next, ready;
      $('.guess .number').each(function() {
        if (parseInt($(this).text()) === number) {
          return $(this).text("");
        }
      });
      current = $('.guess .number--active');
      current.text(number);
      next = current.next('.number');
      if (next.length) {
        selectActive(next);
      }
      ready = true;
      $('.guess .number').each(function() {
        if (!$(this).text()) {
          return ready = false;
        }
      });
      if (ready) {
        return $('.check').addClass('check--active');
      } else {
        return $('.check').removeClass('check--active');
      }
    };
    checkGuess = function() {
      var exist, guess, guesses, i, lastMove, match, number, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2;
      guess = [];
      guesses = $('.guess .number');
      for (_i = 0, _len = guesses.length; _i < _len; _i++) {
        number = guesses[_i];
        guess.push(parseInt($(number).text()));
        $(number).text('');
      }
      lastMove = $('.move').eq(-1);
      _ref = lastMove.find('.number');
      for (i = _j = 0, _len1 = _ref.length; _j < _len1; i = ++_j) {
        number = _ref[i];
        $(number).text(guess[i]);
      }
      exist = 0;
      match = 0;
      _ref1 = [0, 1, 2, 3];
      for (_k = 0, _len2 = _ref1.length; _k < _len2; _k++) {
        i = _ref1[_k];
        if (_ref2 = guess[i], __indexOf.call(secret, _ref2) >= 0) {
          exist++;
        }
        if (guess[i] === secret[i]) {
          match++;
        }
      }
      lastMove.find('.exist').text(exist);
      lastMove.find('.match').text(match);
      return selectActive(0);
    };
    initGame = function() {
      var i, numbers, _i, _len, _ref;
      secret = [];
      numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      secret.push(pickRandom(numbers));
      numbers.push(0);
      _ref = [1, 2, 3];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        i = _ref[_i];
        secret.push(pickRandom(numbers));
      }
      d(secret);
      return selectActive(0);
    };
    $(document).on("keypress", function(event) {
      var _ref;
      if ((57 >= (_ref = event.which) && _ref >= 48)) {
        return addNumber(event.which - 48);
      }
    });
    $('.guess .number').on("click", function() {
      return selectActive($(this));
    });
    $('.check').on("click", function() {
      return checkGuess();
    });
    return initGame();
  });

}).call(this);
