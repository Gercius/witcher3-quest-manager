export function handleThemes() {
    const body = document.querySelector<HTMLBodyElement>("body");
    const toggleThemeButton = document.querySelector<HTMLInputElement>(".theme-switch input");
    const themeStorageKey = "preferred-theme";

    if (!body || !toggleThemeButton) {
        console.error("Body or toggleThemeButton not found!");
        return;
    }

    // Set OS prefered theme on load
    const storedTheme = localStorage.getItem(themeStorageKey);
    const preferDarkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (storedTheme) {
        storedTheme === "dark" ? body.classList.add("dark-theme") : body.classList.remove("dark-theme");
        toggleThemeButton.checked = storedTheme === "dark";
    } else {
        preferDarkTheme ? body.classList.add("dark-theme") : "";
        toggleThemeButton.checked = preferDarkTheme;
    }

    toggleThemeButton.addEventListener("click", toggleTheme);

    function toggleTheme() {
        if (!body || !toggleThemeButton) {
            console.error("Body or toggleThemeButton not found!");
            return;
        }

        if (toggleThemeButton.checked) {
            body.classList.add("dark-theme");
            localStorage.setItem(themeStorageKey, "dark");
        } else {
            body.classList.remove("dark-theme");
            localStorage.setItem(themeStorageKey, "light");
        }
    }
}
