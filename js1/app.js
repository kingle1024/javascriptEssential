const ajax = new XMLHttpRequest(); 
const container = document.getElementById('root');
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json';
const content = document.createElement('div');
ajax.open('GET', NEWS_URL, false);
ajax.send(); // 실제 데이터를 가져오는 시점

const newsFeed = JSON.parse(ajax.response);
// console.log(newsFeed);

const ul = document.createElement('ul');

window.addEventListener('hashchange', function(){
    // console.log('해시가 변경됨');
    const id = location.hash.substring(1);
    
    ajax.open('GET', CONTENT_URL.replace('@id',id), false);
    ajax.send();
    const newsContent = JSON.parse(ajax.response);
    // console.log(newsContent);
    const title = document.createElement('h1');
    title.innerHTML = newsContent.title;
    content.appendChild(title);
    
    // document.getElementsByTagName(`#${newsContent.id}`).appendChild(content);
    // console.log(document.getElementsByTagName(`#${newsContent.id}`));
});
for(let i = 0; i<10; i++){
    const div = document.createElement('div');
    const li = document.createElement('li');
    // li.append(newsFeed[i].title);
    const a  = document.createElement('a');
    
    div.innerHTML = `
    <li>
        <a href="#${newsFeed[i].id}">
            ${newsFeed[i].title} (${newsFeed[i].comments_count})
        </a>
    </li>
    `;

    a.addEventListener('click', function() {});

    li.append(a);
    ul.appendChild(li);
}    


container.appendChild(ul);
container.appendChild(content);