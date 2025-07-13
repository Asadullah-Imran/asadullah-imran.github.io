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

  // Load education data
  const education = await fetchData("data/education.json");
  if (education) {
    const eduDiv = document.getElementById("about-education");
    eduDiv.innerHTML += education
      .map(
        (edu) => `
        <div class="mb-6 last:mb-0">
          <h4 class="font-bold text-lg">${edu.degree}</h4>
          <p class="text-gray-600">${edu.institution} | ${edu.period}</p>
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
              ? `<ul class="mt-2 space-y-1">${edu.highlights
                  .map((h) => `<li class="text-gray-700">• ${h}</li>`)
                  .join("")}</ul>`
              : ""
          }
        </div>
      `
      )
      .join("");
  }

  // Load languages
  if (personal && personal.languages) {
    const langDiv = document.getElementById("about-languages");
    langDiv.innerHTML += `
      <ul class="space-y-2">
        ${personal.languages
          .map(
            (lang) => `
            <li class="flex justify-between items-center">
              <span>${lang.name}</span>
              <span class="text-sm text-gray-500">${lang.level}</span>
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
              ? `<img src="${aff.image}" alt="${aff.organization}" class="w-12 h-12 object-cover rounded-full">`
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
});
