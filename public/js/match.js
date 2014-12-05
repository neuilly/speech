var said = [];
var index = -1;

function Match(word){
  var quote = "crime against kansas It is the rape of a virgin compelling it to hateful embrace of slavery Such Crime and such criminal is my duty to expose. Apologies offered for the Crime must be torn away so that it shall stand forth without a single rag to cover its vileness True Remedy must be shown Slavery stands erect and trampling upon all the cherished liberties of the speech the press the bar the trial by jury or electorial franchise All this was done in the name of Popular Sovereignty this is the close of the tragedy Popular Sovereignty has ended in Popular Slavery Profession with which you began of All by the People is lost in the wretched reality of Nothing for the People Let the voters while rejoicing in their rights help guard equal rights of distant fellow citizens that shrines of popular institutions now desecrated In just regard for the free labor subjugated to Tyrannical Usurpation in the name of the Constitution outraged of the Laws trampled down of Justice banished of Humanity degraded of Peace destroyed of Freedom crushed to earth In the service of perfect freedom I make this last appeal";
  var input = word.split(" ");
  var fnd =[];
  var quote_array=quote.split(" ");
 
  index = -1;
  for (var i=0;i<input.length;++i){
    var rex = new RegExp("^"+input[i]+"$","i")
    var re = input[i];
    var bool = false;
    var count =0;
      for(var j =0; j<quote_array.length;j++){
        var tmp = quote_array[j].match(rex);
        if(tmp!==null) {
          var n = tmp[0].length;
        if(n>0){
          count++;
          console.log(count);
          index = j;
          color(count,index);
          //index =-1;
          /*
          console.log(said);
          for(var k =0; k<said.length;k++){
            if(said[k]==tmp[0]) count++;
            console.log(count);          
          }
          if(count==0){
            index =j;
          }else{
            said.push(tmp[0]);
            count--;
            console.log(count);
            continue;
         */}
        }
      }
  }      
}

function color(count, index){
  var img = document.getElementById("word_"+index);
  var w = img.width;
  var h = img.height;
  var rect = img.getBoundingClientRect();
  var t = rect.top;
  var l = rect.left;
  var canvas = document.createElement("div");
  canvas.className ="canvas";
  canvas.setAttribute("style", "width:"+w+"px; height:"+h+"px; top:"+t+"px; left:"+l+"px"); 
  //var ctx = canvas.getContext("2d");
  //ctx.drawImage(img,0,0);
  //canvas.setAttribute("style", "width:"+w+"px; height:"+h+"px; top:"+t+"px; left:"+l+"px"); 
  speech.appendChild(canvas); 
  //index =-1;
  /*  index= -1;
            bool = true
            said.push(tmp[0]);
            break;
    */      
}