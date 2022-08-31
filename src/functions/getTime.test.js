import getTime from "./getTime";

test("returns 2431 days between 04/01/2016 and 31/08/2022", () => {
  expect(getTime(1451907936 * 1000)).toBe(2431);
});
test("returns days between 23/08 and 31/08/2022", () => {
  expect(getTime(1661258701 * 1000)).toBe(8);
});
