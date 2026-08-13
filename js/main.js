// Qosqo Away — site scripts

const WHATSAPP_NUMBER = "51972443606"; // +51 993 026 873

document.addEventListener("DOMContentLoaded", () => {
  // Mobile nav toggle
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      links.classList.toggle("open");
    });
  }

  // Contact form -> WhatsApp
  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("cf-name").value.trim();
      const people = document.getElementById("cf-people").value;
      const date = document.getElementById("cf-date").value;
      const message = document.getElementById("cf-message").value.trim();

      let text = `Hola! Mi nombre es ${name}. Me gustaria consultar sobre la experiencia Qosqo Away.`;
      if (people) text += `\nNumero de personas: ${people}`;
      if (date) text += `\nFecha tentativa: ${date}`;
      if (message) text += `\nMensaje: ${message}`;

      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
      window.open(url, "_blank");
    });
  }
});
