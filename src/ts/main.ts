import { originalQuestsData } from "./shared/data.ts";
import { handleMenu } from "./UI/menu.ts";
import { renderQuestTable } from "./UI/shared/renderTable.ts";
import { handleThemes } from "./UI/themes.ts";
import { handleToggleQuestCompletion } from "./logic/complete.ts";
import { handleHideCompleted } from "./logic/hideCompleted.ts";
import { handleSearch } from "./logic/search.ts";
import { handleFiltering } from "./logic/filter.ts";

(function main() {
    handleMenu();
    renderQuestTable(originalQuestsData);
    handleThemes();
    handleToggleQuestCompletion();
    handleHideCompleted();
    handleSearch();
    handleFiltering();
})();
