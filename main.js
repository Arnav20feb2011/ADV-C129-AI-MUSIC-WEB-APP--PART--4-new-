song1="";
song2="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
song1_status="";
song2_status="";
scoreleftWrist=0;
scorerightWrist=0;


function setup(){
    canvas = createCanvas(400,400);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotposes);
}

function preload(){
song1=loadSound("song1.mp3");
song2=loadSound("song2.mp3");

}


function gotposes(results){
    if(results.length > 0){
        console.log(results);

        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreleftWrist);

        scorerightWrist = results[0].pose.keypoints[10].score;
        console.log(scorerightWrist);

        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        console.log("leftWrist_x = "+leftWrist_x+" leftWrist_y = "+leftWrist_y);

        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        console.log("rightWrist_x = "+rightWrist_x+" rightWrist_y = "+rightWrist_y);
    }
}


function draw(){
    image(video, 0, 0,400,400);


    fill("#00ff00");
    stroke("#ff0000"); 

    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();

if(scoreleftWrist > 0.2){

    circle(leftWrist_x,leftWrist_y,20);
   song2.stop();
    if(song1_status == false){
        song1.play();
        document.getElementById("song").innerHTML = "Falling-Trevor Danial";
    }
      

}



if(scorerightWrist > 0.2){

    circle(rightWrist_x,rightWrist_y,20);
   song1.stop();
    if(song2_status == false){
        song2.play();
        document.getElementById("song").innerHTML = "Friends-  Marshmello & Anne-Marie";
    }
   
}
}

function modelLoaded(){
    console.log("poseNet is initialised");

}

