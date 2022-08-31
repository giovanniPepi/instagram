import getTime from "./getTime";

test("returns 11 hours", () => {
  expect(getTime(1661958)).toBe("11 hours");
});

test("returns days", () => {
  expect(getTime(1660135)).toBe("30 days");
});
