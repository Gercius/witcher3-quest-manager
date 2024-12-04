export function handleMenu() {
    const menuWrapper = document.querySelector<HTMLElement>(".menu-wrapper");
    const menuButton = document.querySelector<HTMLButtonElement>(".menu-button");
    const menuButtonImages = document.querySelectorAll<HTMLImageElement>(".menu-button img");

    if (!menuButton || !menuWrapper) {
        console.error("menuButton or menuWrapper found!");
        return;
    }

    menuButton.addEventListener("click", toggleMenu);

    function toggleMenu() {
        menuButtonImages.forEach((img) => {
            img.classList.toggle("hidden");
        });
        menuWrapper!.classList.toggle("menu-show");
    }
}
