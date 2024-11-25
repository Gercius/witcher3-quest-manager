export function handleMenu() {
    const menuButton = document.querySelector<HTMLButtonElement>(".menu-button");
    const menuButtonImages = document.querySelectorAll<HTMLImageElement>(".menu-button img");
    const menu = document.querySelector<HTMLElement>(".menu");

    if (!menuButton || !menu) {
        console.error("Menu button or menu not found!");
        return;
    }

    menuButton.addEventListener("click", () => {
        menuButtonImages.forEach((img) => {
            img.classList.toggle("hidden");
        });

        const right = menu.style.right;
        right === "-250px" || !right ? (menu.style.right = "0px") : (menu.style.right = "-250px");
    });
}
