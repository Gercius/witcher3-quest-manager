export function handleThemes() {
    const main = document.querySelector<HTMLElement>("main");
    const toggleThemeButton = document.querySelector<HTMLInputElement>(".theme-switch input");
    const themeStorageKey = "preferred-theme";

    if (!main || !toggleThemeButton) {
        console.error("Main or toggleThemeButton not found!");
        return;
    }

    // Set OS prefered theme on load
    const storedTheme = localStorage.getItem(themeStorageKey);
    const preferDarkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (storedTheme) {
        storedTheme === "dark" ? main.classList.add("dark-theme") : main.classList.remove("dark-theme");
        toggleThemeButton.checked = storedTheme === "dark";
    } else {
        preferDarkTheme ? main.classList.add("dark-theme") : "";
        toggleThemeButton.checked = preferDarkTheme;
    }

    toggleThemeButton.addEventListener("click", toggleTheme);

    function toggleTheme() {
        if (!main || !toggleThemeButton) {
            console.error("Body or toggleThemeButton not found!");
            return;
        }

        if (toggleThemeButton.checked) {
            main.classList.add("dark-theme");
            localStorage.setItem(themeStorageKey, "dark");
        } else {
            main.classList.remove("dark-theme");
            localStorage.setItem(themeStorageKey, "light");
        }
    }
}
