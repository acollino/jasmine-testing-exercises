describe("Servers test (with setup and tear-down)", function() {
  beforeEach(function () {
    // initialization logic
    serverNameInput.value = "Alice";
  });

  it("should add a new server to allServers on submitServerInfo()", function () {
    submitServerInfo();

    expect(Object.keys(allServers).length).toEqual(1);
    expect(allServers["server" + serverId].serverName).toEqual("Alice");
  });

  it("should add each server in allServers to updateServerTable()", function () {
    allServers = {
      server1: "Alice",
      server2: "Mark",
      server3: "George",
      server4: "Lisa",
    };
    updateServerTable();
    expect(serverTbody.children.length).toEqual(4);
  });

  afterEach(function() {
    serverTbody.innerHTML = "";
    serverNameInput.value = "";
    allServers = {};
    serverId = 0;
  });
});
