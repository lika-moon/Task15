let categories = ["Наука", "Образование", "Технологии", "Спорт", "Здоровье"];
const sites = {
    "Наука": [
        {
            name: "NASA",
            description: "Национальное управление по аэронавтике и исследованию космического пространства.",
            url: "https://www.nasa.gov",
            counter: 0,
            like: "./img/redHeart.png",
        },
        {
            name: "Nature",
            description: "Журнал, в котором публикуются исследования в основном естественно-научной тематики.",
            url: "https://www.nature.com",
            counter: 0,
            like: "./img/redHeart.png",
        }
    ],
    "Образование": [
        {
            name: "Coursera",
            description: "Сайт лучших курсов университетов мира.",
            url: "https://www.coursera.org",
            counter: 0,
            like: "./img/redHeart.png",
        },
        {
            name: "edX",
            description: "Проект, нацеленный на бесплатное обучение слушателей со всего мира.",
            url: "https://www.edx.org",
            counter: 0,
            like: "./img/redHeart.png",

        }
    ],
    "Технологии": [
        {
            name: "TechCrunch",
            description: "Интернет-издание о стартапах, интернет-бизнесе, инновациях и веб-сайтах.",
            url: "https://techcrunch.com",
            counter: 0,
            like: "./img/redHeart.png",
        },
        {
            name: "The Verge",
            description: "Американский веб-сайт о компьютерной технике, гаджетах и стиле жизни.",
            url: "https://www.theverge.com",
            counter: 0,
            like: "./img/redHeart.png",
        }
    ],
    "Спорт": [
        {
            name: "SportBox",
            description: "Спортивный медиа-портал, входящий в состав холдинга «Матч!».",
            url: "https://news.sportbox.ru",
            counter: 0,
            like: "./img/redHeart.png",
        },
        {
            name: "Чемпионат",
            description: "Сайт спортивной тематики, на котором обширно освещаются спортивные новости.",
            url: "https://www.championat.com",
            counter: 0,
            like: "./img/redHeart.png",
        },
    ],
    "Здоровье": [
        {
            name: "PRO Здоровье",
            description: "Академия интегративной нутрициологии.",
            url: "https://www.prozdor.ru",
            counter: 0,
            like: "./img/redHeart.png",
        },
        {
            name: "Мед-Инфо",
            description: "Социальный проект, направленный на популяризацию здорового образа жизни.",
            url: "https://med-info.ru",
            counter: 0,
            like: "./img/redHeart.png",
        }
    ]
};
console.log(sites)
const searchingResults = [];

// отображение категорий
const displayCategories = (categories) => {
    let categoryDisplay = document.querySelector('#categories');
    categoryDisplay.innerHTML = '<h3>Категории сайтов:</h3>'
    categories
        .forEach((category) => {
            const button = document.createElement('button');
            button.textContent = category;
            categoryDisplay.appendChild(button)
            button.addEventListener("click", () => displaySites(category));
        })
}
displayCategories(categories)

//отображение сайтов по по выбранной категории
//Создайте функционал для оценки сайтов пользователями с обновлением информации 
// в реальном времени.
function displaySites(category) {
    let sitesDisplay = document.querySelector('#sites');
    sitesDisplay.innerHTML = ''
    sites[category].forEach(site => {
        const link = document.createElement('a');
        link.style = "text-decoration: none ";
        link.href = site.url;
        link.textContent = site.url;
        link.target = "_blank";

        const description = document.createElement("p");
        description.textContent = site.description;

        const siteName = document.createElement('h4')
        siteName.textContent = site.name;

        const counter = document.createElement('span');
        counter.textContent = site.counter;

        const buttonImg = document.createElement('img');
        buttonImg.alt = site.name;
        buttonImg.src = site.like;

        buttonImg.addEventListener("click", function () {
            site.counter++;
            counter.textContent = site.counter;
        })
        sitesDisplay.append(siteName, link, buttonImg, counter, description);
    });
}
// Функция для поиска сайтов по ключевому слову
// Реализуйте поле поиска для поиска по всем сайтам. Используйте
// метод filter для фильтрации массива сайтов по ключевому слову.

function searchSites() {
    const allSites = document.querySelector('#sites')
    const searchInput = document.querySelector("#searchInput");
    const keyword = searchInput.value.toLowerCase();
    const filteredSites = Object.values(sites).flat().filter(site => site.name.toLowerCase().includes(keyword) || site.description.toLowerCase().includes(keyword));
    if (filteredSites.length === 0) {
        allSites.innerHTML = "<h2> Поиск не дал результатов. </h2>";

    } else {
        filteredSites.map((element => searchingResults.push(element)))
        allSites.innerHTML = "<h2> Результаты поиска: </h2>";
    }
    searchInput.value = '';

    filteredSites.forEach(site => {
        const link = document.createElement("a");
        link.style = "text-decoration: none ";
        link.href = site.url;
        link.textContent = site.url;
        link.target = "_blank";
        allSites.appendChild(link);
        allSites.appendChild(document.createElement("p"));
    });
}
// Реализуйте возможность добавления новых сайтов пользователями 
// в существующие категории.

function addSite(event) {
    event.preventDefault();
    const nameSite = document.querySelector('#nameOfSite');
    const linkSite = document.querySelector('#linkOfSite');
    const descriptionSite = document.querySelector('#descriptionOfSite');
    const category = document.querySelector('#category').value;

    const nameOfSite = nameSite.value;
    const linkOfSite = linkSite.value;
    const descriptionOfSite = descriptionSite.value;

    const newSite = {
        name: nameOfSite,
        description: descriptionOfSite,
        url: linkOfSite,
        counter: 0,
        like: "./img/redHeart.png",
    };

    if (nameOfSite && linkOfSite && descriptionOfSite) {
        if (sites[category]) {
            sites[category].push(newSite);
            console.log(newSite);
            displaySites(category);
            nameSite.value = '';
            linkSite.value = '';
            descriptionSite.value = '';
        }
    } else {
        prompt("Пожалуйста, заполните все поля");
    }
}

const addSiteButton = document.querySelector("#addSiteButton");
addSiteButton.addEventListener("click", addSite);


