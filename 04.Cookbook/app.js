window.onload = (event) => {
  const loadingEl = document.querySelector("body > main > p");
  const mainEl = document.querySelector("body > main");

  const recipiesUrl = "http://localhost:3030/jsonstore/cookbook/recipes";

  fetch(recipiesUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      setTimeout(() => {
        loadingEl.style.display = "none";
      }, 300);
      return response.json();
    })
    .then((data) => {
      console.log(Object.values(data));
      const recipes = Object.values(data);
      recipes.forEach((recipe) => {
        const article = document.createElement("article");
        article.classList.add("preview");

        article.innerHTML = `
  <div class="title">
      <h2>${recipe.name}</h2>
  </div>
  <div class="small">
      <img src="${recipe.img}" alt="${recipe.name}">
  </div>
`;
        mainEl.appendChild(article);
      });
    });
};
