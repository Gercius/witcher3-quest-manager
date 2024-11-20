export function handleMenu() {
    const menuButton = document.querySelector(".menu-button");
    const menuButtonImages = document.querySelectorAll(".menu-button img");
    const menu = document.querySelector(".menu");

    menuButton.addEventListener("click", () => {
        menuButtonImages.forEach((img) => {
            img.classList.contains("hidden") ? img.classList.remove("hidden") : img.classList.add("hidden");
        });

        const right = menu.style.right;
        right === "-250px" || !right ? (menu.style.right = "0px") : (menu.style.right = "-250px");
    });
}
