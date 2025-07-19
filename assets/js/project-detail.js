document.addEventListener("DOMContentLoaded", async function () {
  function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  }

  async function fetchData(url) {
    try {
      const response = await fetch(url);
      return await response.json();
    } catch (e) {
      console.error(`Error loading ${url}:`, e);
      return null;
    }
  }

  const projectId = getQueryParam("id");
  const projectsData = await fetchData("data/projects.json");
  const container = document.getElementById("project-detail-container");

  if (!projectsData) {
    container.innerHTML = `<div class='text-center text-red-500'>Unable to load project data.</div>`;
    return;
  }

  const project = projectsData[projectId];
  if (!project) {
    container.innerHTML = `<div class='text-center text-red-500'>Project not found.</div>`;
    return;
  }

  container.innerHTML = `
    <div class="max-w-5xl mx-auto">
      <!-- Breadcrumb Navigation -->
      <nav class="mb-6 text-sm" aria-label="Breadcrumb">
        <ol class="flex items-center space-x-2">
          <li>
            <a href="projects.html" class="text-primary hover:underline">Projects</a>
          </li>
          <li class="text-gray-500">/</li>
          <li class="text-gray-600" aria-current="page">${project.title}</li>
        </ol>
      </nav>

      <!-- Hero Section -->
      <div class="mb-12 bg-gradient-to-r from-primary to-secondary rounded-xl p-8 text-white">
        <div class="flex flex-col md:flex-row gap-8 items-center">
          <div class="md:w-1/2">
            <h1 class="text-3xl md:text-4xl font-bold mb-2">${
              project.title
            }</h1>
            <p class="text-xl opacity-90 mb-4">${project.tagline}</p>
            <div class="flex flex-wrap gap-2 mb-6">
              ${project.technologies
                .map(
                  (tech) =>
                    `<span class="bg-white/20 text-white text-xs px-3 py-1 rounded-full">${tech}</span>`
                )
                .join("")}
            </div>
            <div class="flex gap-4">
              ${
                project.github
                  ? `<a href="${project.github}" target="_blank" class="bg-white text-primary px-4 py-2 rounded-lg font-medium transition hover:bg-white/90 flex items-center gap-2"><i class="fab fa-github"></i> GitHub</a>`
                  : ""
              }
              ${
                project.demo
                  ? `<a href="${project.demo}" target="_blank" class="bg-white text-primary px-4 py-2 rounded-lg font-medium transition hover:bg-white/90 flex items-center gap-2"><i class="fas fa-external-link-alt"></i> Live Demo</a>`
                  : ""
              }
            </div>
          </div>
          <div class="md:w-1/2">
            <img src="${project.featuredImage.src}" alt="${
    project.featuredImage.alt
  }" class="w-full h-64 md:h-80 object-cover rounded-lg shadow-xl transform rotate-1 hover:rotate-0 transition duration-300">
          </div>
        </div>
      </div>

      <!-- Project Content -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2">
          <!-- Description -->
          <div class="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 class="text-2xl font-bold text-primary mb-4">About the Project</h2>
            <div class="prose max-w-none">
              <p>${project.description}</p>
              ${
                project.purpose
                  ? `<p class="mt-4"><strong>Purpose:</strong> ${project.purpose}</p>`
                  : ""
              }
              ${
                project.impact
                  ? `<p class="mt-4"><strong>Impact:</strong> ${project.impact}</p>`
                  : ""
              }
            </div>
          </div>

          <!-- Screenshots Carousel -->
          ${
            project.screenshots && project.screenshots.length > 0
              ? `
            <div class="bg-white rounded-xl shadow-md p-6 mb-8">
              <h2 class="text-2xl font-bold text-primary mb-4">Project Screenshots</h2>
              <div class="swiper-container w-full overflow-hidden">
                <div class="swiper-wrapper">
                  ${project.screenshots
                    .map(
                      (screenshot) => `
                    <div class="swiper-slide flex justify-center items-center">
                      <img src="${screenshot.src}" alt="${screenshot.caption}" class="max-w-full max-h-96 object-contain rounded-lg">
                      <p class="text-center text-gray-600 mt-2 w-full">${screenshot.caption}</p>
                    </div>
                  `
                    )
                    .join("")}
                </div>
                <div class="swiper-pagination"></div>
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
              </div>
              <p class="text-center text-gray-400 text-xs mt-2">Swipe or use arrows to see more screenshots</p>
            </div>
          `
              : ""
          }
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Key Features -->
          ${
            project.features
              ? `
            <div class="bg-white rounded-xl shadow-md p-6">
              <h3 class="text-xl font-bold text-primary mb-3">Key Features</h3>
              <ul class="space-y-3">
                ${project.features
                  .map(
                    (feature) => `
                  <li class="flex items-start">
                    <div class="bg-primary/10 text-primary p-2 rounded-full mr-3">
                      <i class="fas fa-check text-sm"></i>
                    </div>
                    <span>${feature}</span>
                  </li>
                `
                  )
                  .join("")}
              </ul>
            </div>
          `
              : ""
          }

          <!-- What I Learned -->
          ${
            project.learnings
              ? `
            <div class="bg-white rounded-xl shadow-md p-6">
              <h3 class="text-xl font-bold text-primary mb-3">Key Learnings</h3>
              <ul class="space-y-3">
                ${project.learnings
                  .map(
                    (learning) => `
                  <li class="flex items-start">
                    <div class="bg-accent/10 text-accent p-2 rounded-full mr-3">
                      <i class="fas fa-lightbulb text-sm"></i>
                    </div>
                    <span>${learning}</span>
                  </li>
                `
                  )
                  .join("")}
              </ul>
            </div>
          `
              : ""
          }

          <!-- Challenges -->
          ${
            project.challenges
              ? `
            <div class="bg-white rounded-xl shadow-md p-6">
              <h3 class="text-xl font-bold text-primary mb-3">Challenges Faced</h3>
              <ul class="space-y-3">
                ${project.challenges
                  .map(
                    (challenge) => `
                  <li class="flex items-start">
                    <div class="bg-secondary/10 text-secondary p-2 rounded-full mr-3">
                      <i class="fas fa-exclamation-triangle text-sm"></i>
                    </div>
                    <span>${challenge}</span>
                  </li>
                `
                  )
                  .join("")}
              </ul>
            </div>
          `
              : ""
          }

          <!-- Project Info -->
          <div class="bg-white rounded-xl shadow-md p-6">
            <h3 class="text-xl font-bold text-primary mb-3">Project Info</h3>
            <div class="space-y-3">
              <div class="flex justify-between">
                <span class="text-gray-600">Category:</span>
                <span class="font-medium">${project.category}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Date:</span>
                <span class="font-medium">${new Date(
                  project.date
                ).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Type:</span>
                <span class="font-medium">${
                  project.isAcademic ? "Academic Project" : "Personal Project"
                }</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Initialize Swiper if screenshots exist
  if (project.screenshots && project.screenshots.length > 0) {
    const swiper = new Swiper(".swiper-container", {
      loop: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  }
});
