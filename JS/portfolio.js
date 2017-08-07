window.onload=(function() {

     `use strict`;

     let topNav=document.getElementById(`topNavBar`); //the top Nav Bar

     let scrollSideBar=document.getElementById(`scrollSideBar`); //The Side Scroll Nav Bar

// Define smooth scroll links that point to where you want to go

     let menuLabel=document.querySelectorAll(`.topNavBar__menuLabel`);

     let topBarInputs=document.querySelectorAll(`input[name=navRadio]`);

     let sideBarInputs=document.querySelectorAll(`input[name=sideScroll]`);

     let scrollToTop=document.getElementsByClassName(`link2Top`)[0];

     let large=window.matchMedia(`(max-width:1024px)`);

     let defaultScreen=window.matchMedia(`(min-width:1025px`);

     let factButton=document.getElementById(`factButton`);


/*******************************COOKIE SETTINGS************************************************/

    let introMovie=document.getElementById(`introMovie`);

    let myVideo=document.getElementById(`myIntro`);

    let enter=document.getElementById(`enter`);

    let wrapper=document.getElementsByClassName(`wrapper`)[0];


    if(!document.cookie){

      introMovie.style.display=`block`;

      myVideo.load();

      myVideo.play();

      document.cookie=`intro=done`;

    } else{

      introMovie.style.display=`none`;

      wrapper.style.display=`block`;

    }

    enter.addEventListener(`click`, event=>{

      wrapper.style.display=`block`;

      introMovie.style.display=`none`;

      myVideo.autoplay = false;

      myVideo.load();

    });



/**********************************************************************************************/



        window.addEventListener(`scroll`, event=>{


            let loc=window.pageYOffset;

          // slider letiable representing the sliding arrow for the side scroll menu

            let slider=document.getElementById(`slide`);

          if(!defaultScreen.matches){

           slider.addEventListener(`click`, event=>{

              scrollSideBar.style.left=`-80px`;

              scrollSideBar.style.transition=`left 1s`;

              scrollSideBar.style.zIndex=`1000`;

              slider.style.left=`-160px`;

              slider.style.transition=`0.5s`;

            });


            scrollSideBar.addEventListener((`click`), event=>{

              scrollSideBar.style.left=`-160px`;

              slider.style.left=`0`;

              scrollSideBar.style.transition=`0.5s`;

              slider.style.transition=`0.5s`;

              slider.style.zIndex=`1000`;

            },false);

          }

 
             //Hide the top nav bar

           topNav.style.top=`-100px`;

           topNav.style.transition= `top 1s`;

           //Slide in the side bar upon scroll

           if(large.matches){


              slider.style.left=`0px`;

              slider.style.transition=`left 0.5s`;

           } else{

               scrollSideBar.style.left=`0`;

               scrollSideBar.style.transition=`left 1s`; 

           }


           if(loc===0){

            topNav.style.top=`-10px`;

            scrollSideBar.style.left=`-160px`;

            scrollToTop.style.display=`none`;

            slider.style.left=`-150px`;

            slider.style.transition=`left 0.5s`;

           } else{

               if(loc!==0 && defaultScreen.matches){

                 scrollToTop.style.display=`block`;  

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

                sideBarInputs[2].checked=true;

            } else if(loc>2198){

                topBarInputs[3].checked=true;

                sideBarInputs[3].checked=true;

            }

        })


        function randomFactGenerator(){

          let factText=document.getElementById(`factText`);

          let factorPromise = new Promise(function(resolve,reject) { //jshint esnext: true

            let xhr= new XMLHttpRequest();

            let randomNum = Math.floor(Math.random() * 100);

            if(factText.childNodes[0]){
              factText.removeChild(factText.childNodes[0]);              
            }

            xhr.onload = ()=>{

             if (xhr.status === 200) {

               let text=document.createTextNode(xhr.response);

               resolve(text);

             }

            };

            xhr.onerror = error => reject(error);


          xhr.open(`GET`,`https://numbersapi.p.mashape.com/${randomNum}/trivia?mashape-key=D3M5a9cS8QmshH8z6Xqs1CiPPWVGp1kGJ61jsnJYodMZu7MFXO`);

          xhr.send();

        });

          factorPromise.then(
            function (result){
              factText.appendChild(result);
            },
            function (error){
              console.log(error);
            }
          );


        }


        //Wait for window to load and then get random numbers facts from numberapi site

        window.addEventListener(`load`, () => {

          randomFactGenerator();

        })


        factButton.addEventListener(`click`,()=>{

          randomFactGenerator();


        })


        // Function to animate the scroll
        function scrollIt (target) {


            // Calculate how far and how fast to scroll

          let rateOfIncrementation=25;

          let startLocation = window.pageYOffset;

       		let endLocation = target.offsetTop;

 			    let distance = endLocation - startLocation;

	        let increments = distance/rateOfIncrementation;

	        let stopAnimation;

            // Scroll the page by an increment, and check if it`s time to stop
            let animateScroll = ()=> {

                window.scrollBy(0, increments);

                stopAnimation();
            };


            // If scrolling down
            if ( increments >= 0 ) {

                // Stop animation when you reach the anchor OR the bottom of the page

                stopAnimation =  () => {

                    let travelled = window.pageYOffset;

                    if ( (travelled >= (endLocation - increments)) || ((window.innerHeight + travelled) >= document.body.offsetHeight) ) {

                        clearInterval(runAnimation);

                    }
                };
            }

            // If scrolling up

            else {

                // Stop animation when you reach the anchor OR the top of the page
                stopAnimation = () => {

                    let travelled = window.pageYOffset;

                    if ( travelled <= (endLocation || 0) ) {

                        clearInterval(runAnimation);

                    }
                };
            }

            // Loop the animation function
            let runAnimation = setInterval(animateScroll,20);
       
        }



     //For each of the scroll links get the associated anchors and also
     //the associated inputs, which will determine which menu label will
     //get highlighted by our CSS code

     [].forEach.call(menuLabel, element => {

            //Determine which input is associated with the currently checked label
           // let parentLI=element.parentElement;
          //  let associatedInput=parentLI.previousElementSibling;

            //Determine what anchor is associated with that menuLabel
            let associatedAnchor=element.firstElementChild;

            //start scroll for the associated anchor if Label has been clicked
            //Remember: The label holds the `<a>` anchor link

            element.addEventListener(`click`, event=>{
                // Prevent the default link behavior
                event.preventDefault(); 


                    startScroll(associatedAnchor);
                           
            });
            
        });        

        function startScroll(link){

            // On click of the element pointing to the anchor commence the scroll

                link.addEventListener(`click`, letsRoll(link),false); 


             function letsRoll(link){ //ISUE IS THIS CLICK ON THE A LINK COMING FROM AboVE


                //Check the appropriate input to highlight the label

                let parentLabel=link.parentElement;

                let parentLI=parentLabel.parentElement;

                let associatedInput=parentLI.previousElementSibling;

                associatedInput.checked=`true`;


                //Get the destination section where we want to end up
                //and start the scroll

                let targetId = link.getAttribute(`href`);

                let targetElement = document.querySelector(targetId);

                // If the anchor exists
                if (targetElement) {

                    // Scroll to the anchor
                    scrollIt(targetElement);
                }

   
        }


        }

                     //Check if the button clicked is the `Back To Top` button
                //and if so, commence the scroll to the top

                scrollToTop.addEventListener(`click`,event=>{

                    event.preventDefault();

                    let topId=document.body.getAttribute(`id`);

                    let top=document.querySelector(`#${topId}`);

                    scrollIt(top);


  
            }, false);


 })();
