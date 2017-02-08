window.onload=(function(){
  var numberKeys=document.getElementsByClassName("nums");
  var total=document.getElementById("total");
  var functions=document.getElementsByClassName("functions");
  var logic=document.getElementsByClassName("logic");
  var fraction=document.getElementsByClassName("fraction");


  var display=document.getElementById("display"),
  j=0, //Used to count all characters up to the LATEST symbol
  k=0, //Used in determining what to do when DOT is pressed
  clearFlag=true; //Display is initially 0 or when the "C" key hit


  for(var i=0; i<numberKeys.length;i++){

    var numOnly="";
    var theDisplay="";


  	numberKeys[i].addEventListener('click',function(event){

      var theCode=(this.innerHTML).charCodeAt();


      if(this.innerHTML!=Number(this.innerHTML) && this.innerHTML!="." &&
          theCode!==177 && this.innerHTML!=="DEL" && this.innerHTML!=="C"){
          if((theDisplay[theDisplay.length-1]==Number(theDisplay[theDisplay.length-1])||
            theDisplay[theDisplay.length-1]==".") && theCode!==247){
            theDisplay=theDisplay+this.innerHTML;

            j=theDisplay.length-1;
             k=j;  

          } else if(theCode===247){
             if (theDisplay[theDisplay.length-1]==Number(theDisplay[theDisplay.length-1]) ||
              theDisplay[theDisplay.length-1]=="."){
                 theDisplay=theDisplay+"/";
                 j=theDisplay.length-1;
                 k=j; 
            } else {
              var newDisplay="";
              for(var n=0;n<theDisplay.length-1;n++){
               newDisplay=newDisplay+theDisplay[n];
          };  
             theDisplay=newDisplay+"/";  

          };              
              
           } else {
              var newDisplay=""; 
              for(var n=0;n<theDisplay.length-1;n++){
               newDisplay=newDisplay+theDisplay[n];
          };  
             theDisplay=newDisplay+this.innerHTML;  

          };
      } else if (this.innerHTML=="."){
             if((theDisplay.substr(k)).indexOf(".")<0){
              if(theDisplay[theDisplay.length-1]!=Number(theDisplay[theDisplay.length-1])){
               theDisplay=theDisplay+"0.";

               j=theDisplay.length-1;
             } else theDisplay=theDisplay+".";
              

               j=theDisplay.length-1;              

             };
            
      } else if(this.innerHTML==Number(this.innerHTML)){
            if(clearFlag){
              theDisplay="";
              clearFlag=false;
            }
            theDisplay=theDisplay+this.innerHTML;
               j=theDisplay.length-1;


      } else if(theCode===177){

            var frontDisplay="";
             if(k!==0){
               numOnly=theDisplay.substr(k+1);

                for (var m=0;m<k+1;m++){
                  frontDisplay=frontDisplay+theDisplay[m];
                 }; 


                 if(theDisplay[(k+1)]!=="-"){
                  numOnly="-"+numOnly;
                 } else{
                  numOnly=numOnly.substr(1);
                 }

                 if(frontDisplay[frontDisplay.length-1]!=="-"){
                   theDisplay=frontDisplay+numOnly;                   
                 } else {
                    numOnly=numOnly.substr(1);
                    frontDisplay=frontDisplay.substring(0,(frontDisplay.length-1));
                    theDisplay=frontDisplay+"+"+numOnly;
                 }
                

                 

             } else {
                if(theDisplay[0]!=="-"){
                numOnly=theDisplay;
                theDisplay="-"+numOnly;
                } else {
                  numOnly=theDisplay.substr(1);
                  theDisplay=numOnly;
                }

             } 

             j=theDisplay.length-1;

        } else if (this.innerHTML==="DEL") {
          var newDisplay="";
          for(var n=0;n<theDisplay.length-1;n++){
            newDisplay=newDisplay+theDisplay[n];
          };
          j-=1;
          theDisplay=newDisplay;
          if(theDisplay[theDisplay.length-1]!=Number(theDisplay[theDisplay.length-1]) &&
            theDisplay[theDisplay.length-1]!="."){
            if(theDisplay[theDisplay.length-2]!=Number(theDisplay[theDisplay.length-1]) &&
               theDisplay[theDisplay.length-2]!="."){
               k=j-1;
            } else k=j;
          };
        } else if(this.innerHTML==="C") {
          theDisplay="0";
          clearFlag=true;
        };
      

         display.value=theDisplay;
  	}); 

      total.addEventListener('click',function(event){

         var answer=display.value;
         display.value=eval(answer);
         theDisplay=eval(answer).toString();
         j=0;
         k=0;
         numOnly="";
       
      });

  };


}(window.console));