window.onload=(function(){

  `use strict`;

  let total=document.getElementById(`total`);

  let display=document.getElementById(`display`);

  let numberKeys=document.getElementsByClassName(`nums`);

  let numOnly, //whole number portion of the display

      theDisplay, //display area of the calculator

      theCode, //ASCII code of number key pressed

      newDisplay, //updated display

      frontDisplay, //front portion of display

      answer, //vslue after clicking the equal key

      j=0, //Used to count all characters up to the LATEST symbol

      k=0, //Used in determining what to do when DOT is pressed

      clearFlag=true; //Display is initially 0 or when the `C` key hit;

  for(let i=0; i<numberKeys.length;i++){

     numOnly=``;

     theDisplay=``;


  	numberKeys[i].addEventListener(`click`, event => {

      let thisKey=numberKeys[i];


       theCode=(thisKey.innerHTML).charCodeAt();


      if(thisKey.innerHTML!=Number(thisKey.innerHTML) && thisKey.innerHTML!=`.` &&
          theCode!==177 && thisKey.innerHTML!==`DEL` && thisKey.innerHTML!==`C`) {

          if((theDisplay[theDisplay.length-1]==Number(theDisplay[theDisplay.length-1])||
            theDisplay[theDisplay.length-1]==`.`) && theCode!==247) {

            theDisplay=theDisplay+thisKey.innerHTML;

            j=theDisplay.length-1;
             k=j;  

          } else if(theCode===247){

             if (theDisplay[theDisplay.length-1]==Number(theDisplay[theDisplay.length-1]) ||
              theDisplay[theDisplay.length-1]==`.`) {

                 theDisplay=`${theDisplay}/`;
                 j=theDisplay.length-1;
                 k=j; 

            } else {

               newDisplay=``;

              for(let n=0;n<theDisplay.length-1;n++){

               newDisplay=newDisplay+theDisplay[n];
          };  
             theDisplay=`${newDisplay}/`;  

          };  


              
           } else {

               newDisplay=``; 

              for(let n=0;n<theDisplay.length-1;n++) {

                newDisplay=newDisplay+theDisplay[n];
              };  

              theDisplay=newDisplay+thisKey.innerHTML;  

          };


      } else if (thisKey.innerHTML==`.`) {

             if((theDisplay.substr(k)).indexOf(`.`)<0) {

              if(theDisplay[theDisplay.length-1]!=Number(theDisplay[theDisplay.length-1])){

               theDisplay=`${theDisplay}0.`;

               j=theDisplay.length-1;

             } else theDisplay=`${theDisplay}.`;

               j=theDisplay.length-1;              

             };
            
      } else if(thisKey.innerHTML==Number(thisKey.innerHTML)){

            if(clearFlag){

              theDisplay=``;

              clearFlag=false;
            }

            theDisplay=theDisplay+thisKey.innerHTML;

            j=theDisplay.length-1;


      } else if(theCode===177){

             frontDisplay=``;

             if(k!==0){

               numOnly=theDisplay.substr(k+1);

                for (let m=0;m<k+1;m++){

                  frontDisplay=frontDisplay+theDisplay[m];

                 }; 


                 if(theDisplay[(k+1)]!==`-`){

                  numOnly=`-${numOnly}`;

                 } else{

                  numOnly=numOnly.substr(1);

                 }

                 if(frontDisplay[frontDisplay.length-1]!==`-`){

                   theDisplay=frontDisplay+numOnly; 

                 } else {

                    numOnly=numOnly.substr(1);

                    frontDisplay=frontDisplay.substring(0,(frontDisplay.length-1));

                    theDisplay=`${frontDisplay}+${numOnly}`;
                 }
                

                 

             } else {

                if(theDisplay[0]!==`-`){

                numOnly=theDisplay;

                theDisplay=`-${numOnly}`;

                } else {

                  numOnly=theDisplay.substr(1);

                  theDisplay=numOnly;

                }

             } 

             j=theDisplay.length-1;

        } else if (thisKey.innerHTML===`DEL`) {

           newDisplay=``;

          for(let n=0;n<theDisplay.length-1;n++){

            newDisplay=newDisplay+theDisplay[n];

          };
          j-=1;

          theDisplay=newDisplay;

          if(theDisplay[theDisplay.length-1]!=Number(theDisplay[theDisplay.length-1]) &&
            theDisplay[theDisplay.length-1]!=`.`){

            if(theDisplay[theDisplay.length-2]!=Number(theDisplay[theDisplay.length-1]) &&
               theDisplay[theDisplay.length-2]!=`.`){

               k=j-1;

            } else k=j;

          };

        } else if(thisKey.innerHTML===`C`) {

          theDisplay=`0`;

          clearFlag=true;

        };
      

         display.value=theDisplay;
  	}); 





      total.addEventListener(`click`, event => {

         answer=display.value;

         display.value=eval(answer);

         theDisplay=eval(answer).toString();

         j=0;

         k=0;

         numOnly=``;
       
      }); //eventListener

  }; //for loop


}(window.console));