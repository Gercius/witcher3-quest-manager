import { handleMenu } from "./menu.js";
import { populateQuestTable } from "./populateDOM.js";
import { handleToggleQuestCompletion } from "./quest-handling/complete.js";
import { handleThemes } from "./themes.js";

(async function main() {
    handleMenu();
    await populateQuestTable();
    handleThemes();
    handleToggleQuestCompletion();
})();
