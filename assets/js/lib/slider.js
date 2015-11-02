import {vendors as v} from "./vendors";

(function($, root, v){

	"use strict";

	var pluginName = "slidy",
		_defaults = {},

		transform = v("transform"),
		transition = v("transition");

	function Plugin(el, options){
		this.el = $(el);
		this._options = $.extend({}, _defaults, options);

		this.initialize.apply(this, arguments);
	}
	Plugin.prototype = {
		slider: [],
		slides: [],
		slideCount: null,
		activeSlide: null,
		prevSlide: null,
		nextSlide: null,
		startX: 0,
		moveX: 0,
		deltaX: {},
		current: 0,
		isPressed: false,
		isAnimate: false,
		initialize: initialize,
		_events: _events,
		defineDOM: defineDOM,
		handleArrow: handleArrow,
		touchStart: touchStart,
		touchMove: touchMove,
		touchEnd: touchEnd,
		getDelta: getDelta,
		setSlideGroup: setSlideGroup,
		changeSlide: changeSlide,
		updateAnimationState: updateAnimationState
	}
	function initialize(){
		this._events();
		this.defineDOM();
	}
	function _events(){
		this.el
			.on("click", ".arrow", $.proxy(this.handleArrow, this))
			.on("touchstart mousedown", $.proxy(this.touchStart, this))
			.on("touchmove mousemove", $.proxy(this.touchMove, this));
	}
	function defineDOM(){
		this.carousel = this.el.find(".carousel");
		this.slides = this.el.find(".slide");
		this.slideCount = this.slides.length;
	}
	function handleArrow(e){
		if(this.isAnimate) return;
		this.isAnimate = true;
		
		var target = $(e.target);
		target.hasClass("left") ? this.current-- : this.current++;

		if(this.current >= this.slideCount - 1) this.current = this.slideCount - 1;
		if(this.current <= 0) this.current = 0;
		this.changeSlide();
		this.updateAnimationState();

		return false;
	}
	function touchStart(e){
		if(this.isPressed || this.isAnimate) return;
		this.isPressed = true;
		this.isAnimate = true;

		this.startX = e.originalEvent.pageX || e.originalEvent.changedTouches[0].pageX;
		this.setSlideGroup();
		this.prevSlide.addClass("left");
		this.nextSlide.addClass("right");

		$(window).one("touchend mouseup", function(e){
			e.preventDefault();
			this.touchEnd();
		}.bind(this));

		return false;
	}
	function touchMove(e){
		if(!this.isPressed) return;

		this.moveX = e.originalEvent.pageX || e.originalEvent.changedTouches[0].pageX;
		this.delta = this.getDelta();

		this.setSlideGroup();
		if(this.delta > 0 && !this.nextSlide.length || this.delta < 0 && this.prevSlide.length <= 0){
			 this.delta /= 15
		};

		this.slides.css({
			transform: "translateX("+ this.delta * -1 +"px)"
		});

		return false;
	}
	function touchEnd(){

		this.slides.css(transform, "translateX(0px)").removeClass("left right active");

		if(this.delta < 0 && this.prevSlide.length){
			this.prevSlide.addClass("active");
		} else if(this.delta > 0 && this.nextSlide.length){
			this.nextSlide.addClass("active")
		} else{
			this.activeSlide.addClass("active");
		}


		this.isPressed = false;
		this.isAnimate = false;
	}
	function getDelta(){
		return this.startX - this.moveX;
	}
	function setSlideGroup(){
		this.activeSlide = this.slides.filter(".active");
		this.prevSlide = this.activeSlide.prev(".slide");
		this.nextSlide = this.activeSlide.next(".slide");
	}
	function changeSlide(){
		this.slides.eq(this.current).prev().removeClass("right").addClass("left");
		this.slides.eq(this.current).next().removeClass("left").addClass("right");
		this.slides.removeClass("active").eq(this.current).addClass("active");
	}
	function updateAnimationState(){
		window.setTimeout(function(){
			this.isPressed = false;
			this.isAnimate = false;
		}.bind(this), 500);
	}

	$.fn[pluginName] = function(options){
		return this.each(function(){
			if(!$.data(this, "plugin" + pluginName)) $.data(this, "plugin" + pluginName, new Plugin(this, options));
		});
	}

})($, window, v);