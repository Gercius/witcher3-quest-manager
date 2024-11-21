import { handleMenu } from "./menu.ts";
import { populateQuestTable } from "./populateDOM.ts";
import { handleToggleQuestCompletion } from "./quest-handling/complete.ts";
import { handleThemes } from "./themes.ts";

(async function main() {
    handleMenu();
    await populateQuestTable();
    handleThemes();
    handleToggleQuestCompletion();
})();
