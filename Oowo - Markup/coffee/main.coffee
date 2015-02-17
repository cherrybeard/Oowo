$ ->
	DEBUG_MODE = true
	
	d = (string) ->
		console.log(string) if DEBUG_MODE
	
	secret = []
	
	pickRandom = (array) ->
		index = Math.floor(Math.random() * array.length)
		number = array[index]
		array.splice(index, 1)
		return number
	
	selectActive = (element) ->
		$('.guess .number').removeClass('number--active')
		element = $('.guess .number').eq(element) if $.isNumeric(element)
		element.addClass('number--active')
			
	addNumber = (number) ->
		$('.guess .number').each ->
			$(this).text("") if parseInt($(this).text()) == number
		current = $('.guess .number--active')
		current.text(number)
		next = current.next('.number')
		selectActive(next) if next.length
		ready = true
		$('.guess .number').each ->
			ready = false if not $(this).text()
		if ready
			$('.check').addClass('check--active')
		else $('.check').removeClass('check--active')
			
	checkGuess = () ->
		guess = []
		guesses = $('.guess .number')
		for number in guesses
			guess.push(parseInt($(number).text()))
			$(number).text('')
		lastMove = $('.move').eq(-1)
		for number, i in lastMove.find('.number')
			$(number).text(guess[i])
		exist = 0
		match = 0
		for i in [0,1,2,3]
			exist++ if guess[i] in secret
			match++ if guess[i] == secret[i]
		lastMove.find('.exist').text(exist);
		lastMove.find('.match').text(match);
		selectActive(0)
			
			
	
	initGame = () ->
		secret = []
		numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
		secret.push(pickRandom(numbers))
		numbers.push(0)
		for i in [1, 2, 3]
			secret.push(pickRandom(numbers))
		d(secret)
		selectActive(0)
	
	$(document).on "keypress", (event) ->
		#console.log(event.which)
		if 57 >= event.which >= 48
			addNumber(event.which-48)
	
	$('.guess .number').on "click", ->
		selectActive($(this))
	
	$('.check').on "click", ->
		checkGuess()
			
	initGame()