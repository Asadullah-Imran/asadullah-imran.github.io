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
      <div class="project-card bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition-transform duration-300 flex flex-col min-h-[500px] animate-fadeIn" 
           data-category="${project.isAcademic ? "academic" : "web"}">
        <div class="relative h-48 overflow-hidden group">
          <a href="project-detail.html?id=${projectsData.indexOf(project)}">
            <img src="${project.featuredImage.src}" alt="${
          project.featuredImage.alt || project.title
        }" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
          </a>
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end p-4">
            <h3 class="text-white text-xl font-bold">${project.title}</h3>
          </div>
          <div class="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition duration-300">
            ${
              project.github
                ? `
              <a href="${project.github}" target="_blank" class="bg-white/90 text-primary rounded-full w-10 h-10 flex items-center justify-center hover:bg-white transition transform hover:scale-110">
                <i class="fab fa-github"></i>
              </a>
            `
                : ""
            }
            ${
              project.demo
                ? `
              <a href="${project.demo}" target="_blank" class="bg-white/90 text-primary rounded-full w-10 h-10 flex items-center justify-center hover:bg-white transition transform hover:scale-110">
                <i class="fas fa-external-link-alt"></i>
              </a>
            `
                : ""
            }
          </div>
        </div>
        <div class="flex-1 flex flex-col p-6">
          <p class="text-sm text-primary font-medium mb-2">${
            project.category
          }</p>
          <p class="text-gray-600 mb-4">${
            project.tagline || project.description.substring(0, 100) + "..."
          }</p>
          <div class="flex flex-wrap gap-2 mb-4">
            ${project.technologies
              .slice(0, 5)
              .map(
                (tech) => `
              <span class="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full">${tech}</span>
            `
              )
              .join("")}
            ${
              project.technologies.length > 5
                ? `<span class="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full">+${
                    project.technologies.length - 5
                  }</span>`
                : ""
            }
          </div>
          ${
            project.features
              ? `
            <div class="mt-auto border-t pt-4 mb-4">
              <h4 class="font-semibold text-primary mb-2">Key Features:</h4>
              <ul class="space-y-1 text-sm text-gray-600">
                ${project.features
                  .slice(0, 3)
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
        <div class="px-6 pb-6 pt-0">
          <a href="project-detail.html?id=${projectsData.indexOf(
            project
          )}" class="inline-block w-full text-center bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 rounded-lg font-medium transition hover:opacity-90 hover:shadow-lg">View Details <i class="fas fa-arrow-right ml-1"></i></a>
        </div>
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
  triggerFadeInAnimations();
});
