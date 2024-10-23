const menuButton = document.querySelector(".menu-button");
const menuButtonImages = document.querySelectorAll(".menu-button img");
const menu = document.querySelector(".menu");

menuButton.addEventListener("click", handleMenu);

function handleMenu() {
    const isMenuClosed = menu.classList.contains("hidden");

    if (isMenuClosed) {
        menu.classList.remove("hidden");
        menu.classList.add("menu-open");
    } else {
        menu.classList.add("hidden");
        menu.classList.remove("menu-open");
    }

    menuButtonImages.forEach((img) => {
        img.classList.contains("hidden") ? img.classList.remove("hidden") : img.classList.add("hidden");
    });

    // console.log(isMenuClosed);

    // menu.classList.remove("hidden");
}
