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

  // Load skills data
  const skillsData = await fetchData("data/skills.json");
  if (!skillsData) return;

  // Programming Skills
  const programmingSkills = document.getElementById("programming-skills");
  if (programmingSkills && skillsData.programming) {
    programmingSkills.innerHTML = skillsData.programming
      .map(
        (skill) => `
      <div>
        <div class="flex justify-between items-center mb-1">
          <span class="font-medium">${skill.name}</span>
          <span class="text-sm text-gray-500">${skill.level}%</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2.5">
          <div class="bg-primary h-2.5 rounded-full" style="width: ${skill.level}%"></div>
        </div>
      </div>
    `
      )
      .join("");
  }

  // Web Skills
  const webSkills = document.getElementById("web-skills");
  if (webSkills && skillsData.web) {
    webSkills.innerHTML = skillsData.web
      .map(
        (skill) => `
      <div>
        <div class="flex justify-between items-center mb-1">
          <span class="font-medium">${skill.name}</span>
          <span class="text-sm text-gray-500">${skill.level}%</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2.5">
          <div class="bg-secondary h-2.5 rounded-full" style="width: ${skill.level}%"></div>
        </div>
      </div>
    `
      )
      .join("");
  }

  // Tools Skills
  const toolsSkills = document.getElementById("tools-skills");
  if (toolsSkills && skillsData.tools) {
    toolsSkills.innerHTML = skillsData.tools
      .map(
        (tool) => `
      <div class="bg-gray-100 text-gray-800 px-4 py-2 rounded-full flex items-center">
        <i class="fas fa-check text-primary mr-2"></i>
        <span>${tool}</span>
      </div>
    `
      )
      .join("");
  }

  // Concepts Skills
  const conceptsSkills = document.getElementById("concepts-skills");
  if (conceptsSkills && skillsData.concepts) {
    conceptsSkills.innerHTML = skillsData.concepts
      .map(
        (concept) => `
      <div class="flex items-start">
        <i class="fas fa-check text-primary mr-2 mt-1 text-sm"></i>
        <span>${concept}</span>
      </div>
    `
      )
      .join("");
  }
});
