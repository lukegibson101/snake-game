let modalBtn = document.getElementsByClassName('nav-btn');

    for (let i = 0; i < modalBtn.length; i++) {
        modalBtn[i].addEventListener('click', showModal);
       
    }

    function showModal () {
        if (this.getAttribute("id") === "settings-btn") {
            document.getElementById('settings-modal').style.display = 'block';
        }
        if (this.getAttribute("id") === "how-btn") {
          document.getElementById('how-modal').style.display = 'block';
        }

    }
    
    let modalClose = document.getElementsByClassName('modal');
    for (let i = 0; i < modalClose.length; i++) {
        modalClose[i].addEventListener('click', closeModal);
        
    }

    function closeModal () {
        if (this.getAttribute("id") === "settings-modal") {
            document.getElementById('settings-modal').style.display = 'none';
        }
        if (this.getAttribute("id") === "how-modal") {
          document.getElementById('how-modal').style.display = 'none';
        }
        
    }