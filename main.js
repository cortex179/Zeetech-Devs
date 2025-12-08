function toggleBlog(){
  const blog = document.getElementById('blog');
  blog.classList.toggle('show');
}

let blogsData = [];

document.addEventListener("DOMContentLoaded", () => {
  fetch("info.json")
    .then(response => response.json())
    .then(data => {
      blogsData = data;
      displayBlogs(data);
    });

  document.getElementById("searchInput").addEventListener("input", (e) => {
    const searchValue = e.target.value.toLowerCase();
    const filtered = blogsData.filter(blog =>
      blog.title.toLowerCase().includes(searchValue)
    );
    displayBlogs(filtered);
  });
});

function displayBlogs(blogs) {
  const blogPage = document.getElementById("blogPage");
  blogPage.innerHTML = "";

  blogs.forEach(blog => {
    const preview = blog.content.slice(0, 100); // Preview of content
    const blogItem = `
      <div class="blog-post">
        <h3>${blog.title}</h3>
        <date>Date: ${blog.date}</date>
        <br>
        <small>By ${blog.author}</small>
        <p>${blog.preview}</p>
        <a href="blog-detail.html?id=${blog.id}" class='see'>See More...</a>
      </div>
    `;
    blogPage.innerHTML += blogItem;
  });
}

