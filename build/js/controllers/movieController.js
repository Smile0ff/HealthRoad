var app = app || {};

(function(app, $, root){

	"use strict";

	var movieID = {
		ua: "b_eY9fmbUAM",
		ru: "Gy1Or9273sY"
	}

	function MovieController(){
		this.el = $("#movie-holder");
		this.initialize.apply(this, arguments);
	}
	MovieController.prototype = {
		button: [],
		initialize: initialize,
		_events: _events,
		handleMovie: handleMovie,
		insertMovie: insertMovie,
		closeMovie: closeMovie
	}

	function initialize(){
		this.button = $("#watch-movie");
		this._events();
	}
	function _events(){
		this.button.on("click", $.proxy(this.handleMovie, this));
		this.el.on("click", $.proxy(this.closeMovie, this));
	}
	function handleMovie(e){
		var target = $(e.target).closest("#watch-movie"),
			lang = target.data("lang"),
			id = movieID[lang];

		if(id.length <= 0) return;
		this.insertMovie(id);
		this.el.addClass("active");

		return false;
	}
	function insertMovie(movieID){
		this.el.find("iframe").attr("src", "https://www.youtube.com/embed/"+ movieID +"?autohide=1&autoplay=1");
	}
	function closeMovie(e){
		e.preventDefault();
		this.el.removeClass("active").find("iframe").attr("src", "");
	}

	app.MovieController = MovieController;

})(app, jQuery, window);