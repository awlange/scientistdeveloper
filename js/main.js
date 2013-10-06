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

$( document ).ready( function(){
  for (var nav in navs) {
    navClick(nav, navs[nav]);
    navHover(nav);
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
  var setClasses = ["page-setToLeft", "page-setToNormal", "page-setToRight"]; 
  for (var i in setClasses) {
    if ($(page).hasClass(setClasses[i])) {
  	  $(page).removeClass(setClasses[i]);
    }
  }	
};

var clearMoves = function(page) {
  var moveClasses = [
    "page-moveToLeft", 
    "page-moveToNormal", 
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

var navClick = function(navClick, pageClick) {
  $(navClick).click( function(){ 	 	
  	var pageCurrent = getCurrentPage(); 	
  	if (pageClick != pageCurrent) {	
  	  var navCurrent = getCurrentNav();	
  	  
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

  });
};

var navHover = function(navHover) {
  var navCurrent = getCurrentNav();
  if (navHover != navCurrent) {
  	var x = 1;
  }	
};
