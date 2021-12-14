// this is a very simple sketch that demonstrates how to place a video cam image into a canvas 
// this is built of the sample code from sketch3 of the week7-posenet in class examples

let video;
let pose;
let img;  //adding image in
let gif_loadImg, gif_createImg;
let noseX = 0;
let noseY = 0;
let eyelX = 0;
let eyelY = 0;
let eyerX = 0;
let eyerY = 0;
let imgs = []; //Create an empty array to store variables
let song1, song2;


function preload(){
    song1 = loadSound('assets/right.mp3');
    song2 = loadSound('assets/left.mp3');
    // image from https://imgur.com/r/gifs/dlieZxv  
// gif_loadImg = loadImage('images/dlieZxv.gif')

// gif_createImg = createImg('images/dlieZxv.gif')

//image from https://www.reddit.com/r/wallpapers/comments/9ya8sp/jungle_1920_1080/ 
img = loadImage('images/jungle.jpg') 

    // image from https://www.clipartmax.com/download/m2i8A0m2K9N4G6b1_png-file-zoo-animal-silhouette-clip-art/  
img3 = loadImage('images/monkey.png')   
    


// image from https://pixabay.com/vectors/chameleon-animal-silhouette-lizard-5371466/ 
img2 = loadImage('images/chameleon-5371466_1280.png')   



// image from https://www.pinclipart.com/downpngs/hJxmi_free-animal-silhouettes-clipart-image-hippo-silhouette-png/  
img4 = loadImage('images/hippo.png')  

// image from https://www.pinclipart.com/downpngs/mhmiR_animal-silhouette-silhouette-clip-art-silhouettes-of-zoo/  
img5 = loadImage('images/snake.png')  

//imgs = [img2, img3, img4, img5]; //Store variables in an array


}


function setup(){
createCanvas(1920, 1080);
video = createCapture(VIDEO);
video.size(1920,1080);
video.hide();
poseNet = ml5.poseNet(video, modelLoaded);
poseNet.on('pose', gotPoses) 
}

function modelLoaded(){
    console.log("modelLoaded function has been called so this work!!!!");
};

function gotPoses(poses){
   // console.log(poses);
    if( poses.length >0 ){
        pose = poses[0].pose;
       let nX = poses[0].pose.keypoints[0].position.x;
       let nY = poses[0].pose.keypoints[0].position.y;
       let elX = poses[0].pose.keypoints[1].position.x;
       let elY = poses[0].pose.keypoints[1].position.y;
       let erX = poses[0].pose.keypoints[2].position.x;
       let erY = poses[0].pose.keypoints[2].position.y;

       // using lerp allowed the keypoints to be tracked more smoothly
       //Code from 'The Coding Train' https://www.youtube.com/watch?v=EA3-k9mnLHs&ab_channel=TheCodingTrain  
       noseX = lerp(noseX, nX, 0.5);
       noseY = lerp(noseY, nY, 0.5);
       eyelX = lerp(eyelX, elX, 0.5);
       eyelY = lerp(eyelY, elY, 0.5);
       eyerX = lerp(eyerX, erX, 0.5);
       eyerY = lerp(eyerY, erY, 0.5);
    } 
    
} 

function draw(){
image(video, 0, 0, windowWidth, windowHeight);
image(img, 0, 0, windowWidth, windowHeight);
// image(gif_loadImg, 0, 0, windowWidth - 100, windowHeight - 100);
// gif_createImg.position(0,0);
//tracks the distance between the nose and the left eye to messure distance
 //Code from 'The Coding Train' https://www.youtube.com/watch?v=EA3-k9mnLHs&ab_channel=TheCodingTrain  
let d = dist(noseX, noseY, eyelX, eyelY);
 
if(pose){
   
    //the array is put into put inot hte random function, it will chosse one index value at random
    //code from https://www.youtube.com/watch?v=hxjEl-pun7o&t=216s&ab_channel=JacobRivkin 
    //let randoImg = random(imgs); 
    //using distance for the diameter of the image to scale it 
    //image(randoImg, noseX-100, noseY-100, d*4, d*4);
    // Using randoImg was supposed to chose one random image from the array however becuase its in the draw fucntion it keeps generating differnt images as the sketch runs. 
  
    image(img3, noseX - 200, noseY - 300, d*4, d*4);
   
}    


//code from Benjamin Siegel at https://www.youtube.com/watch?v=pPuX4Gd0i-g&list=PLtGdOnjTReu_EyYRHxxoAG6cTqttWwpiF&index=3&t=289s&ab_channel=BenjaminSiegel 
  //if the nose goes on the right side of the screen it will play the audio saying right
  if(noseX < 200) {
    // limits the audio to play only once it has finished 
    if(!song1.isPlaying()){
      song1.play()
    }
  }

  if(noseX > 1800) {
    // limits the audio to play only once it has finished 
    if(!song2.isPlaying()){
      song2.play()
    }
  }

}