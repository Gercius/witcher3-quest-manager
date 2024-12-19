import { manageState } from "./shared/manageState";
import { renderCompletedPercentage } from "../UI/shared/renderStats";
import { hideCompletedQuest } from "./hideCompleted";

export function handleToggleQuestCompletion() {
    const table = document.querySelector("table");
    if (!table) {
        console.error("Table element not found!");
        return;
    }

    renderCompletedPercentage();

    table.addEventListener("click", (e) => {
        const clickedEl = e.target as HTMLElement;
        if (!clickedEl) {
            console.error("Click event not working properly");
            return;
        }

        if (clickedEl.matches(".quest-completed input")) {
            manageState.save();
            renderCompletedPercentage();
            hideCompletedQuest(clickedEl);
        }
    });
}
