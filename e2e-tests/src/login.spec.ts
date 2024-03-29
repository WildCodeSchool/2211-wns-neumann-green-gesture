import { test, expect } from "@playwright/test";

import {
  clearDB,
  connect,
  createPartnerUser,
  disconnect,
  PARTNER_INFOS,
} from "./dbHelpers";

test.beforeAll(connect);
test.beforeEach(clearDB);
test.afterAll(disconnect);

test("can log in with correct credentials", async ({ page }) => {
  await page.goto("/");

  await createPartnerUser();

  await page.getByTestId("email").fill("");
  await page.getByTestId("email").type(PARTNER_INFOS.email);
  await page.getByTestId("password").fill("");
  await page.getByTestId("password").type(PARTNER_INFOS.password);
  await page.getByRole("button", { name: "Je me connecte" }).click();
});
