var navs = {
  "#nav-home": "#content-home",
  "#nav-resume": "#content-resume",
  "#nav-science": "#content-science",
  "#nav-development": "#content-development",
  "#nav-contact": "#content-contact"
};
var pages = {
  "#content-home": 0,
  "#content-resume": 1,
  "#content-science": 2,
  "#content-development": 3,
  "#content-contact": 4
};
var pageToPageHeight = {
  "#content-home": "content-home-height",
  "#content-resume": "content-resume-height",
  "#content-science": "content-science-height",
  "#content-development": "content-development-height",
  "#content-contact": "content-contact-height"
};
var pageHeights = {
  "content-home-height": "520px",
  "content-resume-height": "3500px",
  "content-science-height": "100px",
  "content-development-height": "150px",
  "content-contact-height": "50px"
}; 
var dropDowns = {
  // clicked dropdown       // element to scroll to   // nav container of dropdown 
  "#dropdown-publications": [ "#resume-publications", "#nav-resume" ]
};

$(document).ready( function(){
  for (var nav in navs) {
    navClick(nav);
  }
  for (var dropdown in dropDowns) {
  	scrollTo(dropdown);
  }
});

var getCurrentPage = function() {
  for (var page in pages) {
  	if ($(page).hasClass("page-current")) {
      return page;
  	}
  }	 
  return "#none";	
};

var getCurrentNav = function() {
  for (var nav in navs) {
  	if ($(nav).hasClass("nav-current")) {
      return nav;
  	}
  }	 
  return "#none";	
};

var isPageALeftOfPageB = function(pageA, pageB) {
  return pages[pageA] < pages[pageB];
};
var isPageARightOfPageB = function(pageA, pageB) {
  return pages[pageA] > pages[pageB];
};

var clearSets = function(page) {
  var setClasses = ["page-setToLeft", "page-setToCenter", "page-setToRight"]; 
  for (var i in setClasses) {
    if ($(page).hasClass(setClasses[i])) {
  	  $(page).removeClass(setClasses[i]);
    }
  }	
};

var clearMoves = function(page) {
  var moveClasses = [
    "page-moveToLeft", 
    "page-moveToCenter", 
    "page-moveToRight",
    "page-moveFromLeft",
    "page-moveFromRight"
  ]; 
  for (var i in moveClasses) {
    if ($(page).hasClass(moveClasses[i])) {
  	  $(page).removeClass(moveClasses[i]);
    }
  }	
};

var navTransition = function(navFrom, navTo) {
  $(navFrom).removeClass("nav-current");
  $(navTo).addClass("nav-current");	
};

var pageHeightTransition = function(pageFrom, pageTo) {
  $("#content-wrapper").removeClass(pageToPageHeight[pageFrom]);
  $("#page-background").removeClass(pageToPageHeight[pageFrom]);
  $("#content-wrapper").addClass(pageToPageHeight[pageTo]);
  $("#page-background").addClass(pageToPageHeight[pageTo]);	
};

var navClick = function(navClick) {	
  $(navClick).click( function(e) { 	 	
    // Prevent jumping to anchor (top of page) when clicked. e is for event.
    e.preventDefault();
  	switchPage(navClick);
  });
};

function switchPage(navClick) {	
  	var pageClick = navs[navClick];
    var pageCurrent = getCurrentPage(); 	
  	var pageChanged = false;
  	
  	if (pageClick != pageCurrent) {	
  	  pageChanged = true;
  	  var navCurrent = getCurrentNav();	
  	  
  	  // change height of page wrapper to the clicked page height
  	  pageHeightTransition(pageCurrent, pageClick);
  	  
  	  // clear previous moves and/or positioning
  	  clearMoves(pageClick);
  	  clearMoves(pageCurrent);
  	  clearSets(pageCurrent);
      clearSets(pageClick);
      
      // check the pages relative positioning, and then move pages and navs accordingly
  	  if (isPageALeftOfPageB(pageCurrent, pageClick)) {
        $(pageCurrent).addClass("page-moveToLeft").removeClass("page-current");
        $(pageClick).addClass("page-moveFromRight").addClass("page-current");
        navTransition(navCurrent, navClick);
      }
      else {
        $(pageCurrent).addClass("page-moveToRight").removeClass("page-current");
        $(pageClick).addClass("page-moveFromLeft").addClass("page-current"); 
        navTransition(navCurrent, navClick);	
      }            
    }
    return pageChanged;
};

var scrollTo = function(dropDownClick) {
  $(dropDownClick).click( function(e) {
  	// First make sure we are on the right displayed page
  	var navClick = dropDowns[dropDownClick][1];
  	var doDelay = switchPage(navClick);
  	// Then scroll
  	var goToElement = dropDowns[dropDownClick][0]; 
    $('html,body').animate({scrollTop: $(goToElement).offset().top});
  });
};

var scrollToTop = function() {
  $('html,body').animate({scrollTop: 0});
};
