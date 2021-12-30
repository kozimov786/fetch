const API_KEY = "cc67f65686064cd1b4559c35df33aaa7"
const TOP_HEADLINES_URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;
const SEARCH_URL = `https://newsapi.org/v2/everything?apiKey=${API_KEY}`;


const elNewsFragment = document.createDocumentFragment()
const elNewsList = document.querySelector('.news-list')
const elNewsTemp = document.querySelector('#newsTemp').content

const elForm = document.querySelector('.news-form')
const elInput = document.querySelector('.news-input')

function showNews(articles) {
  elNewsList.innerHTML = "";
  articles.forEach(article => {
    const elNewsItem = elNewsTemp.cloneNode(true)
    elNewsItem.querySelector('a').href = article.url;
    elNewsItem.querySelector('h3').textContent = article.title;
    elNewsItem.querySelector('p').textContent = article.source.name;
    elNewsFragment.appendChild(elNewsItem)
  })
  elNewsList.appendChild(elNewsFragment)
}


function getNewsJson(url, func) {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data.status === "ok") {
        func(data.articles)
      }
    })
}


function onSubmitHandler(e) {
  e.preventDefault()
  const urlForSearch = `${SEARCH_URL}&q=${elInput.value.trim()}`;

  getNewsJson(urlForSearch, showNews)
}
if (elForm) {
  elForm.addEventListener('submit', onSubmitHandler)
}
getNewsJson(TOP_HEADLINES_URL, showNews)