
let settingsModal = document.getElementById("settings-modal");


let settingsBtn = document.getElementById("settings-btn");


let settingsSpan = document.getElementsByClassName("close")[0];

settingsBtn.onclick = function() {
    settingsModal.style.display = "block";
}


settingsSpan.onclick = function() {
  settingsModal.style.display = "none";
}


window.onclick = function(event) {
  if (event.target == settingsModal) {
    settingsModal.style.display = "none";
  }
}

