document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".main-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    nav.querySelectorAll(".nav-menu a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  var contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      var firstname = contactForm.querySelector("#firstname").value.trim();
      var name = contactForm.querySelector("#name").value.trim();
      var fullName = (firstname + " " + name).trim();
      var subjectField = contactForm.querySelector("#subject");
      var subject = subjectField.value.trim() || "Message depuis le site Bon Vivre";
      subjectField.value = "[Site Bon Vivre] " + subject + " — " + fullName;

      var fromNameField = contactForm.querySelector('input[name="from_name"]');
      if (fromNameField) {
        fromNameField.value = fullName || "Site Bon Vivre";
      }

      var submitBtn = contactForm.querySelector('button[type="submit"]');
      var noteEl = document.getElementById("form-note");
      submitBtn.disabled = true;
      submitBtn.textContent = "Envoi en cours...";

      fetch(contactForm.action, {
        method: "POST",
        body: new FormData(contactForm),
        headers: { Accept: "application/json" }
      })
        .then(function (response) { return response.json(); })
        .then(function (data) {
          if (data.success) {
            contactForm.innerHTML = '<p class="form-success">Merci' + (firstname ? " " + firstname : "") + ' ! Votre message a bien été envoyé, on vous répond très vite.</p>';
          } else {
            throw new Error("Web3Forms error");
          }
        })
        .catch(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = "Envoyer";
          noteEl.textContent = "Une erreur est survenue. Réessayez, ou écrivez-nous directement à bonvivre.original@gmail.com.";
        });
    });
  }
});
