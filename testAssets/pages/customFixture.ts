import { test as base, Page, expect as baseExpect } from "@playwright/test";
import fs from "fs";
import path from "path";

// QA Playground pages
import HomePage from "./qaPlayGround/homePage";
import MiniWebApps from "./qaPlayGround/miniWebAppsPage";
import VerifyAccountPage from "./qaPlayGround/verifyAccountPage";
import TagsInputBoxPage from "./demoAutomationTesting/tagsInputBoxPage";
import MultiLevelDropdownPage from "./qaPlayGround/multiLevelDropdownPage";
import NewTabPage from "./qaPlayGround/newTabPage";
import PopUpWindowPage from "./qaPlayGround/popUpWindowPage";
import NestedIframePage from "./qaPlayGround/nestedIframePage";
import StarsRatingPage from "./qaPlayGround/starsRatingWidgetPage";
import CoveredElementsPage from "./qaPlayGround/coveredElementsPage";
import QaUploadFilePage from "./qaPlayGround/qaUploadFilePage";
import QaDownloadFilePage from "./qaPlayGround/qaDownloadFilePage";
import ModalPopUpPage from "./qaPlayGround/modalPopUpPage";
import BudgetTrackerPage from "./qaPlayGround/budgetTrackerPage";
import MouseHoverPage from "./qaPlayGround/mouseHoverPage";
import NavigationMenuPage from "./qaPlayGround/navigationMenuPage";
import ContextMenuPage from "./qaPlayGround/contextMenuPage";
import ShadowDomPage from "./qaPlayGround/shadowDomPage";
import RatingRangeSliderPage from "./qaPlayGround/ratingRangeSliderPage";
import { SortableListPage } from "./qaPlayGround/sotableListPage";
import RedirectChainPage from "./qaPlayGround/redirectChainPage";
import RightClickMenuPage from "./qaPlayGround/rightClickMenuPage";
import FetchingDataPage from "./qaPlayGround/fetchingDataPage";
import ChangeableIframePage from "./qaPlayGround/changeableIframePage";

// Demo pages
import BasePage from "./demoAutomationTesting/basePage";
import DemoAlertPage from "./demoAutomationTesting/demoAlertPage"
import DragDropPage from "./demoAutomationTesting/dragDropPage"
import FileUploadPage from "./demoAutomationTesting/fileUploadPage"
import { FileDownloadPage } from "./demoAutomationTesting/fileDownloadPage";

type MyFixtures = {
  // QA Playground
  homePage: HomePage;
  miniWebApps: MiniWebApps;
  verifyAccountPage: VerifyAccountPage;
  tagsInputBoxPage: TagsInputBoxPage;
  dropdownPage: MultiLevelDropdownPage;
  newTabPage: NewTabPage;
  popUpWindowPage: PopUpWindowPage;
  nestedIframePage: NestedIframePage;
  starsRatingPage: StarsRatingPage;
  coveredElementsPage: CoveredElementsPage;
  qaUploadFilePage: QaUploadFilePage;
  downloadPage: QaDownloadFilePage;
  modalPopUpPage: ModalPopUpPage;
  budgetTrackerPage: BudgetTrackerPage;
  mouseHoverPage: MouseHoverPage;
  navigationMenuPage: NavigationMenuPage;
  contextMenuPage: ContextMenuPage;
  shadowDomPage: ShadowDomPage;
  ratingSliderPage: RatingRangeSliderPage;
  sortableListPage: SortableListPage;
  redirectPage: RedirectChainPage;
  rightClickPage: RightClickMenuPage;
  fetchingDataPage: FetchingDataPage;
  changeableIframePage: ChangeableIframePage;

  // Demo / generic
  basePage: BasePage;
  demoAlertPage: DemoAlertPage;
  dragDropPage: DragDropPage;
  fileUploadPage: FileUploadPage;
  fileDownloadPage: FileDownloadPage;

  // Node.js utilities
  fs: typeof fs;
  path: typeof path;
};

// Extend Playwright test with all page objects + fs & path
export const test = base.extend<MyFixtures>({
  // QA Playground pages
  homePage: async ({ page }, use) => use(new HomePage(page)),
  miniWebApps: async ({ page }, use) => use(new MiniWebApps(page)),
  verifyAccountPage: async ({ page }, use) => use(new VerifyAccountPage(page)),
  tagsInputBoxPage: async ({ page }, use) => use(new TagsInputBoxPage(page)),
  dropdownPage: async ({ page }, use) => use(new MultiLevelDropdownPage(page)),
  newTabPage: async ({ page }, use) => use(new NewTabPage(page)),
  popUpWindowPage: async ({ page }, use) => use(new PopUpWindowPage(page)),
  nestedIframePage: async ({ page }, use) => use(new NestedIframePage(page)),
  starsRatingPage: async ({ page }, use) => use(new StarsRatingPage(page)),
  coveredElementsPage: async ({ page }, use) => use(new CoveredElementsPage(page)),
  qaUploadFilePage: async ({ page }, use) => use(new QaUploadFilePage(page)),
  downloadPage: async ({ page }, use) => use(new QaDownloadFilePage(page)),
  modalPopUpPage: async ({ page }, use) => use(new ModalPopUpPage(page)),
  budgetTrackerPage: async ({ page }, use) => use(new BudgetTrackerPage(page)),
  mouseHoverPage: async ({ page }, use) => use(new MouseHoverPage(page)),
  navigationMenuPage: async ({ page }, use) => use(new NavigationMenuPage(page)),
  contextMenuPage: async ({ page }, use) => use(new ContextMenuPage(page)),
  shadowDomPage: async ({ page }, use) => use(new ShadowDomPage(page)),
  ratingSliderPage: async ({ page }, use) => use(new RatingRangeSliderPage(page)),
  sortableListPage: async ({ page }, use) => use(new SortableListPage(page)),
  redirectPage: async ({ page }, use) => use(new RedirectChainPage(page)),
  rightClickPage: async ({ page }, use) => use(new RightClickMenuPage(page)),
  fetchingDataPage: async ({ page }, use) => use(new FetchingDataPage(page)),
  changeableIframePage: async ({ page }, use) => use(new ChangeableIframePage(page)),

  // Demo / generic pages
  basePage: async ({ page }, use) => use(new BasePage(page)),
  demoAlertPage: async ({ page }, use) => use(new DemoAlertPage(page)),
  dragDropPage: async ({ page }, use) => use(new DragDropPage(page)),
  fileUploadPage: async ({ page }, use) => use(new FileUploadPage(page)),
  fileDownloadPage: async ({ page }, use) => use(new FileDownloadPage(page)),

  // Node.js utilities
  fs: async ({}, use) => use(fs),
  path: async ({}, use) => use(path),
});

// Export expect
export const expect = baseExpect;
