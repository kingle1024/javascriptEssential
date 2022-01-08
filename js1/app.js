const ajax = new XMLHttpRequest(); 
const container = document.getElementById('root');
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json';
const content = document.createElement('div');

function getDate(url) {
    ajax.open('GET', url, false);
    ajax.send();

    return JSON.parse(ajax.response);
}

const newsFeed = getDate(NEWS_URL);
const ul = document.createElement('ul');

window.addEventListener('hashchange', function(){
    const id = location.hash.substring(1);
    
    const newsContent = getDate(CONTENT_URL.replace('@id',id));
    const title = document.createElement('h1');
    
    title.innerHTML = newsContent.title;
 
    content.appendChild(title);
});
for(let i = 0; i<10; i++){
    const div = document.createElement('div');
    
    div.innerHTML = `
    <li>
        <a href="#${newsFeed[i].id}">
            ${newsFeed[i].title} (${newsFeed[i].comments_count})
        </a>
    </li>
    `;
    // a.addEventListener('click', function() {});

    ul.appendChild(div.firstElementChild); // div.children[0] == div.firstElementChild
}    


container.appendChild(ul);
container.appendChild(content);