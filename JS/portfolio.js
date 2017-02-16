(function() {

     'use strict';


        // Function to animate the scroll
        var scrollIt = function (link) {




            // Calculate how far and how fast to scroll
            var rateOfIncrementation=25;
            var startLocation = window.pageYOffset;
            var endLocation = link.offsetTop;
            var distance = endLocation - startLocation;
            var increments = distance/rateOfIncrementation;
            var parentObj = link.offsetParent; 
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





        // Define smooth scroll links
        var menuLabel = document.querySelectorAll('.menuLabel');









        // For each smooth scroll link
        [].forEach.call(menuLabel, function (link) {

            // When the smooth scroll link is clicked
            link.addEventListener('click', function(event) {

                // Prevent the default link behavior
                event.preventDefault();

                // Get anchor link and calculate distance from the top
                var targetId = link.getAttribute('href');
                var targetElement = document.querySelector(targetId);

                // If the anchor exists
                if (targetElement) {
                    // Scroll to the anchor
                    scrollIt(targetElement);
                }

            }, false);

        });


 })();
