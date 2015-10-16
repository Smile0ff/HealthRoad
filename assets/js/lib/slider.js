import {vendors as v} from "./vendors";

(function($, root, v){

	"use strict";

	var pluginName = "slidy",
		_defaults = {},

		transform = v("transform");

	function Plugin(el, options){
		this.el = $(el);
		this._options = $.extend({}, _defaults, options);

		this.initialize.apply(this, arguments);
	}
	Plugin.prototype = {
		slider: [],
		slides: [],
		slideCount: [],
		slideWidth: 0,
		currentSlide: 0,
		initialize: initialize,
		_events: _events,
		defineDOM: defineDOM,
		setCss: setCss,
		handleArrow: handleArrow,
		handleResize: handleResize,
		changeSlide: changeSlide,
		updateCounter: updateCounter
	}
	function initialize(){
		this._events();
		this.defineDOM();
		this.setCss();
		this.updateCounter();
	}
	function _events(){
		this.el.on("click", ".arrow", $.proxy(this.handleArrow, this));
		$(root).on("resize", $.proxy(this.handleResize, this));
	}
	function defineDOM(){
		this.slider = this.el.find(".slider");
		this.slides = this.el.find(".slide");
		this.counter = this.el.find(".counter-holder");
		this.slideCount = this.slides.length;
	}
	function setCss(){
		this.slideWidth = this.el.outerWidth();
		
		this.slider.css({"width": this.slideWidth * this.slideCount});
		this.slides.css({"width": this.slideWidth});
	}
	function handleArrow(e){
		var target = $(e.target);

		target.hasClass("arrow-left") ? this.currentSlide-- : this.currentSlide++;

		if(this.currentSlide >= this.slideCount - 1) this.currentSlide = this.slideCount - 1;
		if(this.currentSlide <= 0) this.currentSlide = 0;
		this.changeSlide();
		this.updateCounter();

		return false;
	}
	function handleResize(e){
		this.setCss();
	}
	function changeSlide(){
		var	position = this.slideWidth * this.currentSlide * -1;
		this.slider.css({transform: "translateX("+ position +"px)"});
	}
	function updateCounter(){
		this.counter.html((this.currentSlide + 1) + " / " + this.slideCount);
	}

	$.fn[pluginName] = function(options){
		return this.each(function(){
			if(!$.data(this, "plugin" + pluginName)) $.data(this, "plugin" + pluginName, new Plugin(this, options));
		});
	}

})($, window, v);