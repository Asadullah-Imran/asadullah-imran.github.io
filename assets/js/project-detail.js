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
    <div class="max-w-2xl mx-auto">
      <div class="mb-8">
        <img src="${project.image}" alt="${
    project.title
  }" class="w-full h-64 object-cover rounded-lg shadow" />
      </div>
      <h1 class="text-3xl font-bold text-primary mb-4">${project.title}</h1>
      <p class="text-lg text-gray-700 mb-6">${project.description}</p>
      <div class="flex flex-wrap gap-2 mb-6">
        ${project.technologies
          .map(
            (tech) =>
              `<span class="bg-primary-light text-primary text-xs px-3 py-1 rounded-full">${tech}</span>`
          )
          .join("")}
      </div>
      ${
        project.features
          ? `
        <div class="mb-6">
          <h4 class="font-semibold text-primary mb-2">Key Features:</h4>
          <ul class="space-y-1 text-sm text-gray-600">
            ${project.features
              .map(
                (feature) =>
                  `<li class="flex items-start"><i class="fas fa-check text-primary mr-2 mt-1 text-xs"></i><span>${feature}</span></li>`
              )
              .join("")}
          </ul>
        </div>
      `
          : ""
      }
      <div class="flex gap-4 mt-6">
        ${
          project.github
            ? `<a href="${project.github}" target="_blank" class="bg-primary text-white px-4 py-2 rounded-lg font-medium transition hover:bg-primary-dark flex items-center gap-2"><i class="fab fa-github"></i> GitHub</a>`
            : ""
        }
        ${
          project.demo
            ? `<a href="${project.demo}" target="_blank" class="bg-accent text-white px-4 py-2 rounded-lg font-medium transition hover:bg-accent-dark flex items-center gap-2"><i class="fas fa-external-link-alt"></i> Live Demo</a>`
            : ""
        }
      </div>
    </div>
  `;
});
