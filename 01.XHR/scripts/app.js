function loadRepos() {
  // console.log("TODO...");
  const baseUrl = "https://api.github.com/users/testnakov/repos";
  const output = document.getElementById("res");
  fetch(baseUrl)

    .then((response) => response.json())
    .then((data) => {
      output.textContent = JSON.stringify(data,null,10); // Pretty-print JSON
      console.log(data);
      
    })
    .catch((error) => {
      output.textContent = "Error loading repositories";
      console.error("Error:", error);
    });
}
