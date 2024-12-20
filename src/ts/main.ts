import { storage } from "./shared/localStorage.ts";
import { handleMenu } from "./UI/menu.ts";
import { initialTableRender } from "./UI/shared/renderTable.ts";
import { handleThemes } from "./UI/themes.ts";
import { handleToggleQuestCompletion } from "./logic/complete.ts";
import { handleHideCompleted } from "./logic/hideCompleted.ts";
import { handleSearch } from "./logic/search.ts";
import { handleFiltering } from "./logic/filter.ts";

(function main() {
    storage.init();
    handleMenu();
    initialTableRender();
    handleThemes();
    handleToggleQuestCompletion();
    handleHideCompleted();
    handleSearch();
    handleFiltering();
})();
