async function fetch1() {
  const data = await fetch("http://localhost:3001/")
    .then(async (res) => {
      const response = await res.json();
      console.log(response.message);
    })
    .catch((err) => console.log(err));
}

for (var i = 0; i < 10000; i++) {
  fetch1();
}
