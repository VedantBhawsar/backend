const { default: axios } = require('axios');

let page = 47;
async function fetching() {
  const { data } = await axios.get(
    `http://localhost:3001/anime/popular?page=${page}`
  );

  data?.forEach(async (element) => {
    await axios
      .get(`http://localhost:3001/anime/fetch/${element.id}`)
      .catch((error) => console.log(error.message));
  });

  if (page < 100) {
    page++;
    setTimeout(() => {
      fetching();
    }, 3000);
  }
}

fetching();
