"use strict";

var _litHtml = require("../04.Cookbook/node_modules/lit-html/lit-html.js");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _templateObject() {
  var data = _taggedTemplateLiteral(["<h1>Hello ", "</h1>"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

window.onload = function (event) {
  var loadingEl = document.querySelector("body > main > p");
  var mainEl = document.querySelector("body > main");
  var recipiesUrl = "http://localhost:3030/jsonstore/cookbook/recipes";
  var main = document.querySelector("main");

  function loadRecipes() {
    var response, sayHello, data;
    return regeneratorRuntime.async(function loadRecipes$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return regeneratorRuntime.awrap(fetch(recipiesUrl));

          case 3:
            response = _context.sent;

            sayHello = function sayHello(name) {
              return (0, _litHtml.html)(_templateObject(), name);
            };

            (0, _litHtml.render)(sayHello("World!"), document.main);
            _context.next = 8;
            return regeneratorRuntime.awrap(response.json());

          case 8:
            data = _context.sent;
            recipesData = data; // Store recipes

            main.innerHTML = ""; // Clear loading text

            Object.values(data).forEach(function (recipe) {
              var article = document.createElement("article");
              article.classList.add("preview");
              article.innerHTML = "\n            <div class=\"title\">\n                <h2>".concat(recipe.name, "</h2>\n            </div>\n            <div class=\"small\">\n                <img src=\"").concat(recipe.img, "\">\n            </div>\n            ");
              article.classList.add("preview");
              main.appendChild(article);
              article.addEventListener("click", function () {
                toggleDetails(recipe.name);
              });
            });
            _context.next = 17;
            break;

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](0);
            main.innerHTML = "<p style=\"color: red;\">Error loading recipes</p>";

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 14]]);
  }

  function toggleDetails(recipeName) {
    var article, recipe, recipeUrl, response, details, clearArticle, titleEL, bandEl, thumbEl, imgEl, ingredients, description;
    return regeneratorRuntime.async(function toggleDetails$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            article = _toConsumableArray(document.querySelectorAll("article")).find(function (a) {
              return a.querySelector("h2").textContent === recipeName;
            });

            if (article) {
              _context2.next = 3;
              break;
            }

            return _context2.abrupt("return");

          case 3:
            if (article.classList.contains("preview")) {
              _context2.next = 7;
              break;
            }

            article.innerHTML = "";
            loadRecipes(); // article.classList.add("preview");

            return _context2.abrupt("return");

          case 7:
            recipe = Object.values(recipesData).find(function (r) {
              return r.name === recipeName;
            });

            if (recipe) {
              _context2.next = 10;
              break;
            }

            return _context2.abrupt("return");

          case 10:
            recipeUrl = "http://localhost:3030/jsonstore/cookbook/details/".concat(recipe._id);
            console.log(recipeUrl);
            _context2.prev = 12;
            _context2.next = 15;
            return regeneratorRuntime.awrap(fetch(recipeUrl));

          case 15:
            response = _context2.sent;
            _context2.next = 18;
            return regeneratorRuntime.awrap(response.json());

          case 18:
            details = _context2.sent;
            clearArticle = document.querySelector(".preview");
            article.removeChild(article.firstChild);
            article.removeChild(article.firstChild);
            article.removeChild(article.firstChild);
            article.removeChild(article.firstChild);
            titleEL = document.createElement("h2");
            titleEL.textContent = details.name;
            bandEl = document.createElement("div");
            bandEl.classList.add("band");
            thumbEl = document.createElement("div");
            thumbEl.classList.add("thumb");
            imgEl = document.createElement("img");
            imgEl.src = details.img;
            thumbEl.appendChild(imgEl);
            ingredients = document.createElement("div");
            ingredients.classList.add("ingredients");
            bandEl.append(thumbEl, ingredients);
            description = document.createElement("div");
            description.classList.add("description");
            ingredients.innerHTML = "\n            <h3>Ingredients:</h3>\n            <ul>".concat(details.ingredients.map(function (ing) {
              return "<li>".concat(ing, "</li>");
            }).join(""), "</ul>\n        ");
            description.innerHTML = "\n            <h3>Preparation:</h3>\n            ".concat(details.steps.map(function (step) {
              return "<p>".concat(step, "</p>");
            }).join(""), "\n        ");
            article.removeAttribute("class");
            article.append(titleEL, bandEl, description);
            _context2.next = 47;
            break;

          case 44:
            _context2.prev = 44;
            _context2.t0 = _context2["catch"](12);
            alert("Error loading recipe details");

          case 47:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[12, 44]]);
  }

  loadRecipes(); //   fetch(recipiesUrl)
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