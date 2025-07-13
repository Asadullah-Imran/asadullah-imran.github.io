document.addEventListener("DOMContentLoaded", async function () {
  async function fetchData(url) {
    try {
      const response = await fetch(url);
      return await response.json();
    } catch (e) {
      console.error(`Error loading ${url}:`, e);
      return null;
    }
  }
  const skills = await fetchData("data/skills.json");
  if (!skills) return;
  // Programming
  document.getElementById("programming-skills").innerHTML =
    `<h2><i class='fas fa-code'></i> Programming</h2>` +
    skills.programming
      .map(
        (skill) => `
      <div class='skill-item'>
        <span class='skill-name'>${skill.name}</span>
        <div class='skill-bar'><div class='skill-level' style='width:${skill.level}%'></div></div>
        <span class='skill-percent'>${skill.level}%</span>
      </div>
    `
      )
      .join("");
  // Web
  document.getElementById("web-skills").innerHTML =
    `<h2><i class='fas fa-globe'></i> Web</h2>` +
    skills.web
      .map(
        (skill) => `
      <div class='skill-item'>
        <span class='skill-name'>${skill.name}</span>
        <div class='skill-bar'><div class='skill-level' style='width:${skill.level}%'></div></div>
        <span class='skill-percent'>${skill.level}%</span>
      </div>
    `
      )
      .join("");
  // Tools
  document.getElementById("tools-skills").innerHTML =
    `<h2><i class='fas fa-tools'></i> Tools</h2>` +
    skills.tools
      .map(
        (tool) =>
          `<div class='tool-badge'><i class='fas fa-check'></i> ${tool}</div>`
      )
      .join("");
  // Concepts
  document.getElementById("concepts-skills").innerHTML =
    `<h2><i class='fas fa-lightbulb'></i> Concepts</h2><ul>` +
    skills.concepts.map((concept) => `<li>${concept}</li>`).join("") +
    `</ul>`;
});
