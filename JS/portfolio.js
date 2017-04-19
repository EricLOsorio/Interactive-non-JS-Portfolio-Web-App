(function() {

     'use strict';

     var topNav=document.getElementById("topNavBar"); //the top Nav Bar
     var scrollSideBar=document.getElementById('scrollSideBar'); //The Side Scroll Nav Bar

// Define smooth scroll links that point to where you want to go

     var menuLabel=document.querySelectorAll('.topNavBar__menuLabel');
     var topBarInputs=document.querySelectorAll('input[name=navRadio]');
     var sideBarInputs=document.querySelectorAll('input[name=sideScroll]');
     var scrollToTop=document.getElementsByClassName('link2Top')[0];



        window.addEventListener('scroll', function(event){
          //  var posi = window.getComputedStyle(topNav, null).getPropertyValue("position");
            var loc=window.pageYOffset;


             //Hide the top nav bar

           topNav.style.top="-100px";
           topNav.style.transition= "top 1s";

           //Slide in the side bar upon scroll

           scrollSideBar.style.left="0";
           scrollSideBar.style.transition="left 1s";


           if(loc===0){
            topNav.style.top="-10px";
            scrollSideBar.style.left="-150px";
            scrollToTop.style.display="none";
           } else{
              scrollToTop.style.display="block";
           }


            if(loc>=0 && loc<=250){
                topBarInputs[0].checked=true;
                sideBarInputs[0].checked=true;
            } else if (loc>250 && loc<1300){
                topBarInputs[1].checked=true;
                sideBarInputs[1].checked=true;
            } else if(loc>=1300 && loc<2198){
                topBarInputs[2].checked=true;
                sideBarInputs[2].checked=true;;
            } else if(loc>2198){
                topBarInputs[3].checked=true;
                sideBarInputs[3].checked=true;
            }

        })


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



     //For each of the scroll links get the associated anchors and also
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
/**********************************************************************************
                var allContent=document.getElementById("allContent");
                var scrollToTop=document.createElement('BUTTON');
                var text=document.createTextNode('Back To Top');
                scrollToTop.appendChild(text);
                scrollToTop.className='link2Top topNavBar__anchor';
                allContent.appendChild(scrollToTop);
***********************************************************************************/


                //Get the destination section where we want to end up
                //and start the scroll
                var targetId = link.getAttribute('href');
                var targetElement = document.querySelector(targetId);

                // If the anchor exists
                if (targetElement) {
                    // Scroll to the anchor
                    scrollIt(targetElement);
                };

   
        };


        };

                     //Check if the button clicked is the 'Back To Top' button
                //and if so, commence the scroll to the top

                scrollToTop.addEventListener('click',function(event){
                    event.preventDefault();
                    var topId=document.body.getAttribute('id');
                    var top=document.querySelector('#'+topId);
                    scrollIt(top);


  
            }, false);


 })();
