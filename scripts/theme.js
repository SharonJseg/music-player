const toggleButton = document.querySelector('.toggle__input');
const toggleIcon = document.querySelector('.fa-sun');
const toggleText = document.querySelector('.toggle__text');
const currentTheme = localStorage.getItem('theme');
const LIGHT_THEME = 'light';
const DARK_THEME = 'dark';

export const toggleDarkLightMode = (isThemeDark) => {
    if (isThemeDark == DARK_THEME) {
        toggleText.textContent = 'Dark Mode';
        toggleIcon.classList.replace('fa-sun', 'fa-moon');
    } else {
        toggleText.textContent = 'Light Mode';
        toggleIcon.classList.replace('fa-moon', 'fa-sun');
    }
}

export const switchTheme = evt => {
    if (evt.target.checked) {
        document.documentElement.setAttribute('data-theme', DARK_THEME);
        localStorage.setItem('theme', DARK_THEME);
        toggleDarkLightMode(DARK_THEME);
    } else {
        document.documentElement.setAttribute('data-theme', LIGHT_THEME);
        localStorage.setItem('theme', LIGHT_THEME);
        toggleDarkLightMode(LIGHT_THEME)
    }
}

toggleButton.addEventListener('change', switchTheme);

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === DARK_THEME) {
        toggleButton.checked = true;
        toggleDarkLightMode(true);
    }
}