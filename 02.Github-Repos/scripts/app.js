function loadRepos() {
  // console.log("TODO...");
  const userID = document.getElementById("username").value;
  const reposList = document.getElementById("repos");
  const baseUrl = `https://api.github.com/users/${userID}/repos`;

  fetch(baseUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      let arr = Array.from(data);
      reposList.innerHTML = "";

      arr.forEach((repo) => {
        const ancElm = document.createElement("a");
        ancElm.textContent = `${userID}/${repo.name}`;
        ancElm.href = `https://github.com/${repo.full_name}`;
        const liElm = document.createElement("li");
        liElm.appendChild(ancElm);
        reposList.appendChild(liElm);
      });
    })
    .catch((error) => {});
}
