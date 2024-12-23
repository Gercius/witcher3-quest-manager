export function handleThemes() {
    const main = document.querySelector<HTMLElement>("main");
    const body = document.querySelector<HTMLElement>("body");
    const toggleThemeButton = document.querySelector<HTMLInputElement>(".theme-switch .switch-btn input");
    const themeStorageKey = "preferred-theme";

    if (!main || !toggleThemeButton || !body) {
        console.error("Main or toggleThemeButton or body not found!");
        return;
    }

    // Set OS prefered theme on load
    const storedTheme = localStorage.getItem(themeStorageKey);
    const preferDarkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (storedTheme) {
        if (storedTheme === "dark") {
            main.classList.add("dark-theme");
            body.classList.add("dark-theme");
        } else {
            main.classList.remove("dark-theme");
            body.classList.remove("dark-theme");
        }
        toggleThemeButton.checked = storedTheme === "dark";
    } else {
        main.classList.add("dark-theme");
        body.classList.add("dark-theme");
        toggleThemeButton.checked = preferDarkTheme;
    }

    toggleThemeButton.addEventListener("click", toggleTheme);

    function toggleTheme() {
        if (!main || !toggleThemeButton || !body) {
            console.error("Main or toggleThemeButton or body not found!");
            return;
        }

        if (toggleThemeButton.checked) {
            main.classList.add("dark-theme");
            body.classList.add("dark-theme");
            localStorage.setItem(themeStorageKey, "dark");
        } else {
            main.classList.remove("dark-theme");
            body.classList.remove("dark-theme");
            localStorage.setItem(themeStorageKey, "light");
        }
    }
}
