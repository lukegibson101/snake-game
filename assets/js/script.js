let modal = document.getElementsByClassName('nav-btn');

    for (let i = 0; i < modal.length; i++) {
        modal[i].addEventListener('click', showModal);
       
    }

    function showModal () {
        if (this.getAttribute("id") === "settings-btn") {
            document.getElementById('settings-modal').style.display = 'block';
        }
        if (this.getAttribute("id") === "how-btn") {
          document.getElementById('how-modal').style.display = 'block';
        }

    }
    