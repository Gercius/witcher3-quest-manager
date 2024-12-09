import { handleMenu } from "./menu.ts";
import { populateQuestTable } from "./populateDOM.ts";
import { handleThemes } from "./themes.ts";
import { handleToggleQuestCompletion } from "./quest-handling/complete.ts";
import { handleHideCompleted } from "./quest-handling/hideCompleted.ts";
import { handleSearch } from "./quest-handling/search.ts";
import { handleFiltering } from "./quest-handling/filter.ts";

(async function main() {
    handleMenu();
    await populateQuestTable();
    handleThemes();
    handleToggleQuestCompletion();
    handleHideCompleted();
    handleSearch();
    handleFiltering();
})();
