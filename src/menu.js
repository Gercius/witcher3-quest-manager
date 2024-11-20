export function handleMenu() {
    const menuButton = document.querySelector(".menu-button");
    const menuButtonImages = document.querySelectorAll(".menu-button img");
    const menu = document.querySelector(".menu");

    menuButton.addEventListener("click", () => {
        menuButtonImages.forEach((img) => {
            img.classList.contains("hidden") ? img.classList.remove("hidden") : img.classList.add("hidden");
        });

        const width = menu.style.width;

        width === "0px" || !width ? (menu.style.width = "250px") : (menu.style.width = "0px");
    });
}
