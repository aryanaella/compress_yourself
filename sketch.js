let capture;
let compressedGraphics;

let faceapi;
let detections = [];

let lastDetectionTime = 0;
const detectionInterval = 100;

let lastCompressionTime = 0;
const compressionInterval = 2000;
let currentCompression = 0;
let compressionFactor = 0.04;

let isCapturing = false;
let startButton;

function setup() {
  createCanvas(800, 800);
  // noSmooth();

  startButton = createButton('COMPRESS YOURSELF')
  startButton.position(10, 10);
  startButton.style('font-size', '20px');
  startButton.style('background-color', 'yellow');
  startButton.mousePressed(() => {
    isCapturing = true; 
    startSetup();
    startButton.hide();
  });

}

function startSetup() {
  capture = createCapture(VIDEO,{ flipped:true });
  capture.size(320, 240);
  capture.hide();

  // let compressionFactor = 0.04;
  let compressedWidth = capture.width * compressionFactor;
  let compressedHeight = capture.height * compressionFactor;

  compressedGraphics = createGraphics(compressedWidth, compressedHeight);

  const faceOptions = {
    withLandmarks: true,
    withExpressions: false,
    withDescriptors: false
  };
  faceapi = ml5.faceApi(capture, faceOptions, faceReady);
}

function faceReady() {
  faceapi.detect(gotFaces);
}

function gotFaces(error, result) {
  if (error) {
    console.log(error);
    return;
  }
  detections = result;

  if (millis() - lastDetectionTime > detectionInterval) {
    faceapi.detect(gotFaces);
    lastDetectionTime = millis();
  }
}


function draw() {
  if (isCapturing) {
    startCapture(); // Call the capture logic continuously
  } else {
    // background(255); // Optional: Clear canvas when not capturing
  }
}

function startCapture() {
  background(255);
  fill(255)
  textSize(20);
  text('loading...', 350, 200);

  if (detections.length > 0) {
    frameRate(5);
    console.log('face detected');

    if (millis() - lastCompressionTime > compressionInterval) {
      currentCompression = (currentCompression + 1) % 4; // Cycle through 4 compressions
      lastCompressionTime = millis();
    }

    switch (currentCompression) {
      case 0:
        compress1();
        break;
      case 1:
        compress2();
        break;
      case 2:
        compress3();
        break;
      case 3:
        compress4();
        break;
    }

  } else {
    console.log('no face detected');
    frameRate(24);
    image(capture, 0, 0, width, width * capture.height / capture.width);
  }
}


function compress1() {
  compressionFactor = 0.04 
  let compressedWidth = capture.width * compressionFactor;
  let compressedHeight = capture.height * compressionFactor;
  // compressedGraphics = createGraphics(compressedWidth, compressedHeight);
  compressedGraphics.resizeCanvas(compressedWidth, compressedHeight);

  compressedGraphics.image(capture, 0, 0, compressedGraphics.width, compressedGraphics.height);
  compressedGraphics.filter(POSTERIZE, 10);

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      image(compressedGraphics, i * 400, j * 400, width / 2, height / 1.9);
    }
  }
}

function compress2() {
  compressionFactor = 0.0375
  let compressedWidth = capture.width * compressionFactor;
  let compressedHeight = capture.height * compressionFactor;
  // compressedGraphics = createGraphics(compressedWidth, compressedHeight);
  compressedGraphics.resizeCanvas(compressedWidth, compressedHeight);

  compressedGraphics.image(capture, 0, 0, compressedGraphics.width, compressedGraphics.height);
  compressedGraphics.filter(POSTERIZE, 7);

  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      image(compressedGraphics, i * 200, j * 200, width / 4, height / 3.9);
    }
  }
}

function compress3() {
  compressionFactor = 0.035
  let compressedWidth = capture.width * compressionFactor;
  let compressedHeight = capture.height * compressionFactor;
  // compressedGraphics = createGraphics(compressedWidth, compressedHeight);
  compressedGraphics.resizeCanvas(compressedWidth, compressedHeight);

  compressedGraphics.image(capture, 0, 0, compressedGraphics.width, compressedGraphics.height);
  compressedGraphics.filter(POSTERIZE, 4);

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      image(compressedGraphics, i * 100, j * 100, width / 6, height / 6);
    }
  }
}

