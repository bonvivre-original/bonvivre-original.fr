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
      var email = contactForm.querySelector("#email").value.trim();
      var subject = contactForm.querySelector("#subject").value.trim() || "Message depuis le site Bon Vivre";
      var message = contactForm.querySelector("#message").value.trim();

      var body = "Prénom : " + firstname +
        "\nNom : " + name +
        "\nEmail : " + email +
        "\n\n" + message +
        "\n\n---\nPour répondre à " + fullName + ", utilisez le bouton \"Répondre\" de votre messagerie : la réponse partira directement à " + email + ".";

      var mailto = "mailto:bonvivre.original@gmail.com" +
        "?subject=" + encodeURIComponent("[Site Bon Vivre] " + subject + " — " + fullName + " (" + email + ")") +
        "&body=" + encodeURIComponent(body) +
        "&reply-to=" + encodeURIComponent(email);

      window.location.href = mailto;
    });
  }
});
