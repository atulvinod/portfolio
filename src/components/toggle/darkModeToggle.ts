function setDarkModeTheme() {
    document.documentElement.classList.toggle("dark", true);
}

function setLightModeTheme() {
    document.documentElement.classList.toggle("dark", false);
}

function setLightMode() {
    setCheckBoxesState(false);
    setLightModeTheme();
}

function setDarkMode() {
    setCheckBoxesState(true);
    setDarkModeTheme();
}

function setCheckBoxesState(state: boolean) {
    Array.from(document.getElementsByClassName("dm-toggle-checkbox")).forEach(
        (element) => {
            (element as HTMLInputElement).checked = state;
        }
    );
}

function handleDarkModeToggle(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const isChecked = checkbox.checked;
    if (isChecked) {
        setDarkMode();
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
    Array.from(document.getElementsByClassName("dm-toggle-checkbox")).forEach(
        (element) => {
            element.addEventListener("change", handleDarkModeToggle);
        }
    );

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
