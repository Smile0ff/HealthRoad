(function($, root){

	"use strict";

	var pluginName = "slidy",
		_defaults = {};

	function Plugin(el, options){
		this.el = $(el);
		this._options = $.extend({}, _defaults, options);

		this.initialize.apply(this, arguments);
	}
	Plugin.prototype = {
		slider: [],
		slides: [],
		slideCount: [],
		currentSlide: 0,
		initialize: initialize,
		_events: _events,
		defineDOM: defineDOM,
		setCss: setCss,
		handleArrow: handleArrow,
		changeSlide: changeSlide
	}
	function initialize(){
		this._events();
		this.defineDOM();
		this.setCss();
	}
	function _events(){
		this.el.on("click", ".arrow", $.proxy(this.handleArrow, this));
	}
	function defineDOM(){
		this.slider = this.el.find(".slider");
		this.slides = this.el.find(".slide");
		this.slideCount = this.slides.length;
	}
	function setCss(){
		this.slides.css({"width": this.slider.width()});
		this.slider.css({"width": this.slider.width() * this.slideCount});
	}
	function handleArrow(e){
		var target = $(e.target);

		target.hasClass("arrow-left") ? this.currentSlide-- : this.currentSlide++;

		if(this.currentSlide >= this.slideCount - 1) this.currentSlide = this.slideCount - 1;
		if(this.currentSlide <= 0) this.currentSlide = 0;

		this.changeSlide();

		return false;
	}
	function changeSlide(){
		var position = this.slides.width() * this.currentSlide * -1;
		this.slider.css({"transform": "translateX("+ position +"px)"});
	}

	$.fn[pluginName] = function(options){
		return this.each(function(){
			if(!$.data(this, "plugin" + pluginName)) $.data(this, "plugin" + pluginName, new Plugin(this, options));
		});
	}

})($, window);