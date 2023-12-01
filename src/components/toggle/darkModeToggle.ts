function setDarkModeTheme() {
    document.documentElement.classList.toggle("dark", true);
}

function setLightMode() {
    document.documentElement.classList.toggle("dark", false);
}

function setDarkMode() {
    setCheckBoxToDarkMode();
    setDarkModeTheme();
}

function setCheckBoxToDarkMode() {
    document
        .getElementById("dark-mode-toggle")
        ?.setAttribute("checked", "true");
}

function handleDarkModeToggle(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const isChecked = checkbox.checked;
    if (isChecked) {
        setDarkModeTheme();
        localStorage.setItem("theme", "dark");
    } else {
        setLightMode();
        localStorage.setItem("theme", "light");
    }
}

function checkDarkMode() {
    const theme = localStorage.getItem("theme");
    if (theme != null) {
        if (theme == "dark") {
            setDarkMode();
        } else {
            setLightMode();
        }
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setDarkMode();
    } else {
        setLightMode();
    }
}

function initToggles() {
    document
        .getElementById("dark-mode-toggle")
        ?.addEventListener("change", handleDarkModeToggle);
    checkDarkMode();
}

function init() {
    initToggles();
    document.addEventListener("astro:after-swap", function () {
        if (localStorage.getItem("theme") === "dark") {
            document.documentElement.classList.toggle("dark", true);
        } else {
            document.documentElement.classList.toggle("dark", false);
        }
        initToggles();
    });
}

init();
