(function() {

     'use strict';

     var topNav=document.getElementById("topNavBar"); //the top Nav Bar
     var scrollSideBar=document.getElementById('scrollSideBar'); //The Side Scroll Nav Bar

// Define smooth scroll links that point to where you want to go

     var menuLabel=document.querySelectorAll('.topNavBar__menuLabel');
     var topBarInputs=document.querySelectorAll('input[name=navRadio]');
     var sideBarInputs=document.querySelectorAll('input[name=sideScroll]');
     var scrollToTop=document.getElementsByClassName('link2Top')[0];

     var large=window.matchMedia("(max-width:1024px)");
     var defaultScreen=window.matchMedia("(min-width:1025px");
     var randomNum=1;
     var factButton=document.getElementById('factButton');
     var factText=document.getElementById('factText');



        window.addEventListener('scroll', function(event){
          //  var posi = window.getComputedStyle(topNav, null).getPropertyValue("position");
            var loc=window.pageYOffset;
          // slider variable representing the sliding arrow for the side scroll menu
            var slider=document.getElementById('slide');

          if(!defaultScreen.matches){

           slider.addEventListener('click', function(event){
              scrollSideBar.style.left="-80px";
              scrollSideBar.style.transition="left 1s";
              scrollSideBar.style.zIndex="1000";
              slider.style.left="-160px";
              slider.style.transition="0.5s";
            });


            scrollSideBar.addEventListener(('click'), function(event){
              scrollSideBar.style.left="-160px";
              slider.style.left="0";
              scrollSideBar.style.transition="0.5s";
              slider.style.transition="0.5s";
              slider.style.zIndex="1000";
            },false);

          }

 
             //Hide the top nav bar

           topNav.style.top="-100px";
           topNav.style.transition= "top 1s";

           //Slide in the side bar upon scroll

           if(large.matches){
            //  scrollSideBar.style.left="-80px";
             // scrollSideBar.style.transition="left 1s";
              //scrollSideBar.style.zIndex="1000";
              slider.style.left="0px";
              slider.style.transition="left 0.5s";
           } else{
               scrollSideBar.style.left="0";
               scrollSideBar.style.transition="left 1s";              
           }


           if(loc===0){
            topNav.style.top="-10px";
            scrollSideBar.style.left="-160px";
            scrollToTop.style.display="none";
            slider.style.left="-150px";
            slider.style.transition="left 0.5s";
           } else{
               if(loc!==0 && defaultScreen.matches){
                 scrollToTop.style.display="block";                
               }

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

        //Wait for window to load and then get random numbers facts from numberapi site

        window.addEventListener('load', function(){
          randomNum = Math.floor(Math.random() * 100);

          var xhr= new XMLHttpRequest();
        
          xhr.onload = function(){
           if (xhr.status === 200) {
            var text=document.createTextNode(xhr.response);
             factText.appendChild(text);
           };

          };

          xhr.open('GET','https://numbersapi.p.mashape.com/'+randomNum+'/trivia?mashape-key=D3M5a9cS8QmshH8z6Xqs1CiPPWVGp1kGJ61jsnJYodMZu7MFXO');

          xhr.send();
        })


        factButton.addEventListener('click',function(){
          
          var xhr= new XMLHttpRequest();

          randomNum = Math.floor(Math.random() * 100);
          factText.removeChild(factText.childNodes[0]);

          xhr.onload = function(){
           if (xhr.status === 200) {
            var text=document.createTextNode(xhr.response);
             factText.appendChild(text);
           };

          };

          xhr.open('GET','https://numbersapi.p.mashape.com/'+randomNum+'/trivia?mashape-key=D3M5a9cS8QmshH8z6Xqs1CiPPWVGp1kGJ61jsnJYodMZu7MFXO');

          xhr.send();          
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