function compress4() {
  compressionFactor = 0.0325
  let compressedWidth = capture.width * compressionFactor;
  let compressedHeight = capture.height * compressionFactor;
  // compressedGraphics = createGraphics(compressedWidth, compressedHeight);
  compressedGraphics.resizeCanvas(compressedWidth, compressedHeight);

  compressedGraphics.image(capture, 0, 0, compressedGraphics.width, compressedGraphics.height);
  compressedGraphics.filter(POSTERIZE, 2);

  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 20; j++) {
      image(compressedGraphics, i * 50, j * 50, width / 15, height / 14.9);
    }
  }
}


// let capture;
// let compressedGraphics;

// let faceapi;
// let detections = [];

// let lastDetectionTime = 0;
// const detectionInterval = 100; 

// function setup() {
//   createCanvas(800, 800); 
//   // noSmooth(); 
  
//   capture = createCapture(VIDEO);
//   capture.size(320, 240);
//   capture.hide(); 

//   let compressionFactor = 0.04; 
//   let compressedWidth = capture.width * compressionFactor;
//   let compressedHeight = capture.height * compressionFactor;

//   compressedGraphics = createGraphics(compressedWidth, compressedHeight);

//   const faceOptions = {
//     withLandmarks: true,
//     withExpressions: false,
//     withDescriptors: false
//   };
//   faceapi = ml5.faceApi(capture, faceOptions, faceReady);
// }

// function faceReady() {
//   faceapi.detect(gotFaces);
// }

// function gotFaces(error, result) {
//   if(error) {
//     console.log(error);
//     return;
//   }
//     detections = result;

//   if (millis() - lastDetectionTime > detectionInterval) {
//     faceapi.detect(gotFaces);
//     lastDetectionTime = millis();
//   }
// }

// function draw() {
//   background(255);
//   text('loading...', 350, 200);
  
//   if(detections.length > 0) {
//     frameRate(5);
//     console.log('face detected');
//     const compressions = [compress1, compress2, compress3, compress4];
//     every(0.1).seconds 
//     .showAll(compressions);

//   } else {
//     console.log('no face detected');
//     frameRate(24);
//     image(capture, 0, 0, width, width * capture.height / capture.width);
//   }
// }


// function compress1(reportDone) {
//     compressedGraphics.image(capture, 0, 0, compressedGraphics.width, compressedGraphics.height);
//     compressedGraphics.filter(POSTERIZE, 10);
//     for (let i = 0; i < 3; i++) {
//       for (let j = 0; j < 3; j++) {
//         image(compressedGraphics, i*400, j*400, width/2, height/2);
//       }
//     }
// }

// function compress2() {
//     compressedGraphics.image(capture, 0, 0, compressedGraphics.width, compressedGraphics.height);
//     compressedGraphics.filter(POSTERIZE, 7);
//     for (let i = 0; i < 5; i++) {
//       for (let j = 0; j < 5; j++) {
//         image(compressedGraphics, i*200, j*200, width/4, height/4);
//       }
//     }
// }

// function compress3() {
//   compressedGraphics.image(capture, 0, 0, compressedGraphics.width, compressedGraphics.height);
//   compressedGraphics.filter(POSTERIZE, 4);
//   for (let i = 0; i < 10; i++) {
//     for (let j = 0; j < 10; j++) {
//       image(compressedGraphics, i*100, j*100, width/6, height/6);
//     }
//   }
// }

// function compress4() {
//   compressedGraphics.image(capture, 0, 0, compressedGraphics.width, compressedGraphics.height);
//   compressedGraphics.filter(POSTERIZE, 2);
//   for (let i = 0; i < 20; i++) {
//     for (let j = 0; j < 20; j++) {
//       image(compressedGraphics, i*50, j*50, width/15, height/15);
//     }
//   }
// }
