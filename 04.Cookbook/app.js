import { html, render } from "../04.Cookbook/node_modules/lit-html/lit-html.js";

window.onload = (event) => {
  const loadingEl = document.querySelector("body > main > p");
  const mainEl = document.querySelector("body > main");

  const recipiesUrl = "http://localhost:3030/jsonstore/cookbook/recipes";

  const main = document.querySelector("main");

  async function loadRecipes() {
    try {
      const response = await fetch(recipiesUrl);
      let sayHello = (name) => html`<h1>Hello ${name}</h1>`;
      render(sayHello("World!"), document.main);
      const data = await response.json();
      recipesData = data; // Store recipes

      main.innerHTML = ""; // Clear loading text
      Object.values(data).forEach((recipe) => {
        const article = document.createElement("article");
        article.classList.add("preview");
        article.innerHTML = `
            <div class="title">
                <h2>${recipe.name}</h2>
            </div>
            <div class="small">
                <img src="${recipe.img}">
            </div>
            `;
        article.classList.add("preview");
        main.appendChild(article);
        article.addEventListener("click", () => {
          toggleDetails(recipe.name);
        });
      });
    } catch (error) {
      main.innerHTML = `<p style="color: red;">Error loading recipes</p>`;
    }
  }

  async function toggleDetails(recipeName) {
    const article = [...document.querySelectorAll("article")].find(
      (a) => a.querySelector("h2").textContent === recipeName
    );

    if (!article) return;

    if (!article.classList.contains("preview")) {
      article.innerHTML = "";
      loadRecipes();
      // article.classList.add("preview");
      return;
    }

    const recipe = Object.values(recipesData).find(
      (r) => r.name === recipeName
    );
    if (!recipe) return;

    const recipeUrl = `http://localhost:3030/jsonstore/cookbook/details/${recipe._id}`;
    console.log(recipeUrl);

    try {
      const response = await fetch(recipeUrl);

      const details = await response.json();
      const clearArticle = document.querySelector(".preview");

      article.removeChild(article.firstChild);
      article.removeChild(article.firstChild);
      article.removeChild(article.firstChild);
      article.removeChild(article.firstChild);

      const titleEL = document.createElement("h2");
      titleEL.textContent = details.name;
      const bandEl = document.createElement("div");
      bandEl.classList.add("band");
      const thumbEl = document.createElement("div");
      thumbEl.classList.add("thumb");
      const imgEl = document.createElement("img");
      imgEl.src = details.img;
      thumbEl.appendChild(imgEl);

      const ingredients = document.createElement("div");
      ingredients.classList.add("ingredients");

      bandEl.append(thumbEl, ingredients);

      const description = document.createElement("div");
      description.classList.add("description");

      ingredients.innerHTML = `
            <h3>Ingredients:</h3>
            <ul>${details.ingredients
              .map((ing) => `<li>${ing}</li>`)
              .join("")}</ul>
        `;
      description.innerHTML = `
            <h3>Preparation:</h3>
            ${details.steps.map((step) => `<p>${step}</p>`).join("")}
        `;

      article.removeAttribute("class");

      article.append(titleEL, bandEl, description);
    } catch (error) {
      alert("Error loading recipe details");
    }
  }

  loadRecipes();

  //   fetch(recipiesUrl)
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }
  //       setTimeout(() => {
  //         loadingEl.style.display = "none";
  //       }, 300);
  //       return response.json();
  //     })
  //     .then((data) => {
  //       // console.log(Object.values(data));
  //       const recipes = Object.values(data);
  //       recipes.forEach((recipe) => {
  //         const article = document.createElement("article");
  //         article.classList.add("preview");

  //         article.innerHTML = `
  //   <div class="title">
  //       <h2>${recipe.name}</h2>
  //   </div>
  //   <div class="small">
  //       <img src="${recipe.img}" alt="${recipe.name}">
  //   </div>
  // `;
  //         mainEl.appendChild(article);
  //       });
  //     })
  //     .then((data) => {

  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
};
