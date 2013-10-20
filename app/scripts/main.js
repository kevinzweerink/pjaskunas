jQuery.fn.animateAuto = function(prop, speed, callback){
    var elem, height, width;
    return this.each(function(i, el){
        el = jQuery(el), elem = el.clone().css({"height":"auto","width":"auto"}).appendTo("body");
        height = elem.css("height"),
        width = elem.css("width"),
        elem.remove();
        
        if(prop === "height")
            el.animate({"height":height}, speed, callback);
        else if(prop === "width")
            el.animate({"width":width}, speed, callback);  
        else if(prop === "both")
            el.animate({"width":width,"height":height}, speed, callback);
    });  
}

var setBodyHeight = function() {
	var sidebarHeight = $(".sidebar.active").outerHeight();
	var mainHeight = $(".main").outerHeight();
	if(sidebarHeight > mainHeight) {
		$(".main").animate({
			"height":(sidebarHeight-14)+"px"
		}, 100);
	} else {
		$(".sidebar.active").animate({
			"height":(mainHeight-14)+"px"
		}, 100)
	}
}

var resetBodyHeight = function() {
	$(".main").animateAuto("height", 100);
}

var openSidebar = function(sidebar) {
	$(sidebar).css("opacity","1")
	$(sidebar).children().css("opacity","0");
	$(sidebar).addClass("active");
	window.setTimeout(function() {
		$(sidebar).children().animate({
			"opacity":"1",
		}, 100);
	}, 300);
}

var closeSidebar = function(sidebar) {
	$(sidebar).animate({"opacity":"0"}, 100, function() {
		window.setTimeout(function(){
			$(sidebar).removeClass("active");
		}, 50);
	});
}

$(document).ready(function() {
	setBodyHeight();

	$("#open-hidden").on("click", function(e) {
		e.preventDefault();
		openSidebar(".sidebar-hidden");
		setBodyHeight();
	});

	$("#open-market").on("click", function(e) {
		e.preventDefault();
		openSidebar(".sidebar-market");
		setBodyHeight();
	})

	$(".closebar").on("click", function(e) {
		e.preventDefault();
		closeSidebar(".active");
		resetBodyHeight();
	})
});