import { test as base, expect } from "@playwright/test";
import custom from "./Pages/demoAutomationTesting/CustomTasks";
import playg from "./Pages/qaPlayGround/Qaplaytasks";
import scre from "./Pages/screenerApp/screenerPage";
import Playgcolour from "./Pages/tmPlayGround/playGroundCol";
import DynamicTableExportPDFPage from "./Pages/tmPlayGround/DynamicTableExportPDFPage";
import StaticTablePDFPage from "./Pages/tmPlayGround/StaticTablePDFPage";
import StaticTablePage from "./Pages/tmPlayGround/staticPage";
import DynamicTableExportPage from "./Pages/tmPlayGround/dynamicPage";
import fs from "fs";
import path from "path";
import * as XLSX from "xlsx";

// import HomePage from "./qaPlayGround/homePage";
// import MiniWebApps from "./qaPlayGround/miniWebAppsPage";

type MyFixtures = {
  custom: custom;
  playg: playg;
  scre: scre;
  playgco:Playgcolour
  pdfPage:DynamicTableExportPDFPage
  pdfPageE:StaticTablePDFPage
  staticTablePage:StaticTablePage
  tablePage:DynamicTableExportPage
  // homePage: HomePage;
  // miniWebApps: MiniWebApps;
};

const test = base.extend<MyFixtures>({
  custom: async ({ page }, use) => {
    await use(new custom(page));
  },
  playg: async ({ page }, use) => {
    await use(new playg(page));
  },
  scre: async ({ page }, use) => {
    await use(new scre(page));
  },
  playgco:async({page},use)=>{
    await use(new Playgcolour(page))
  },
  pdfPage:async({page},use)=>
  {
    await use(new DynamicTableExportPDFPage(page))
  },
  pdfPageE:async({page},use)=>
  {
    await use(new StaticTablePDFPage(page))
  },
  staticTablePage:async({page},use)=>
  {
    await use(new StaticTablePage(page))
  },
  tablePage:async({page},use)=>
  {
    await use(new DynamicTableExportPage(page))
  },
  //  homePage: async ({ page }, use) => use(new HomePage(page)),
  //   miniWebApps: async ({ page }, use) => use(new MiniWebApps(page)),
});

export { test, expect,fs,path,XLSX};


