function setup() {
    canvas=createCanvas(400, 300)
    canvas.position(450,250)
    background("white") 
    canvas.mouseReleased(classifycanvas)
    synth=window.speechSynthesis
}

function clean_canvas() {
    background("white")
} 


function preload() {
    classifier=ml5.imageClassifier("DoodleNet")
}

function draw() {
   strokeWeight(11) 
   stroke(0)
   if(mouseIsPressed)
   {
       line(pmouseX,pmouseY,mouseX,mouseY)
   }
}

function classifycanvas() {
    classifier.classify(canvas,gotResult)
}
    
function gotResult(error,results) {
    if(error){
        console.error(error)
    }

    console.log(results)
    document.getElementById("label").innerHTML="label:"+results[0].label
    document.getElementById("confidence").innerHTML="confidence"+Math.round(results[0].confidence*100)+"%"
    utterThis=new SpeechSynthesisUtterance(results[0].label)
    synth.speak(utterThis)
}
