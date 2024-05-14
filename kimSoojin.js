const quoteContainer = document.querySelector('.quote-container');
const quoteBtn = document.querySelector('.quoteBtn');
const quoteNewBtn = document.querySelector('.quoteNewBtn');

const reanderHTml = (data) => {
  quoteContainer.innerHTML = `
  <p class="quote-text">${data.quote.body}</p>
  <p class="quote-author">${data.quote.author}</p>
`;
};

const getLatestData = async () => {
  try {
    const response = await fetch(
      'https://cors-anywhere.herokuapp.com/https://favqs.com/api/qotd'
    );
    const data = await response.json();
    console.log('Data:', data);
    console.log(`Quote: ${data.quote.body}`);
    console.log(`Author: ${data.quote.author}`);

    reanderHTml(data);
  } catch (error) {
    console.error('Error:', error);
  }
};

getLatestData();

quoteNewBtn.addEventListener('click', getLatestData);
quoteBtn.addEventListener('click', () => {
  quoteContainer.classList.toggle('on');
});
