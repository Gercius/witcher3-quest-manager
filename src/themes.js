(function handleThemes() {
    const body = document.querySelector("body");
    const toggleThemeButton = document.querySelector(".theme-switch input");

    // Set OS prefered theme on load
    const preferDarkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
    preferDarkTheme ? body.classList.add("dark-theme") : "";
    preferDarkTheme ? (toggleThemeButton.checked = true) : (toggleThemeButton.checked = false);

    toggleThemeButton.addEventListener("click", toggleTheme);

    function toggleTheme() {
        toggleThemeButton.checked ? body.classList.add("dark-theme") : body.classList.remove("dark-theme");
    }
})();
