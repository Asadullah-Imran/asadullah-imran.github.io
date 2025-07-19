document.addEventListener("DOMContentLoaded", async function () {
  // Utility fetch
  async function fetchData(url) {
    try {
      const response = await fetch(url);
      return await response.json();
    } catch (e) {
      console.error(`Error loading ${url}:`, e);
      return null;
    }
  }

  // Load personal data
  const personal = await fetchData("data/personal.json");
  if (personal) {
    document.getElementById("about-profile-img").src = personal.image;
    document.getElementById("about-name").textContent = personal.name;
    document.getElementById("about-title").textContent = personal.title;
    document.getElementById("about-bio").textContent = personal.about;

    // Social links
    const socialLinks = document.getElementById("about-social-links");
    socialLinks.innerHTML = personal.social
      .map(
        (s) => `
        <a href="${s.url}" target="_blank" class="text-white hover:text-accent text-xl transition">
          <i class="${s.icon}"></i>
        </a>
      `
      )
      .join("");
  }

  // Render contact info cards in hero/profile section
  if (personal) {
    const contactInfoDiv = document.getElementById("about-contact-info");
    contactInfoDiv.innerHTML = `
      <div class="contact-item">
        <div class="contact-icon"><i class="fas fa-map-marker-alt"></i></div>
        <div><p class="text-gray-600 text-sm">Location</p><p class="font-medium">Dhaka, Bangladesh</p></div>
      </div>
      <div class="contact-item">
        <div class="contact-icon"><i class="fas fa-envelope"></i></div>
        <div><p class="text-gray-600 text-sm">Email</p><p class="font-medium">asadullahimran19@gmail.com</p></div>
      </div>
      <div class="contact-item">
        <div class="contact-icon"><i class="fas fa-phone"></i></div>
        <div><p class="text-gray-600 text-sm">Phone</p><p class="font-medium">+8801633-356249</p></div>
      </div>
      <div class="contact-item">
        <div class="contact-icon"><i class="fas fa-graduation-cap"></i></div>
        <div><p class="text-gray-600 text-sm">Education</p><p class="font-medium">BSc in CSE (Expected 2026)</p></div>
      </div>
    `;
  }
  // Render social links as circular animated buttons
  if (personal && personal.social) {
    const socialLinks = document.getElementById("about-social-links");
    socialLinks.innerHTML = personal.social
      .map(
        (s) => `
        <a href="${s.url}" target="_blank" class="social-icon">
          <i class="${s.icon} text-xl"></i>
        </a>
      `
      )
      .join("");
  }

  // Load education data
  const education = await fetchData("data/education.json");
  if (education) {
    const eduDiv = document.getElementById("about-education");
    eduDiv.innerHTML = education
      .map(
        (edu) => `
        <div class="timeline-item animate-fadeIn">
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-bold text-primary">${edu.degree}</h3>
            <p class="text-gray-600">${edu.institution} | ${edu.period}</p>
            <div class="mt-4">
              ${
                edu.cgpa
                  ? `<p class="text-gray-700"><span class="font-medium">CGPA:</span> ${edu.cgpa}</p>`
                  : ""
              }
              ${
                edu.gpa
                  ? `<p class="text-gray-700"><span class="font-medium">GPA:</span> ${edu.gpa}</p>`
                  : ""
              }
              ${
                edu.highlights
                  ? `
                <div class="mt-3">
                  <h4 class="font-medium text-gray-800">Highlights:</h4>
                  <ul class="mt-2 space-y-2">
                    ${edu.highlights
                      .map(
                        (highlight) => `
                      <li class="flex items-start">
                        <i class="fas fa-check text-primary mt-1 mr-2"></i>
                        <span>${highlight}</span>
                      </li>
                    `
                      )
                      .join("")}
                  </ul>
                </div>
              `
                  : ""
              }
            </div>
          </div>
        </div>
      `
      )
      .join("");
  }

  // Load languages
  if (personal && personal.languages) {
    const langDiv = document.getElementById("about-languages");
    langDiv.innerHTML = `
      <ul class="space-y-2">
        ${personal.languages
          .map(
            (lang) => `
            <li class="flex justify-between items-center py-2 border-b border-gray-200">
              <span class="font-medium">${lang.name}</span>
              <span class="text-sm text-primary bg-primary/10 px-3 py-1 rounded-full">${lang.level}</span>
            </li>
          `
          )
          .join("")}
      </ul>
    `;
  }

  // Load affiliations
  const affiliations = await fetchData("data/affiliations.json");
  if (affiliations) {
    const affDiv = document.getElementById("about-affiliations");
    affDiv.innerHTML += affiliations
      .map(
        (aff) => `
        <div class="mb-6 last:mb-0 flex items-start gap-4">
          ${
            aff.image
              ? `<img src="${aff.image}" alt="${
                  aff.alt || aff.organization
                }" class="w-12 h-12 object-cover rounded-full">`
              : `<div class="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <i class="fas fa-users text-primary"></i>
                </div>`
          }
          <div>
            <h4 class="font-bold">${aff.role}</h4>
            <p class="text-gray-600">${aff.organization} (${aff.period})</p>
            ${
              aff.description
                ? `<p class="text-sm text-gray-500 mt-1">${aff.description}</p>`
                : ""
            }
          </div>
        </div>
      `
      )
      .join("");
  }

  function triggerFadeInAnimations() {
    const animatedItems = document.querySelectorAll(".animate-fadeIn");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.animationPlayState = "running";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    animatedItems.forEach((item) => {
      item.style.animationPlayState = "paused";
      observer.observe(item);
    });
  }

  // Load achievements
  const achievements = await fetchData("data/achievements.json");
  if (achievements) {
    const achievementsContainer = document.getElementById(
      "achievements-container"
    );
    achievementsContainer.innerHTML = achievements
      .map(
        (ach, i) => `
        <div class="bg-white rounded-xl shadow-md overflow-hidden transition transform hover:-translate-y-1 hover:shadow-2xl duration-300 animate-fadeIn" style="animation-delay: ${
          i * 0.15
        }s;">
          <div class="h-48 overflow-hidden">
            <img src="${ach.image}" alt="${
          ach.title
        }" class="w-full h-full object-cover">
          </div>
          <div class="p-6">
            <h3 class="text-xl font-bold text-primary">${ach.title}</h3>
            <p class="text-gray-600">${ach.organization} | ${ach.year}</p>
            <p class="text-gray-700 mt-3">${ach.description}</p>
          </div>
        </div>
      `
      )
      .join("");
    triggerFadeInAnimations();
  }

  // Load certifications
  const certifications = await fetchData("data/certifications.json");
  if (certifications) {
    const certificationsContainer = document.getElementById(
      "certifications-container"
    );
    certificationsContainer.innerHTML = certifications
      .map(
        (cert, i) => `
        <div class="bg-white rounded-xl shadow-md p-6 transition transform hover:-translate-y-1 hover:shadow-2xl duration-300 animate-fadeIn" style="animation-delay: ${
          i * 0.15
        }s;">
          <div class="flex items-start gap-4">
            ${
              cert.badge
                ? `<img src="${cert.badge}" alt="${
                    cert.alt || cert.title
                  }" class="w-16 h-16 object-contain">`
                : `<div class="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                    <i class="fas fa-certificate text-2xl"></i>
                  </div>`
            }
            <div>
              <h3 class="text-lg font-bold">${cert.title}</h3>
              <p class="text-gray-600">${cert.issuer} | ${cert.date}</p>
              ${
                cert.credentials
                  ? `<p class="text-sm text-gray-500 mt-1">${cert.credentials}</p>`
                  : ""
              }
              ${
                cert.url
                  ? `<a href="${cert.url}" target="_blank" class="inline-block mt-3 text-primary font-medium hover:underline">
                      View Credential <i class="fas fa-external-link-alt ml-1 text-sm"></i>
                    </a>`
                  : ""
              }
            </div>
          </div>
        </div>
      `
      )
      .join("");
    triggerFadeInAnimations();
  }
});
