sound="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
scoreleftWrist=0;
scorerightWrist=0;
rightWristY=0;
function setup(){
    canvas=createCanvas(500, 500)
    canvas.position(500, 200)
    video=createCapture(VIDEO)
    video.hide()

    poseNet=ml5.poseNet(video, modelLoaded)
    poseNet.on("pose", gotResults )
}
function preload(){
    sound=loadSound("music.mp3")
}
function draw(){
    image(video,0, 0, 500, 500)
    fill(200, 0 ,0 )
    stroke(200, 0 ,0 )
    if(scoreleftWrist>0.1){
        circle(leftWristX, leftWristY, 20)
       
        InNumberLeftWristY= Number(leftWristY)
        remove_decimal= floor(InNumberLeftWristY)
       volume=remove_decimal/500
       sound.setVolume(volume)
       document.getElementById("volume").innerHTML = volume

       
    }
    if(scorerightWrist>0.1){
        circle(rightWristX,rightWristY, 20)
         if(rightWristY>0 && rightWristY<100){
            document.getElementById("speed").innerHTML="0.5"
            sound.rate(0.5)
            console.log(sound.rate())
        }

        else if(rightWristY>100 && rightWristY<200){
            document.getElementById("speed").innerHTML="1"
            sound.rate(1)
            console.log(sound.rate())
        }

         else if(rightWristY>200 && rightWristY<300){
            document.getElementById("speed").innerHTML="1.5"
            sound.rate(1.5)
            console.log(sound.rate())
            
        }

        else if(rightWristY>300 && rightWristY<400){
            document.getElementById("speed").innerHTML="2"
            sound.rate(2)
            console.log(sound.rate())
        }

       else if(rightWristY>400 && rightWristY<500){
            document.getElementById("speed").innerHTML="2.5"
            sound.rate(2.5)
            console.log(sound.rate())
        }
     }

 }



function play(){
    sound.play()
    sound.setVolume(1)
    sound.rate(1)
}
function stop(){
    sound.stop()
}
function modelLoaded(){
    console.log("Model Is loaded")
    
}
 function gotResults(results){
     if(results.length>1){
         
         console.log(results)
         leftWristX=results[0].pose.leftWrist.x;
         leftWristY=results[0].pose.leftWrist.y;
         console.log("left wrist x - " + leftWristX + "left wrist y - " + leftWristY )

         rightWristX=results[0].pose.rightWrist.x;
         rightWristY=results[0].pose.rightWrist.y;
         console.log("right wrist x - " + rightWristX + "right wrist y - " + rightWristX )

         scoreleftWrist=results[0].pose.keypoints[9].score;
         scorerightWrist=results[0].pose.keypoints[10].score;

         
     
 }
}