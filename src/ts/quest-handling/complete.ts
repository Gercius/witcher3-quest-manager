import { manageState } from "./manageState";
import { renderCompletedPercentage } from "./render";

export function handleToggleQuestCompletion() {
    const table = document.querySelector("table");
    if (!table) {
        console.error("Table element not found!");
        return;
    }

    renderCompletedPercentage();

    table.addEventListener("click", (e) => {
        let clickedEl;
        if (e.target) {
            clickedEl = e.target as HTMLElement;
        }

        if (!clickedEl) {
            console.error("Click event not working properly");
            return;
        }

        if (clickedEl.matches(".quest-completed input")) {
            manageState.save();
            renderCompletedPercentage();
        }
    });
}
