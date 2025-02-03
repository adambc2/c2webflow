$(document).ready(function(){
	console.log("case-studies-slider")
	$('.case-studies-slider').multislider({
	  // endless scrolling
	  continuous: false,

	  // slide all visible slides, or just one at a time
	  slideAll: false,  
  
	  // autoplay interval
	  // 0 or 'false' prevents auto-sliding
	  interval: 8000, 

	  // duration of slide animation
	  duration: 500,      

	  // pause carousel on hover
	  hoverPause: true, 
  
	  // pause above specified screen width
	  pauseAbove: null,   
  
	  // pause below specified screen width
	  pauseBelow: null   
  
	})


});
