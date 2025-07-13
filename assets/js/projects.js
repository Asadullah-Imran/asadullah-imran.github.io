document.addEventListener("DOMContentLoaded", async function () {
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

  // Load projects data
  const projectsData = await fetchData("data/projects.json");
  if (!projectsData) return;

  const container = document.getElementById("projects-container");
  const gridParent = container.parentElement;
  let currentCount = 6;

  // Function to render projects
  function renderProjects(filter = "all", count = 6) {
    const filteredProjects =
      filter === "all"
        ? projectsData
        : projectsData.filter((project) =>
            filter === "web" ? !project.isAcademic : project.isAcademic
          );

    container.innerHTML = filteredProjects
      .slice(0, count)
      .map(
        (project, idx) => `
      <div class="project-card bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl hover:scale-105 transition-transform duration-300 flex flex-col min-h-[500px]" 
           data-category="${project.isAcademic ? "academic" : "web"}">
        <div class="relative h-48 overflow-hidden">
          <a href="project-detail.html?id=${projectsData.indexOf(project)}">
            <img src="${project.image}" alt="${
          project.alt || project.title
        }" class="w-full h-full object-cover">
          </a>
          <div class="absolute inset-0 bg-black/30 flex items-center justify-center gap-4 opacity-0 hover:opacity-100 transition">
            ${
              project.github
                ? `
              <a href="${project.github}" target="_blank" class="bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-primary-dark transition">
                <i class="fab fa-github"></i>
              </a>
            `
                : ""
            }
            ${
              project.demo
                ? `
              <a href="${project.demo}" target="_blank" class="bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-primary-dark transition">
                <i class="fas fa-external-link-alt"></i>
              </a>
            `
                : ""
            }
          </div>
        </div>
        <div class="flex-1 flex flex-col p-6">
          <h3 class="text-xl font-bold mb-2">
            <a href="project-detail.html?id=${projectsData.indexOf(
              project
            )}" class="hover:text-primary transition">${project.title}</a>
          </h3>
          <p class="text-gray-600 mb-4">${project.description}</p>
          <div class="flex flex-wrap gap-2 mb-4">
            ${project.technologies
              .map(
                (tech) => `
              <span class="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full">${tech}</span>
            `
              )
              .join("")}
          </div>
          ${
            project.features
              ? `
            <div class="border-t pt-4 mb-4">
              <h4 class="font-semibold text-primary mb-2">Key Features:</h4>
              <ul class="space-y-1 text-sm text-gray-600">
                ${project.features
                  .map(
                    (feature) => `
                  <li class="flex items-start">
                    <i class="fas fa-check text-primary mr-2 mt-1 text-xs"></i>
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
        </div>
        <a href="project-detail.html?id=${projectsData.indexOf(
          project
        )}" class="inline-block bg-accent text-white px-4 py-2 rounded-lg font-medium transition hover:bg-accent-dark hover:scale-105 m-6 mt-0">View Details <i class="fas fa-arrow-right"></i></a>
      </div>
    `
      )
      .join("");

    // Add View More button if there are more projects to show
    let viewMoreBtn = document.getElementById("view-more-projects-btn");
    if (viewMoreBtn) viewMoreBtn.remove();
    if (filteredProjects.length > count) {
      const btn = document.createElement("button");
      btn.id = "view-more-projects-btn";
      btn.textContent = "View More";
      btn.className =
        "block mx-auto mt-8 bg-primary text-white px-6 py-3 rounded-lg font-medium transition hover:bg-primary-dark hover:scale-105";
      btn.onclick = function () {
        currentCount += 6;
        renderProjects(filter, currentCount);
      };
      gridParent.appendChild(btn);
    }
  }

  // Initial render
  renderProjects();

  // Filter functionality
  const filterButtons = document.querySelectorAll(".filter-btn");
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Update active button
      filterButtons.forEach((btn) => {
        if (btn === button) {
          btn.classList.add("bg-primary", "text-white");
          btn.classList.remove(
            "border",
            "text-primary",
            "hover:bg-primary",
            "hover:text-white"
          );
        } else {
          btn.classList.remove("bg-primary", "text-white");
          btn.classList.add(
            "border",
            "text-primary",
            "hover:bg-primary",
            "hover:text-white"
          );
        }
      });
      currentCount = 6;
      renderProjects(button.dataset.filter, currentCount);
    });
  });
});
