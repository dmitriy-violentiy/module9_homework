const but = document.querySelector('.but');
const res = document.querySelector('.result');


async function useRequest(page, limit) {
   const response = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`)
   return response.json()
}

const displayRes = (jsonData) => {
   let cards = '';
   jsonData.forEach((item) => {
      let cardBlock = `
      <div class="card">
      <img
         src="${item.download_url}"
         class="card-image"
      />
      <p>${item.author}</p>
      </div>`;
      cards = cards + cardBlock;
   })
   res.innerHTML = cards;
}


const page = document.querySelector('.page');
const limit = document.querySelector('.limit');

console.log(localStorage.getItem('page'))
console.log(localStorage.getItem('limit'))

function validateInfo() {
   if ((page.value < 1 || page.value > 10 || page.value == 'null') && (limit.value < 1 || limit.value > 10 || limit.value == 'null')) {
      res.innerText = 'Номер страницы и лимит вне диапазона от 1 до 10';
} else if (limit.value < 1 || limit.value > 10) {
      res.innerText = 'Лимит вне диапазона от 1 до 10';
} else if (page.value < 1 || page > 10) {
   res.innerText = 'Номер страницы вне диапазона от 1 до 10';
} else {
   useRequest(localStorage.getItem('page'), localStorage.getItem('limit'))
   .then(response => {
      displayRes(response)
   })
   .catch()
};
}

document.addEventListener('DOMContentLoaded',
useRequest(localStorage.getItem('page'), localStorage.getItem('limit'))
.then(response => {
   displayRes(response)
})
.catch())


but.addEventListener('click', async () => {
   localStorage.setItem('page', page.value)
   localStorage.setItem('limit', limit.value)
validateInfo()
});
