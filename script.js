// Loading 加載照片的動畫
document.addEventListener('DOMContentLoaded', () => {
    const loadingScreens = document.querySelectorAll('.loadingScreen');
    const images = document.querySelectorAll('.img-photo');
    images.forEach((image,index)=>{
        const loadingScreen=loadingScreens[index];
        image.addEventListener('load',()=>{
            if(loadingScreen){
                loadingScreen.style.display='none';
            }
            image.style.display='block';
        })
        image.addEventListener('error',()=>{
            if(loadingScreen){
                loadingScreen.style.display='none';
            }
        })
        if(image.complete){
            image.dispatchEvent(new Event('load'));
        }
    });
});
// 載入預設主題
document.addEventListener('DOMContentLoaded', () => {
    //localStorage.removeItem('theme')//測試用:處於曾未使用時的狀態 預設主題黑色
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        // Apply default theme if no theme is saved
        const defaultTheme = 'dark-theme'; // or 'dark-theme'
        applyTheme(defaultTheme);
    }
});
// 載入時加導覽欄和頁尾的資訊
document.addEventListener('DOMContentLoaded',()=>{
    function getPageName() {
        const path = window.location.pathname;
        const page = path.split("/").pop();
        const pageName = page.split(".")[0];
        return pageName;
    }
    const names=['index','project','about'];
    const navnames=['主要頁面','作品展示','關於我'];
    const icons=['home','description','group']
    let index=names.indexOf(getPageName());
    if(index===-1)index=0;
    const left=index-1<0?2:index-1;
    const right=index+1>2?0:index+1;
    const foot = document.querySelector('footer');
    const blogTitle = document.querySelector('.blogTitle');
    blogTitle.innerHTML=`
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
            <span class="material-symbols-sharp" style="color:var(--img-color-light)">menu</span>
        </div>`;
    foot.innerHTML =`<hr>
        <div class="footer-content">
            <div class="farea farea-top">
                <h2><img src="Screenshots/me.png" class="footer-img">個人網頁</h2>
                <p><span class="material-symbols-sharp" id="mail">mail</span>s1411232069@ad1.nutc.edu.tw</p>
                <p><span class="material-symbols-sharp" id="mail">home</span>Taiwan,Taichung</p>
            </div>
            <div class="farea">
                <h3>導航</h3>
                <ul>
                    <li><a href="index.html"><span class="material-symbols-sharp" id="arrow">arrow_forward_ios</span>主要頁面</a></li>
                    <li><a href="project.html"><span class="material-symbols-sharp" id="arrow">arrow_forward_ios</span>作品展示</a></li>
                    <li><a href="about.html"><span class="material-symbols-sharp" id="arrow">arrow_forward_ios</span>關於我</a></li>
                    <li><a href="https://github.com/ChenGuoXiang940"><span class="material-symbols-sharp" id="arrow">arrow_forward_ios</span>Github</a></li>
                </ul>
            </div>
            <div class="farea">
                <h3>社交媒體</h3>
                <ul>
                    <li><a href="#"><span class="material-symbols-sharp" id="arrow">arrow_forward_ios</span>Facebook</a></li>
                    <li><a href="#"><span class="material-symbols-sharp" id="arrow">arrow_forward_ios</span>Twitter</a></li>
                    <li><a href="#"><span class="material-symbols-sharp" id="arrow">arrow_forward_ios</span>LinkedIn</a></li>
                    <li><a href="#"><span class="material-symbols-sharp" id="arrow">arrow_forward_ios</span>Instagram</a></li>
                </ul>
            </div>
            <div class="farea">
                <h3>其他資訊</h3>
                <p>使用工具</p>
                <ul>
                    <li><a href="https://code.visualstudio.com/"><span class="material-symbols-sharp" id="arrow">arrow_forward_ios</span>VSCode</a></li>
                    <li><a href="https://github.com/features/copilot"><span class="material-symbols-sharp" id="arrow">arrow_forward_ios</span>GitHub Copilot</a></li>
                    <li><a href="https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer"><span class="material-symbols-sharp" id="arrow">arrow_forward_ios</span>Live Server</a></li>
                </ul>
                <p>參考網站</p>
                <ul>
                    <li><a href="https://navnav.co"><span class="material-symbols-sharp" id="arrow">arrow_forward_ios</span>All | NavNav+</a></li>
                    <li><a href="https://bootstrapmade.com"><span class="material-symbols-sharp" id="arrow">arrow_forward_ios</span>Bootstrap Templates</a></li>
                </ul>
            </div>
        </div>
        <hr>
        <p class="about">有新的想法會持續更新</p>
        <p class="about">© 2025 陳國翔. All rights reserved.</p>`;
});
// 開啟與關閉的導航欄動畫
function toggleMenu() {
    const Navs = document.querySelectorAll('.navigation');
    const h1 = document.querySelector('.blogTitle h1');
    const menuIcon = document.querySelector('.menu span.material-symbols-sharp');
    if (window.getComputedStyle(h1).display === 'none'){
        h1.style.display = 'block';
        menuIcon.style.color = 'var(--blog-span-color)';
    }
    else{
        h1.style.display = 'none';
        menuIcon.style.color = 'var(--img-color-light)';
    }
    Navs.forEach((Nav)=>{
        if (window.getComputedStyle(Nav).display !== 'none') {
            Nav.style.display = 'none';
        } else {
            Nav.style.display = 'flex';
        }
    });
}
// 點擊後跳轉頁面
function redirectToPage(url) {
    window.location.href = url;
}
//  如果不在最頂就顯示"往上的標誌" 如果被按下就滑動到最頂
document.addEventListener('DOMContentLoaded', () => {
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
});
// 點擊後交換主題
function toggleTheme(){
    document.body.classList.toggle('dark-theme');
    document.body.classList.toggle('light-theme');
    if (document.body.classList.contains('dark-theme')) {
        setTheme('dark-theme');
        document.getElementById('prismTheme').setAttribute('href', 'prism_dark.css');
    } else {
        setTheme('light-theme');
        document.getElementById('prismTheme').setAttribute('href', 'prism_light.css');
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
// 切換 github-readme-stats 主題
function setStats(action) {
    document.querySelectorAll('.stats').forEach(item => {
        let src = item.getAttribute('src');
        if (action==="add"&&!src.includes('tokyonight')) {
            src = `${src}&theme=tokyonight`;
        }
        else if(action==="remove"&&src.includes('tokyonight')){
            src = src.replace('&theme=tokyonight', '');
        }
        item.setAttribute('src', src);
    });
}
// 切換主題
function applyTheme(themeName) {
    document.body.className = themeName;
    const themeIcons = document.querySelectorAll('#theme-icon');
    const themePs = document.querySelectorAll('#theme-p');
    if(document.body.classList.contains('dark-theme')){
        setStats("add");
        themePs.forEach(themeP=>{
            themeIcons.forEach(themeIcon=>themeIcon.textContent='light_mode');
            themeP.textContent='亮色';
        });
        document.getElementById('prismTheme').setAttribute('href', 'prism_dark.css');
    }
    else{
        setStats("remove");
        themeIcons.forEach(themeIcon=>themeIcon.textContent='dark_mode');
        themePs.forEach(themeP=>{
            themeP.textContent='暗色';
        });
        document.getElementById('prismTheme').setAttribute('href', 'prism_light.css');
    }
}
// 點擊後跳到指定的段落
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('#catalog nav');
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            document.querySelector(`#catalog nav[onclick="toArticle('#${id}')"]`).classList.add('active');
        } else {
            const id = entry.target.getAttribute('id');
            document.querySelector(`#catalog nav[onclick="toArticle('#${id}')"]`).classList.remove('active');
        }
    });
});
sections.forEach((section) => {
    observer.observe(section);
});
function toArticle(selector) {                
    const element = document.querySelector(selector);
    if (element) {
        const top = element.getBoundingClientRect().top + window.scrollY -70;
        if(top<0)top=0;
        window.scrollTo({
            top: top,
            behavior: "smooth"
        });
    }
}
// 顯示和隱藏目錄
document.addEventListener('DOMContentLoaded', () => {
    const h2 = document.querySelector('#catalog h2');
    const showNavsButton = document.getElementById('showNavs');
    const navs = document.querySelectorAll('#catalog nav');
    h2.addEventListener('click', () => {
        navs.forEach(nav => {
            nav.classList.add('hidden');
            nav.classList.remove('visible');
        });
        showNavsButton.style.display = 'block';
        h2.style.display='none';
    });

    showNavsButton.addEventListener('click', () => {
        navs.forEach(nav => {
            nav.classList.add('visible');
            nav.classList.remove('hidden');
        });
        showNavsButton.style.display = 'none';
        h2.style.display='block';
    });
});
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
var span = document.getElementsByClassName("close")[0];
span.onclick = function() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
    document.body.classList.remove("no-hover-effect");
}
