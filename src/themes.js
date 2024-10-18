(function handleThemes() {
    const body = document.querySelector("body");
    const toggleThemeButton = document.querySelector(".theme-switch input");
    const themeStorageKey = "preferred-theme";

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
        if (toggleThemeButton.checked) {
            body.classList.add("dark-theme");
            localStorage.setItem(themeStorageKey, "dark");
        } else {
            body.classList.remove("dark-theme");
            localStorage.setItem(themeStorageKey, "light");
        }
    }
})();
