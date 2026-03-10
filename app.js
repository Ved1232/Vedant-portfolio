(function () {
    [...document.querySelectorAll(".control")].forEach(button => {
        button.addEventListener("click", function() {
            document.querySelector(".active-btn").classList.remove("active-btn");
            this.classList.add("active-btn");
            document.querySelector(".active").classList.remove("active");
            document.getElementById(button.dataset.id).classList.add("active");
        })
    });
    document.querySelector(".theme-btn").addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
    })
})();

 function showSection(sectionId) {
    document.querySelectorAll('header.container, main .container').forEach(section => {
      section.classList.remove('active');
    });

    const target = document.getElementById(sectionId);
    if (target) {
      target.classList.add('active');
      target.scrollIntoView({ behavior: 'smooth' });
    }

    document.querySelectorAll('.control').forEach(btn => {
      btn.classList.remove('active-btn');
    });

    const activeControl = document.querySelector(`.control[data-id="${sectionId}"]`);
    if (activeControl) {
      activeControl.classList.add('active-btn');
    }
  }

  window.addEventListener('load', () => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      showSection(hash);
    }
  });
