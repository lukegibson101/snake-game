let modalBtn = document.getElementsByClassName('nav-btn');
for (let i = 0; i < modalBtn.length; i++) {
    modalBtn[i].addEventListener('click', showModal);

}

function showModal() {
    if (this.getAttribute("id") === "settings-btn") {
        document.getElementById('settings-modal').style.display = 'block';
    }
    if (this.getAttribute("id") === "how-btn") {
        document.getElementById('how-modal').style.display = 'block';
    }
}


document.getElementById('how-close').onclick = function() {
    document.getElementById('how-modal').style.display = "none";
  }

document.getElementById('settings-close').onclick = function() {
    document.getElementById('settings-modal').style.display = "none";
  }

window.onclick = function(event) {
    if (event.target == document.getElementById('settings-modal')) {
        document.getElementById('settings-modal').style.display = "none";
    }
    if (event.target == document.getElementById('how-modal')) {
        document.getElementById('how-modal').style.display = "none";
    }
  }


  