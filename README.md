# Asadullah Imran Portfolio

A modern, responsive personal portfolio website for Asadullah Imran, built with HTML, Tailwind CSS, and vanilla JavaScript. All content is dynamically loaded from JSON files for easy updates.

---

## 🚀 Features

- **Single source of truth:** All data (projects, blog, skills, etc.) is in JSON files under `data/`.
- **Reusable components:** Navbar is a single HTML component included on every page via JavaScript.
- **Dynamic content:** About, Projects, Skills, Blog, and Blog Detail pages all load content dynamically.
- **Responsive design:** Built with Tailwind CSS for mobile and desktop.
- **Easy to update:** Add new projects, blog posts, or skills by editing JSON files—no need to touch HTML.

---

## 📁 Folder Structure

```
asadullah-imran.github.io/
├── about.html
├── assets/
│   ├── components/
│   │   └── navbar.html
│   ├── css/
│   │   └── custom.css
│   ├── images/
│   │   ├── affiliations/
│   │   ├── awards/
│   │   ├── blog/
│   │   ├── certifications/
│   │   ├── profile/
│   │   └── projects/
│   └── js/
│       ├── about.js
│       ├── blog-detail.js
│       ├── blog.js
│       ├── main.js
│       ├── navbar.js
│       ├── projects.js
│       └── skills.js
├── blog-detail.html
├── blog.html
├── data/
│   ├── achievements.json
│   ├── affiliations.json
│   ├── blog.json
│   ├── certifications.json
│   ├── education.json
│   ├── personal.json
│   ├── projects.json
│   └── skills.json
├── index.html
├── projects.html
├── skills.html
├── tailwind.config.js
└── .gitignore
```

---

## 🛠️ How to Use & Maintain

### 1. **Run Locally**

Just open `index.html` (or any page) in your browser. No build step is required.

### 2. **Update Content**

- **Personal info:** Edit `data/personal.json`.
- **Projects:** Edit `data/projects.json` and add images to `assets/images/projects/`.
- **Blog:** Edit `data/blog.json` and add images to `assets/images/blog/`.
- **Skills:** Edit `data/skills.json`.
- **Affiliations, Achievements, Education, Certifications:** Edit the respective JSON files in `data/`.

### 3. **Navbar Component**

- The navbar is in `assets/components/navbar.html`.
- It is loaded into every page via `<div id="navbar-include"></div>` and `assets/js/navbar.js`.
- To update navigation links, edit only `navbar.html`.

### 4. **Add a New Page**

- Copy an existing HTML file as a template.
- Add `<div id="navbar-include"></div>` at the top of the body.
- Add `<script src="assets/js/navbar.js"></script>` at the end of the body.

### 5. **Blog Detail Pages**

- Only one `blog-detail.html` is used for all blog posts.
- Clicking "Read More" on a blog post opens `blog-detail.html?id=POST_ID` and loads the correct post from `data/blog.json`.
- To add full content, add a `content` field to each post in `blog.json` and update `blog-detail.js` to render it.

### 6. **Images**

- Make sure image filenames in JSON match the files in the `assets/images/` folders.
- Use `.jpg` or `.png` for best browser compatibility.

### 7. **Deployment**

- Host the folder on GitHub Pages, Netlify, Vercel, or any static hosting provider.
- No server or build step is required.

---

## 📋 .gitignore

The `.gitignore` file ignores system files, logs, build output, and editor settings.

---

## 🙋‍♂️ Contributing

Feel free to fork and adapt for your own portfolio!

---

## 📧 Contact

For questions or feedback, reach out via the contact section on the site or email: asadullahimran19@gmail.com
