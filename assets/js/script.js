document.addEventListener('DOMContentLoaded', () => {
    initializeLoadingScreens();
    loadDefaultTheme();
    loadNavigationAndFooter();
    initializeBackToTopButton();
});
// Loading 加載照片的動畫
function initializeLoadingScreens() {
    const loadingScreens = document.querySelectorAll('.loadingScreen');
    const images = document.querySelectorAll('.img-photo');
    images.forEach((image, index) => {
        const loadingScreen = loadingScreens[index];
        image.addEventListener('load', () => {
            if (loadingScreen) {
                loadingScreen.style.display = 'none';
            }
            image.style.display = 'block';
        });
        image.addEventListener('error', () => {
            if (loadingScreen) {
                loadingScreen.style.display = 'none';
            }
        });
        if (image.complete) {
            image.dispatchEvent(new Event('load'));
        }
    });
}
// 載入預設主題
function loadDefaultTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        const defaultTheme = 'dark-theme';
        applyTheme(defaultTheme);
    }
}
// 載入時加導覽欄和頁尾的資訊
function loadNavigationAndFooter() {
    function getPageName() {
        const path = window.location.pathname;
        const page = path.split("/").pop();
        const pageName = page.split(".")[0];
        return pageName;
    }

    const names = ['index', 'project', 'about'];
    const navnames = ['主要頁面', '作品展示', '關於我'];
    const icons = ['home', 'description', 'group'];
    let index = names.indexOf(getPageName());
    if (index === -1) index = 0;
    const left = index - 1 < 0 ? 2 : index - 1;
    const right = index + 1 > 2 ? 0 : index + 1;
    const foot = document.querySelector('footer');
    const blogTitle = document.querySelector('.blogTitle');
    blogTitle.innerHTML = `
        <h1>${navnames[index]}</h1>
        <div class="navigation">
            <nav onclick="redirectToPage('${names[left]}.html')">
                <span class="material-symbols-sharp">${icons[left]}</span>
                <p>${navnames[left]}</p>
            </nav>
            <nav onclick="redirectToPage('${names[right]}.html')">
                <span class="material-symbols-sharp">${icons[right]}</span>
                <p>${navnames[right]}</p>
            </nav>
            <nav onclick="window.open('https://github.com/ChenGuoXiang940', '_blank')">
                <span class="material-symbols-sharp">share</span>
                <p>Github</p>
            </nav>
            <nav onclick="toggleTheme()">
                <span class="material-symbols-sharp" id="theme-icon">light_mode</span>
                <p id="theme-p">亮色</p>
            </nav>
        </div>
        <div class="menu" onclick="toggleMenu()">
            <span class="material-symbols-sharp">menu</span>
        </div>`;
    foot.innerHTML = `
        <hr>
        <div class="footer-content">
            <div class="farea farea-top">
                <h2><img src="assets/images/me.png" class="footer-img" alt="個人網頁 Logo">個人網頁</h2>
                <p class="author">作者：<strong>陳國翔</strong></p>
                <a class="contact" href="mailto:s1411232069@ad1.nutc.edu.tw"><span class="material-symbols-sharp">mail</span>s1411232069@ad1.nutc.edu.tw</a>
                <p class="location"><span class="material-symbols-sharp">home</span>Taiwan, Taichung</p>
            </div>
            <div class="farea">
                <h3>導航</h3>
                <ul>
                    <li><a href="index.html">主要頁面</a></li>
                    <li><a href="project.html">作品展示</a></li>
                    <li><a href="about.html">關於我</a></li>
                    <li><a href="https://github.com/ChenGuoXiang940">Github</a></li>
                </ul>
            </div>
            <div class="farea">
                <h3>社交媒體</h3>
                <ul>
                    <li><a href="#">Facebook</a></li>
                    <li><a href="#">Twitter</a></li>
                    <li><a href="#">LinkedIn</a></li>
                    <li><a href="#">Instagram</a></li>
                </ul>
            </div>
            <div class="farea">
                <h3>其他資訊</h3>
                <p>使用工具</p>
                <ul>
                    <li><a href="https://code.visualstudio.com/">VSCode</a></li>
                    <li><a href="https://github.com/features/copilot">GitHub Copilot</a></li>
                    <li><a href="https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer">Live Server</a></li>
                </ul>
                <p>參考網站</p>
                <ul>
                    <li><a href="https://navnav.co">All | NavNav+</a></li>
                    <li><a href="https://bootstrapmade.com">Bootstrap Templates</a></li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom">
            <p>© 2025 個人網頁. All rights reserved.</p>
            <p><span class="highlight">有新的想法會持續更新</span></p>
        </div>`;
}
//  如果不在最頂就顯示"往上的標誌" 如果被按下就滑動到最頂
function initializeBackToTopButton() {
    const backToTopButton = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            backToTopButton.classList.add('show');
            backToTopButton.classList.remove('hide');
        } else {
            backToTopButton.classList.add('hide');
            backToTopButton.classList.remove('show');
        }
    });
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
// 開啟與關閉的導航欄動畫
function toggleMenu() {
    const Navs = document.querySelectorAll('.navigation');
    const blogTitle = document.querySelector('.blogTitle');
    const h1 = document.querySelector('.blogTitle h1');
    const menuIcon = document.querySelector('.menu span.material-symbols-sharp');
    if (window.getComputedStyle(h1).display === 'none'){
        h1.style.display = 'block';
    }
    else{
        h1.style.display = 'none';
    }
    Navs.forEach((Nav)=>{
        if (window.getComputedStyle(Nav).display !== 'none') {
            Nav.style.display = 'none';
        } else {
            Nav.style.display = 'flex';
        }
    });
    if (menuIcon.textContent === 'menu') {
        blogTitle.classList.add('show');
        menuIcon.textContent = 'close';
    } else {
        blogTitle.classList.remove('show');
        menuIcon.textContent = 'menu';
    }
}
// 點擊後跳轉頁面
function redirectToPage(url) {
    window.location.href = url;
}
// 點擊後交換主題
function toggleTheme(){
    document.body.classList.toggle('dark-theme');
    document.body.classList.toggle('light-theme');
    if (document.body.classList.contains('dark-theme')) {
        setTheme('dark-theme');
    } else {
        setTheme('light-theme');
    }
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        applyTheme(savedTheme);
    }
}
// 紀錄使用者選擇的主題
function setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    applyTheme(themeName);
}
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        applyTheme(savedTheme);
    }
});
// 切換主題
function applyTheme(themeName) {
    document.body.className = themeName;
    const themeIcons = document.querySelectorAll('#theme-icon');
    const themePs = document.querySelectorAll('#theme-p');    
    if (document.body.classList.contains('dark-theme')) {
        themePs.forEach(themeP => {
            themeIcons.forEach(themeIcon => themeIcon.textContent = 'light_mode');
            themeP.textContent = '亮色';
        });
    } else {
        themeIcons.forEach(themeIcon => themeIcon.textContent = 'dark_mode');
        themePs.forEach(themeP => {
            themeP.textContent = '暗色';
        });
    }
}
// 圖片點擊後顯示它的大圖
function openModal(imgSrc,imgName) {
    var modal = document.getElementById("myModal");
    var modalImg = document.getElementById("img01");
    var captionText = document.getElementById("caption");
    modal.style.display = "block";
    modalImg.src = imgSrc;
    captionText.textContent = imgName;
    document.body.classList.add("no-hover-effect");
}
// 大圖中用來關閉的按鍵
var span = document.getElementsByClassName("close")[0];
if(span){
    span.onclick = function() {
        var modal = document.getElementById("myModal");
        modal.style.display = "none";
        document.body.classList.remove("no-hover-effect");
    }
}
