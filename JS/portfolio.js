(function() {

     'use strict';


        // Function to animate the scroll
        function scrollIt (target) {


            // Calculate how far and how fast to scroll

            var rateOfIncrementation=25;
            var startLocation = window.pageYOffset;
       		var endLocation = target.offsetTop;
 			var distance = endLocation - startLocation;
	        var increments = distance/rateOfIncrementation;
	        var stopAnimation;

            // Scroll the page by an increment, and check if it's time to stop
            var animateScroll = function () {
                window.scrollBy(0, increments);
                stopAnimation();
            };

            // If scrolling down
            if ( increments >= 0 ) {
                // Stop animation when you reach the anchor OR the bottom of the page
                stopAnimation = function () {
                    var travelled = window.pageYOffset;
                    if ( (travelled >= (endLocation - increments)) || ((window.innerHeight + travelled) >= document.body.offsetHeight) ) {
                        clearInterval(runAnimation);
                    }
                };
            }
            // If scrolling up
            else {
                // Stop animation when you reach the anchor OR the top of the page
                stopAnimation = function () {
                    var travelled = window.pageYOffset;
                    if ( travelled <= (endLocation || 0) ) {
                        clearInterval(runAnimation);
                    }
                };
            }

            // Loop the animation function
            var runAnimation = setInterval(animateScroll,20);
       
        };


        // Define smooth scroll links that point to where you want to go

        var menuLabel=document.querySelectorAll('.menuLabel');

     //For each of these scroll links get the associated anchors and also
     //the associated inputs, which will determine which menu label will
     //get highlighted by our CSS code

     [].forEach.call(menuLabel,function(element){

            //Determine which input is associated with the currently checked label
           // var parentLI=element.parentElement;
          //  var associatedInput=parentLI.previousElementSibling;

            //Determine what anchor is associated with that menuLabel
            var associatedAnchor=element.firstElementChild;

            //start scroll for the associated anchor if Label has been clicked
            //Remember: The label holds the '<a>' anchor link

            element.addEventListener('click', function(event){
                // Prevent the default link behavior
                event.preventDefault(); 


                    startScroll(associatedAnchor);
                           
            });
            
        });        

        function startScroll(link){

            // On click of the element pointing to the anchor commence the scroll

                link.addEventListener('click', letsRoll(link),false); 


             function letsRoll(link){ //ISUE IS THIS CLICK ON THE A LINK COMING FROM AboVE

                // Prevent the default link behavior
               // link.preventDefault();

                //Check the appropriate input to highlight the label

                var parentLabel=link.parentElement;
                var parentLI=parentLabel.parentElement;
                var associatedInput=parentLI.previousElementSibling;
                associatedInput.checked="true";

                //create new button as soon as a scroll has started

                var allContent=document.getElementById("allContent");
                var scrollToTop=document.createElement('BUTTON');
                var text=document.createTextNode('Back To Top');
                scrollToTop.appendChild(text);
                scrollToTop.className='link2Top anchor';
                allContent.appendChild(scrollToTop);

                //Get the destination section where we want to end up
                //and start the scroll
                var targetId = link.getAttribute('href');
                var targetElement = document.querySelector(targetId);

                // If the anchor exists
                if (targetElement) {
                    // Scroll to the anchor
                    scrollIt(targetElement);
                };

                //Check if the button clicked is the 'Back To Top' button
                //and if so, commence the scroll to the top

                scrollToTop.addEventListener('click',function(event){
                    event.preventDefault();
                    var topId=document.body.getAttribute('id');
                    var top=document.querySelector('#'+topId);
                    scrollIt(top);
  
            }, false);


        };


        };


 })();
