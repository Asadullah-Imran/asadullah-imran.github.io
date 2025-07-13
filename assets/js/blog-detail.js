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

  const postId = getQueryParam("id");
  const blogData = await fetchData("data/blog.json");
  const container = document.getElementById("blog-detail-container");

  if (!blogData || !blogData.posts) {
    container.innerHTML = `<div class='text-center text-red-500'>Unable to load blog data.</div>`;
    return;
  }

  const post = blogData.posts.find((p) => String(p.id) === String(postId));
  if (!post) {
    container.innerHTML = `<div class='text-center text-red-500'>Blog post not found.</div>`;
    return;
  }

  container.innerHTML = `
    <div class="max-w-2xl mx-auto">
      <div class="mb-8">
        <img src="${post.image}" alt="${
    post.title
  }" class="w-full h-64 object-cover rounded-lg shadow" />
      </div>
      <div class="mb-4 flex items-center justify-between">
        <span class="text-xs text-gray-500">${new Date(
          post.date
        ).toLocaleDateString()}</span>
        <span class="text-xs text-primary font-semibold">${post.readTime}</span>
      </div>
      <h1 class="text-3xl font-bold text-primary mb-4">${post.title}</h1>
      <div class="flex flex-wrap gap-2 mb-6">
        ${post.tags
          .map(
            (tag) =>
              `<span class="bg-primary-light text-primary text-xs px-3 py-1 rounded-full">${tag}</span>`
          )
          .join("")}
      </div>
      <p class="text-lg text-gray-700 mb-8">${post.excerpt}</p>
      <div class="prose max-w-none text-dark">
        <p>This is a placeholder for the full blog content. You can extend the JSON or load HTML content for each post if needed.</p>
      </div>
    </div>
  `;
});
