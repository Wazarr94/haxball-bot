var room = HBInit({
    roomName: "My room",
    maxPlayers: 16,
    noPlayer: true,
    token: "" // Insert token here
});
room.setDefaultStadium("Big");
room.setScoreLimit(5);
room.setTimeLimit(0);

function updateAdmins() {
    var players = room.getPlayerList();
    if (players.length == 0) return;
    if (players.find((player) => player.admin) != null) return;
    room.setPlayerAdmin(players[0].id, true);
}

room.onPlayerJoin = function (player) {
    updateAdmins();
}

room.onPlayerLeave = function (player) {
    updateAdmins();
}