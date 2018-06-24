var app = {
	version: '1.0.1',
	currentQ: 0,
	sound: new Audio('assets/ding2.mp3'),
	answers: [
		["Any%", 95],
		["Esports Speedrun Mode", 2],
		["No Wall Clips No Mega Jumps New Game", 1]
	],
	board: $("<div class='gameBoard'>" +

		"<!--- Answers --->" +
		"<div class='colHolder'>" +
		"<div class='col1'></div>" +
		"<div class='col2'></div>" +
		"</div>" +

		"</div>"),
	jsonLoaded: function() {
		console.clear()
		app.makeQuestion(8);
		$('body').append(app.board)
	},
	// Action functions
	makeQuestion: function(qNum) {
		var qAnswr = app.answers;
		var qNum = qAnswr.length
		qNum = (qNum < 8) ? 8 : qNum;
		qNum = (qNum % 2 != 0) ? qNum + 1 : qNum;

		var col1 = app.board.find(".col1")
		var col2 = app.board.find(".col2")

		col1.empty()
		col2.empty()

		for (var i = 0; i < qNum; i++) {
			var aLI
			if (qAnswr[i]) {
				aLI = $("<div class='cardHolder'>" +
					"<div class='card' id='ans" + (i+1) + "'>" +
					"<div class='front'>" +
					"<span class='DBG'>" + (i + 1) + "</span>" +
					"</div>" +
					"<div class='back DBG'>" +
					"<span>" + qAnswr[i][0] + "</span>" +
					"<b class='LBG'>" + qAnswr[i][1] + "</b>" +
					"</div>" +
					"</div>" +
					"</div>")
			} else {
				aLI = $("<div class='cardHolder empty'><div></div></div>")
			}
			var parentDiv = (i < (qNum / 2)) ? col1 : col2;
			$(aLI).appendTo(parentDiv)
		}

		var cardHolders = app.board.find('.cardHolder')
		var cards = app.board.find('.card')
		var backs = app.board.find('.back')
		var cardSides = app.board.find('.card>div')

		TweenLite.set(cardHolders, {
			perspective: 800
		});
		TweenLite.set(cards, {
			transformStyle: "preserve-3d"
		});
		TweenLite.set(backs, {
			rotationX: 180
		});
		TweenLite.set(cardSides, {
			backfaceVisibility: "hidden"
		});

		cards.data("flipped", false)

		function showCard() {
			var card = $('.card', this)
			var flipped = $(card).data("flipped")
			var cardRotate = (flipped) ? 0 : -180;
			TweenLite.to(card, 1, {
				rotationX: cardRotate,
				ease: Back.easeOut
			})
			if (!flipped) app.sound.play();
			flipped = !flipped
			$(card).data("flipped", flipped)
		}
		cardHolders.on('click', showCard)
	},
	onKeyUp: function(e) {
		e.preventDefault();
		if (e.keyCode === 49) {
			console.log('answer 1');
			$('#ans1').click();
		} else if (e.keyCode === 50) {
			console.log('answer 2');
			$('#ans2').click();
		}
		if (e.keyCode === 51) {
			console.log('answer 3');
			$('#ans3').click();
		}
	},
	// Inital function
	init: function() {
		app.jsonLoaded();
		$('html').on('keyup', app.onKeyUp)
	}
}

$(function() {
	app.init()
})()
