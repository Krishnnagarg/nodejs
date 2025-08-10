const EventEmitter = require("events");
const emitter = new EventEmitter();

emitter.on("user-login", (username) => {
  console.log(`${username} logged in!`);
});

emitter.on("user-purchase", (username, purchase) => {
  console.log(`${username} purchase ${purchase}`);
});

emitter.on("profile-updated", (username, updated) => {
  console.log(`${username} updated their ${updated}`);
});

emitter.on("user-logout", (username) => { // In Terminal run With ==> node .\task.js
  console.log(`${username} logout !`);
});

emitter.emit("user-login", "Krishna");
emitter.emit("user-purchase", "Krishna", "Laptop");
emitter.emit("profile-updated", "Krishna", "email");
emitter.emit("user-logout", "Krishna");
