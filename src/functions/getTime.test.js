import getTime from "./getTime";

test("returns 2431 days between 04/01/2016 and 31/08/2022", () => {
  expect(getTime(1451907936 * 1000)).toBe("347 weeks");
});
test("returns 1 week", () => {
  expect(getTime(1661258701 * 1000)).toBe("1 week");
});
test("returns hours", () => {
  expect(getTime(1661979572 * 1000)).toBe("2 hours");
});
test("returns hour", () => {
  expect(getTime(1661979972 * 1000)).toBe("1 hour");
});
test("returns day", () => {
  expect(getTime(1661897172 * 1000)).toBe("1 day");
});
