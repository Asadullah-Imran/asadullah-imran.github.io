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

  const blogData = await fetchData("data/blog.json");
  if (!blogData || !blogData.posts) return;

  const blogList = document.getElementById("blog-list");
  blogList.innerHTML = blogData.posts
    .map(
      (post) => `
      <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl hover:scale-105 transition-transform duration-300 flex flex-col">
        <div class="h-48 overflow-hidden">
          <img src="${post.image}" alt="${
        post.alt || post.title
      }" class="w-full h-full object-cover" />
        </div>
        <div class="p-6 flex-1 flex flex-col">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs text-gray-500">${new Date(
              post.date
            ).toLocaleDateString()}</span>
            <span class="text-xs text-primary font-semibold">${
              post.readTime
            }</span>
          </div>
          <h3 class="text-xl font-bold mb-2">${post.title}</h3>
          <p class="text-gray-600 mb-4 flex-1">${post.excerpt}</p>
          <div class="flex flex-wrap gap-2 mb-4">
            ${post.tags
              .map(
                (tag) =>
                  `<span class="bg-primary-light text-primary text-xs px-3 py-1 rounded-full">${tag}</span>`
              )
              .join("")}
          </div>
          <a href="blog-detail.html?id=${
            post.id
          }" class="mt-auto inline-block text-accent hover:underline font-medium transition-transform duration-200 hover:scale-105">Read More <i class="fas fa-arrow-right"></i></a>
        </div>
      </div>
    `
    )
    .join("");
});
