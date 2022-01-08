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

function newsFeed(){
    const newsFeed = getDate(NEWS_URL);
    const newsList = [];
    newsList.push('<ul>');
    for(let i = 0; i<10; i++){
        const div = document.createElement('div');    
        newsList.push(`
        <li>
            <a href="#${newsFeed[i].id}">
                ${newsFeed[i].title} (${newsFeed[i].comments_count})
            </a>
        </li>
        `);
    }    
    
    newsList.push('</ul>');
    container.innerHTML = newsList.join(''); // join 함수가 ,를 기본으로 없애준다.
}

function newsDetail(){
    const id = location.hash.substring(1);
    const newsContent = getDate(CONTENT_URL.replace('@id',id));

    container.innerHTML = `
    <h1>${newsContent.title}</h1>
    
    <div> 
        <a href="#">목록으로</a>
    </div>
    `;
}

function router(){
    const routePath = location.hash;
    console.log(routePath);
    if(routePath === '') // location.hash에 #만 들어 있을 때에는 자동으로 #을 빼준다.
        newsFeed();
    else
        newsDetail();
}

window.addEventListener('hashchange', router);

router();