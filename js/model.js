let gender_model, gender_webcam, gender_labelContainer, gender_maxPredictions;
let gender_result;
let gender_resultContainer;
let gender_isRecording = true;

async function gender_init() {
  const gender_modelURL = "js/model/gender/model.json";
  const gender_metadataURL = "js/model/gender/metadata.json";

  gender_model = await tmImage.load(gender_modelURL, gender_metadataURL);
  gender_maxPredictions = gender_model.getTotalClasses();

  const flip = true; // whether to flip the webcam
  gender_webcam = new tmImage.Webcam(700, 700, flip); // width, height, flip
  await gender_webcam.setup({ facingMode: "environment" }); // request access to the webcam
  await gender_webcam.play();
  window.requestAnimationFrame(gender_loop);

  document.getElementById("gender_webcam_container").appendChild(gender_webcam.canvas);
  gender_labelContainer = document.getElementById("gender_label_container");
  for (let i = 0; i < gender_maxPredictions; i++) {
    gender_labelContainer.appendChild(document.createElement("div"));
  }

  const gender_startButton = document.querySelector('button[onclick="gender_init()"]');
  gender_startButton.style.display = "none"; 

  gender_resultContainer = document.getElementById("gender_result_container");
  const gender_confirmButton = document.getElementById("gender_confirm_button");
  gender_confirmButton.style.display = "block"; // Show the confirm button
}

async function gender_loop() {
  if (!gender_isRecording) {
    return; // Exit the loop if recording is stopped
  }
  gender_webcam.update(); // update the webcam frame
  await gender_predict();
  window.requestAnimationFrame(gender_loop);
}

async function gender_predict() {
  const prediction = await gender_model.predict(gender_webcam.canvas);
  for (let i = 0; i < gender_maxPredictions; i++) {
    let label;
    if (prediction[i].className == 'Male') {
      label = '男性';
    }
    else if (prediction[i].className == 'Female'){
      label = '女性';
    }

    const result_prob = (prediction[i].probability * 100).toFixed(2) + "%";

    const classPrediction = label + ": " + result_prob;
    gender_labelContainer.childNodes[i].innerHTML = classPrediction;

    if (prediction[i].probability.toFixed(2) > 0.8) {
      gender_result = label;
    }
  }
}

function gender_showResultAndStop() {
  if (gender_result) {
    gender_resultContainer.innerHTML = 
      "<p style='font-size: 45px;'>性別分析結果<br><br>" +
      gender_result + "<br><br><br><br>即將轉至下一頁......</p>";
  } else {
    gender_resultContainer.innerHTML = "請先進行性別分析";
  }
  gender_stopRecording();
  const gender_confirmButton = document.getElementById("gender_confirm_button");
  gender_confirmButton.style.display = "none";

  const gender_webcamContainer = document.getElementById("gender_webcam_container");
  const gender_labelContainer = document.getElementById("gender_label_container");
  gender_webcamContainer.style.display = "none"; 
  gender_labelContainer.style.display = "none"; 

  setTimeout(() => {
    window.location.href = "analysis_index2.html";
  }, 3000);
}

function gender_showResultAndStop_dark() {
  if (gender_result) {
    gender_resultContainer.innerHTML = 
      "<p style='font-size: 45px;'>性別分析結果<br><br>" +
      gender_result + "<br><br><br><br>即將轉至下一頁......</p>";
  } else {
    gender_resultContainer.innerHTML = "請先進行性別分析";
  }
  gender_stopRecording();
  const gender_confirmButton = document.getElementById("gender_confirm_button");
  gender_confirmButton.style.display = "none";

  const gender_webcamContainer = document.getElementById("gender_webcam_container");
  const gender_labelContainer = document.getElementById("gender_label_container");
  gender_webcamContainer.style.display = "none"; 
  gender_labelContainer.style.display = "none"; 

  setTimeout(() => {
    window.location.href = "analysis_index2_dark.html";
  }, 3000);
}

function gender_stopRecording() {
  gender_isRecording = false;
  gender_webcam.stop();
}

let type_model, type_webcam, type_labelContainer, type_maxPredictions;
let type_result;
let color_model, color_labelContainer, color_maxPredictions;
let color_result;
let resultContainer;
let isRecording = true;

async function type_init() {
  const type_modelURL = "js/model/type/model.json";
  const type_metadataURL = "js/model/type/metadata.json";
  const color_modelURL = "js/model/color/model.json";
  const color_metadataURL = "js/model/color/metadata.json";

  type_model = await tmImage.load(type_modelURL, type_metadataURL);
  type_maxPredictions = type_model.getTotalClasses();
  color_model = await tmImage.load(color_modelURL, color_metadataURL);
  color_maxPredictions = color_model.getTotalClasses();

  const flip = true; // whether to flip the webcam
  type_webcam = new tmImage.Webcam(700, 700, flip); // width, height, flip
  await type_webcam.setup({ facingMode: "environment" }); // request access to the webcam
  await type_webcam.play();
  window.requestAnimationFrame(loop);

  document.getElementById("type_webcam_container").appendChild(type_webcam.canvas);
  type_labelContainer = document.getElementById("type_label_container");
  color_labelContainer = document.getElementById("color_label_container");
  for (let i = 0; i < type_maxPredictions; i++) {
    type_labelContainer.appendChild(document.createElement("div"));
  }
  for (let i = 0; i < color_maxPredictions; i++) {
    color_labelContainer.appendChild(document.createElement("div"));
  }

  const startButton = document.querySelector('button[onclick="type_init()"]');
  startButton.style.display = "none"; 

  resultContainer = document.getElementById("type_result_container");
  const confirmButton = document.getElementById("type_confirm_button");
  confirmButton.style.display = "block"; // Show the confirm button
}

