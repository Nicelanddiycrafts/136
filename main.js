var video="";
var stat="";
objects=[];
var input="";

function preload(){

}

function setup(){
canvas = createCanvas(360,360);
canvas.center();

video = createCapture(VIDEO);
video.hide();
}

function draw(){
image(video,0,0,360,360);
if(stat != ""){
    od.detect( video, gotResult);
  for(i=0; i<objects.length; i++){

      if(input == objects){
          video.stop()
          objectDetector.detect(gotResult);
          document.getElementById('e').innerHTML= "Status: Object Detected";
          sp= speechSynthesis();
        utterThis = SpeechSynthesisUtterance(input + 'found');
        sp.speak(utterThis);
        document.getElementById('w').innerHTML= input+ " Found";

      }else{
        document.getElementById('w').innerHTML= input+ " Not Found"
      }

      fill('red');
      stroke('red');
      nofill();
      p = floor(objects[i].confidence*100);
      lb= objects[i].label + " "+ p + " % "; 
      text(lb, objects[i].x+15, objects[i].y+15);
      rect(objects[i].x,objects[i].y,objects[i].width, objects[i].height);
  }
}
}

function start(){
   od=ml5.objectDetector('cocossd',modelLoaded);
   document.getElementById('e').innerHTML = "Status: Detecting Object";
   var input = document.getElementById('q').innerHTML;

}

function modelLoaded(){
    console.log('model loaded');
    stat= true;
    video.loop();
    video.volume(0);
    video.speed(1)
}

function gotResult(error, results){
if(error){
    console.error(error);
}
else{
    console.log(results);
    objects = results;
}
}