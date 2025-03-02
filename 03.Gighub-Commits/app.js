function loadCommits() {
  // Try it with Fetch API
  console.log("TODO...");

  const username = document.getElementById("username");
  const repo = document.getElementById("repo");
  const baseUrll = `https://api.github.com/repos/${username}/${repo}/commits`;

  fetch("https://github.com/nakov/nakov.io.cin/commits")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
    //   let arr = Array.from(data);
    //   reposList.innerHTML = "";
      console.log(data);

      // arr.forEach((repo) => {
      //   const ancElm = document.createElement("a");
      //   ancElm.textContent = `${userID}/${repo.name}`;
      //   ancElm.href = `https://github.com/${repo.full_name}`;
      //   const liElm = document.createElement("li");
      //   liElm.appendChild(ancElm);
      //   reposList.appendChild(liElm);
    })
    .catch((error) => {});
}
