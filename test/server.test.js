const server = require("../server");

let request, response;
test("blabla", () => {
  expect(server.getProjectData(request, response)).toBe(!null);
});