async function loop() {
  if (!isRecording) {
    return; // Exit the loop if recording is stopped
  }
  type_webcam.update(); // update the webcam frame
  await predict();
  window.requestAnimationFrame(loop);
}

async function predict() {
  const type_prediction = await type_model.predict(type_webcam.canvas);
  const color_prediction = await color_model.predict(type_webcam.canvas);
  for (let i = 0; i < type_maxPredictions; i++) {
    let type_label;
    if (type_prediction[i].className == 'Blouse') {
      type_label = '女式襯衫';
    }
    else if (type_prediction[i].className == 'Dress'){
      type_label = '裙子';
    }
    else if (type_prediction[i].className == 'Hoodie'){
      type_label = '帽衫';
    }
    else if (type_prediction[i].className == 'Longsleeve'){
      type_label = '長袖衫';
    }
    else if (type_prediction[i].className == 'Pants'){
      type_label = '褲子';
    }
    else if (type_prediction[i].className == 'Polo'){
      type_label = '網球衫';
    }
    else if (type_prediction[i].className == 'Shirt'){
      type_label = '襯衫';
    }
    else if (type_prediction[i].className == 'Shorts'){
      type_label = '短褲';
    }
    else if (type_prediction[i].className == 'Skirt'){
      type_label = '裙子';
    }
    else if (type_prediction[i].className == 'T-Shirt'){
      type_label = 'T恤';
    }

    const type_result_prob = (type_prediction[i].probability * 100).toFixed(2) + "%";
    const type_classPrediction = type_label + ": " + type_result_prob;
    type_labelContainer.childNodes[i].innerHTML = type_classPrediction;

    if (type_prediction[i].probability.toFixed(2) > 0.7) {
      type_result = type_label;
    }
  }
  for (let i = 0; i < color_maxPredictions; i++) {
    let color_label;
    if (color_prediction[i].className == 'Black') {
      color_label = '黑色';
    }
    else if (color_prediction[i].className == 'Blue'){
      color_label = '藍色';
    }
    else if (color_prediction[i].className == 'Brown'){
      color_label = '棕色';
    }
    else if (color_prediction[i].className == 'Green'){
      color_label = '綠色';
    }
    else if (color_prediction[i].className == 'Grey'){
      color_label = '灰色';
    }
    else if (color_prediction[i].className == 'Orange'){
      color_label = '橘色';
    }
    else if (color_prediction[i].className == 'Red'){
      color_label = '紅色';
    }
    else if (color_prediction[i].className == 'Violet'){
      color_label = '紫色';
    }
    else if (color_prediction[i].className == 'White'){
      color_label = '白色';
    }
    else if (color_prediction[i].className == 'Yellow'){
      color_label = '黃色';
    }
    
    const color_result_prob = (color_prediction[i].probability * 100).toFixed(2) + "%";
    const color_classPrediction = color_label + ": " + color_result_prob;
    color_labelContainer.childNodes[i].innerHTML = color_classPrediction;

    if (color_prediction[i].probability.toFixed(2) > 0.7) {
      color_result = color_label;
    }
  }
}

function type_showResultsAndStop() {
  if (type_result && color_result) {
    resultContainer.innerHTML =
      "<p style='font-size: 45px;'>衣服分析結果<br><br>" +
      "類型  ---  " + type_result + "<br>" +
      "顏色  ---  " + color_result + "</p>";
  } else {
    resultContainer.innerHTML = "請先進行衣服分析";
  }
  type_stopRecording();
  const confirmButton = document.getElementById("type_confirm_button");
  confirmButton.style.display = "none";

  const webcamContainer = document.getElementById("type_webcam_container");
  const typeLabelContainer = document.getElementById("type_label_container");
  const colorLabelContainer = document.getElementById("color_label_container");
  webcamContainer.style.display = "none"; 
  typeLabelContainer.style.display = "none"; 
  colorLabelContainer.style.display = "none"; 

  const tryOnceMoreButton = document.querySelector('button[onclick="try_once_more()"]');
  tryOnceMoreButton.style.display = "flex"; 

  const backHomePageButton = document.querySelector('button[onclick="back_home_page()"]');
  backHomePageButton.style.display = "flex";
}

function type_showResultsAndStop_dark() {
  if (type_result && color_result) {
    resultContainer.innerHTML =
      "<p style='font-size: 45px;'>衣服分析結果<br><br>" +
      "類型  ---  " + type_result + "<br>" +
      "顏色  ---  " + color_result + "</p>";
  } else {
    resultContainer.innerHTML = "請先進行衣服分析";
  }
  type_stopRecording();
  const confirmButton = document.getElementById("type_confirm_button");
  confirmButton.style.display = "none";

  const webcamContainer = document.getElementById("type_webcam_container");
  const typeLabelContainer = document.getElementById("type_label_container");
  const colorLabelContainer = document.getElementById("color_label_container");
  webcamContainer.style.display = "none"; 
  typeLabelContainer.style.display = "none"; 
  colorLabelContainer.style.display = "none"; 

  const tryOnceMoreButtonDark = document.querySelector('button[onclick="try_once_more_dark()"]');
  tryOnceMoreButtonDark.style.display = "flex"; 

  const backHomePageButtonDark = document.querySelector('button[onclick="back_home_page_dark()"]');
  backHomePageButtonDark.style.display = "flex";
}

function try_once_more() {
  window.location.href = "analysis_index2.html";
}

function try_once_more_dark() {
  window.location.href = "analysis_index2_dark.html";
}

function back_home_page() {
  window.location.href = "index.html";
}

function back_home_page_dark() {
  window.location.href = "index_dark.html";
}

function type_stopRecording() {
  isRecording = false;
  type_webcam.stop();
}