function getOS() {
  var userAgent = window.navigator.userAgent,
    platform = window.navigator?.userAgentData?.platform || window.navigator.platform,
    macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K', 'macOS'],
    windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
    iosPlatforms = ['iPhone', 'iPad', 'iPod'],
    os = null;

  if (macosPlatforms.indexOf(platform) !== -1) {
    os = 'Mac OS';
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = 'iOS';
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = 'Windows';
  } else if (/Android/.test(userAgent)) {
    os = 'Android';
  } else if (/Linux/.test(platform)) {
    os = 'Linux';
  }

  return os;
}


function isFormValid() {
  valid = true;
  if (!document.querySelector("#problem").value){
    valid = false;
  }
  if (!document.querySelector("#solution").value){
    valid = false;
  }
  if (!document.querySelector("input[name='missionCritical']:checked")){
    valid = false;
  }
  else if (!document.querySelector("input[name='reallyBetter']:checked")){
    valid = false;
  }
  else if (!document.querySelector("input[name='skillsAndResources']:checked")){
    valid = false;
  }
  else if (!document.querySelector("input[name='mvpInAMonth']:checked")){
    valid = false;
  }
  else if (!document.querySelector("input[name='icp']:checked")){
    valid = false;
  }
  else if (!document.querySelector("input[name='spendingMoney']:checked")){
    valid = false;
  }
  else if (!document.querySelector("input[name='fiftyCustomers']:checked")){
    valid = false;
  }
  else if (!document.querySelector("input[name='founderProductFit']:checked")){
    valid = false;
  }
  else if (!document.querySelector("input[name='tooManyDecisionMakers']:checked")){
    valid = false;
  }
  else if (!document.querySelector("input[name='nativeApp']:checked")){
    valid = false;
  }
  return valid;
}


function totalScore(){
  let score = 0;
  if (document.querySelector("#missionCriticalNo:checked")){
    score = score + 1;
  }

  if (document.querySelector("#reallyBetterYes:checked")){
    score = score + 1;
  }

  if (document.querySelector("#skillsAndResourcesYes:checked")){
    score = score + 1;
  }

  if (document.querySelector("#mvpInAMonthYes:checked")){
    score = score + 1;
  }

  if (document.querySelector("#icpYes:checked")){
    score = score + 1;
  }

  if (document.querySelector("#spendingMoneyYes:checked")){
    score = score + 1;
  }

  if (document.querySelector("#fiftyCustomersYes:checked")){
    score = score + 1;
  }

  if (document.querySelector("#founderProductFitYes:checked")){
    score = score + 1;
  }

  if (document.querySelector("#tooManyDecisionMakersNo:checked")){
    score = score + 1;
  }

  if (document.querySelector("#nativeAppNo:checked")){
    score = score + 1;
  }
  return score;
}


function handleSuccess(score) {
  document.querySelector("#subtitle").innerHTML = `Bootstrapping score: <span class="bg-gradient" style="display:inline-block;border-radius:8px;font-weight:bold;background-color:rgb(0, 188, 135);padding:8px">${score}/10&nbsp;&nbsp;TRY IT!</span>`
  document.querySelector("#subtitle").style.paddingBottom = "12px"
  document.querySelector("#success-picture").setAttribute("src", window.wins[Math.round(Math.random() * (window.wins.length - 1))]);
  document.querySelector("#wait-animation").style.display = "block";
  setTimeout(() => {
    var audio = new Audio('audio/success.mp3');
    audio.play();
    document.querySelector("#wait-animation").style.display = "none";
    document.querySelector("#success").style.display = "block";
    document.querySelector("#follow-on-twitter").style.display = "block";
  }, 1500);
}


function handleFailure(score) {
  document.querySelector("#wait-animation").style.display = "block";
  document.querySelector("#subtitle").innerHTML = `Bootstrapping score: <span class="bg-danger bg-gradient" style="display:inline-block;border-radius:8px;font-weight:bold;padding:8px">${score}/10&nbsp;&nbsp;LET'S KILL IT!</span>`;
  document.querySelector("#subtitle").style.paddingBottom = "12px"
  var audio = new Audio('audio/failure.mp3');
  audio.play();
  setTimeout(() => {
    document.querySelector("#wait-animation").style.display = "none";
    document.querySelector("#failure").style.display = "block";
    player.ready(function() {
      player.play();
      document.querySelector("#follow-on-twitter").style.display = "block";
    });
  }, 3500);
}


document.querySelector("#summon-the-grinder").addEventListener("click", function(e){
  e.preventDefault();
  if (!isFormValid()){
    alert("Hey cheater 🤡 Answer all questions!");
    return;
  }

  document.querySelector("#intro").style.display = "none";
  document.querySelector("#grinder-form").style.display = "none";
  document.querySelector("body").style.backgroundColor = "#000000";

  let score = totalScore();

  if (score >= 8) {
    handleSuccess(score);
  }
  else {
    handleFailure(score);
  }
});
