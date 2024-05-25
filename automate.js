const { default: axios } = require('axios');

// let page = 47;
// async function fetching() {
//   const { data } = await axios.get(
//     `http://localhost:3001/anime/popular?page=${page}`
//   );

//   data?.forEach(async (element) => {
//     await axios
//       .get(`http://localhost:3001/anime/fetch/${element.id}`)
//       .catch((error) => console.log(error.message));
//   });

//   if (page < 100) {
//     page++;
//     setTimeout(() => {
//       fetching();
//     }, 3000);
//   }
// }

// // fetching();


// async function reverse_proxy(){
//   const {data} = await axios.get('https://embtaku.pro/download?id=MjEzMDA4&token=PPQjf03A8ISCJD0BerC9iA&expires=1716481205').catch(error => console.log(error.message))
//   console.log(data)
// }


// reverse_proxy()



const puppeteer = require('puppeteer')


const Nod = async()=>  {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto('https://embtaku.pro/download?id=MjEzMDA4&token=PPQjf03A8ISCJD0BerC9iA&expires=1716481205');

  // Set screen size
  await page.setViewport({width: 1080, height: 1024});

  // Type into search box
  // await page.type('.devsite-search-field', 'automate beyond recorder');

  // Wait and click on first result
  const searchResultSelector = '.download';
  console.log(searchResultSelector)
  await page.waitForSelector(searchResultSelector);
  console.log(page)
  await page.click(searchResultSelector);

  // Locate the full title with a unique string
  const textSelector = await page.waitForSelector(
    'text/Customize and automate'
  );
  const fullTitle = await textSelector?.evaluate(el => el.textContent);

  // Print the full title
  console.log('The title of this blog post is "%s".', fullTitle);

  await browser.close();
};


Nod()