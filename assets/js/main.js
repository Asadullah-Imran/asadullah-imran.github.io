// Utility function for fetching JSON data
async function fetchData(url) {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error(`Error loading ${url}:`, error);
    return null;
  }
}

// Load all data when DOM is ready
document.addEventListener("DOMContentLoaded", async function () {
  // Load personal data
  const personalData = await fetchData("data/personal.json");
  if (personalData) {
    populatePersonalInfo(personalData);
  }

  // Load skills data
  const skillsData = await fetchData("data/skills.json");
  if (skillsData) {
    populateSkills(skillsData);
  }

  // Load projects data
  const projectsData = await fetchData("data/projects.json");
  if (projectsData) {
    populateProjects(projectsData);
  }

  // Load certifications data
  const certsData = await fetchData("data/certifications.json");
  if (certsData) {
    populateCertifications(certsData);
  }

  // Load blog preview
  const blogData = await fetchData("data/blog.json");
  if (blogData) {
    populateBlogPreview(blogData.posts.slice(0, 3));
  }
});

// Populate personal information with Tailwind classes
function populatePersonalInfo(data) {
  // Hero section
  if (document.getElementById("hero-name")) {
    document.getElementById("hero-name").textContent = data.name;
  }
  if (document.getElementById("hero-title")) {
    document.getElementById("hero-title").textContent = data.title;
  }

  // Social links
  const socialLinks = document.getElementById("social-links");
  if (socialLinks && data.social) {
    socialLinks.innerHTML = data.social
      .map(
        (social) => `
      <a href="${social.url}" target="_blank" class="text-white hover:text-accent text-xl transition">
        <i class="${social.icon}"></i>
      </a>
    `
      )
      .join("");
  }
}

// Populate skills section with Tailwind classes
function populateSkills(data) {
  const skillsList = document.getElementById("skills-list");
  if (skillsList) {
    // Combine top skills from different categories
    const topSkills = [
      ...(data.programming || []).slice(0, 2),
      ...(data.web || []).slice(0, 2),
      ...(data.tools || []).slice(0, 2),
    ];

    skillsList.innerHTML = topSkills
      .map(
        (skill) => `
      <div class="bg-white shadow-md rounded-lg px-6 py-4 flex items-center space-x-2">
        <i class="fas fa-check text-primary"></i>
        <span>${typeof skill === "string" ? skill : skill.name}</span>
      </div>
    `
      )
      .join("");
  }
}

// Populate projects section with Tailwind classes
function populateProjects(data) {
  const projectsContainer = document.getElementById("portfolio-projects");
  if (projectsContainer) {
    projectsContainer.innerHTML = data
      .slice(0, 3)
      .map(
        (project) => `
      <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl hover:scale-105 transition-transform duration-300">
        <div class="relative h-48 overflow-hidden">
          <img src="${project.image}" alt="${
          project.alt || project.title
        }" class="w-full h-full object-cover">
          <div class="absolute inset-0 bg-black/30 flex items-center justify-center space-x-4 opacity-0 hover:opacity-100 transition">
            ${
              project.github
                ? `
              <a href="${project.github}" target="_blank" class="text-white bg-primary rounded-full w-10 h-10 flex items-center justify-center hover:bg-primary-dark transition">
                <i class="fab fa-github"></i>
              </a>
            `
                : ""
            }
            ${
              project.demo
                ? `
              <a href="${project.demo}" target="_blank" class="text-white bg-primary rounded-full w-10 h-10 flex items-center justify-center hover:bg-primary-dark transition">
                <i class="fas fa-external-link-alt"></i>
              </a>
            `
                : ""
            }
          </div>
        </div>
        <div class="p-6">
          <h3 class="text-xl font-bold mb-2">${project.title}</h3>
          <p class="text-gray-600 mb-4">${project.description}</p>
          <div class="flex flex-wrap gap-2">
            ${project.technologies
              .map(
                (tech) => `
              <span class="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full">${tech}</span>
            `
              )
              .join("")}
          </div>
        </div>
      </div>
    `
      )
      .join("");
  }
}

// Add button hover animation globally
window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    document.querySelectorAll("a, button").forEach((el) => {
      if (
        el.classList.contains("bg-primary") ||
        el.classList.contains("bg-accent") ||
        el.classList.contains("border-primary")
      ) {
        el.classList.add(
          "transition-transform",
          "duration-200",
          "hover:scale-105"
        );
      }
    });
  }, 500);
});

// Populate certifications with Tailwind classes
function populateCertifications(data) {
  const certsSlider = document.getElementById("certifications-slider");
  if (certsSlider) {
    certsSlider.innerHTML = data
      .map(
        (cert) => `
      <div class="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
        <img src="${cert.badge}" alt="${
          cert.alt || cert.title
        }" class="w-24 h-24 mb-4">
        <h4 class="font-bold text-lg mb-1">${cert.title}</h4>
        <p class="text-gray-600 mb-2">${cert.issuer}</p>
        <p class="text-sm text-gray-500 mb-4">Issued: ${cert.date}</p>
        ${
          cert.url
            ? `
          <a href="${cert.url}" target="_blank" class="text-primary hover:underline">View Credential</a>
        `
            : ""
        }
      </div>
    `
      )
      .join("");
  }
}

// Populate blog preview with Tailwind classes
function populateBlogPreview(posts) {
  const blogPreview = document.getElementById("blog-preview");
  if (blogPreview) {
    blogPreview.innerHTML = posts
      .map(
        (post) => `
      <article class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
        <img src="${post.image}" alt="${
          post.alt || post.title
        }" class="w-full h-48 object-cover">
        <div class="p-6">
          <div class="flex justify-between text-sm text-gray-500 mb-2">
            <span>${post.date}</span>
            <span>${post.readTime}</span>
          </div>
          <h3 class="text-xl font-bold mb-2">
            <a href="${post.file}" class="hover:text-primary transition">${
          post.title
        }</a>
          </h3>
          <p class="text-gray-600 mb-4">${post.excerpt}</p>
          <div class="flex flex-wrap gap-2">
            ${post.tags
              .map(
                (tag) => `
              <span class="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full">${tag}</span>
            `
              )
              .join("")}
          </div>
        </div>
      </article>
    `
      )
      .join("");
  }
}
