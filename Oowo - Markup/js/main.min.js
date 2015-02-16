(function() {
  $(function() {
    var DEBUG_MODE, addNumber, d, initGame, pickRandom, secret, selectActive;
    DEBUG_MODE = true;
    d = function(string) {
      if (DEBUG_MODE) {
        return console.log(string);
      }
    };
    secret = 0;
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
    initGame = function() {
      var i, numbers, _i, _len, _ref;
      numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      secret = pickRandom(numbers);
      numbers.push(0);
      _ref = [1, 2, 3];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        i = _ref[_i];
        secret = secret * 10 + pickRandom(numbers);
      }
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
    return initGame();
  });

}).call(this);
