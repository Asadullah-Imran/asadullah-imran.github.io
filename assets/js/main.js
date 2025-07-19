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
  const skillsCards = document.getElementById("skills-cards");
  if (skillsCards) {
    const categories = [
      {
        key: "programming",
        title: "Programming",
        icon: "fas fa-code",
      },
      {
        key: "web",
        title: "Web",
        icon: "fas fa-globe",
      },
      {
        key: "tools",
        title: "Tools & Software",
        icon: "fas fa-tools",
      },
    ];
    skillsCards.innerHTML = categories
      .map((cat) => {
        const skills = data[cat.key] || [];
        return `
          <div class="bg-white p-6 rounded-xl shadow-md text-center transition transform hover:-translate-y-1 hover:shadow-2xl duration-300">
            <div class="flex justify-center mb-4">
              <i class="${cat.icon} text-primary text-3xl"></i>
            </div>
            <h3 class="text-xl font-bold mb-2">${cat.title}</h3>
            <div class="flex flex-wrap justify-center gap-2">
              ${skills
                .map(
                  (skill) =>
                    `<span class="bg-gray-100 text-gray-800 px-4 py-1 rounded-full font-medium transition hover:bg-primary hover:text-white">${
                      typeof skill === "string" ? skill : skill.name
                    }</span>`
                )
                .join("")}
            </div>
          </div>
        `;
      })
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
      <div class="bg-white rounded-xl shadow-md overflow-hidden transition transform hover:-translate-y-1 hover:shadow-2xl duration-300">
        <div class="relative h-48 overflow-hidden">
          <img src="${project.featuredImage?.src || ""}" alt="${
          project.featuredImage?.alt || project.title
        }" class="w-full h-full object-cover transition-transform duration-500 hover:scale-110">
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 flex items-end p-4">
            <h3 class="text-white text-xl font-bold">${project.title}</h3>
          </div>
        </div>
        <div class="p-6">
          <p class="text-sm text-primary font-medium mb-2">${
            project.category || ""
          }</p>
          <p class="text-gray-600 mb-4">${
            project.tagline || project.description
          }</p>
          <div class="flex flex-wrap gap-2 mb-4">
            ${(project.technologies || [])
              .map(
                (tech) => `
              <span class="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full transition hover:bg-primary hover:text-white">${tech}</span>
            `
              )
              .join("")}
          </div>
          <div class="flex justify-between">
            <a href="project-detail.html?id=${data.indexOf(
              project
            )}" class="text-primary hover:underline font-medium">View Details</a>
            ${
              project.github
                ? `<a href="${project.github}" target="_blank" class="text-gray-500 hover:text-primary"><i class="fab fa-github"></i></a>`
                : ""
            }
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
