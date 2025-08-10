const EventEmitter = require('events');
 
const emitter = new EventEmitter();

// 1.

// emitter.on("greet", () => {
//     console.log("Hello Krishna Garg")
// });
// emitter.emit("greet");

//2. you can also pass arguments while emitting 

// emitter.on("greet", (username,prof) => {
//     console.log(`Hello ${username} and you are a ${prof}`)
// });

// emitter.emit("greet" , "Krishna sir" ,"Full Stack Developer");

//3. you can pass single argument 

emitter.on("greet", (args) => {
    console.log(`Hello ${args.name} and you are a ${args.prof}`)
});

emitter.emit("greet" , {name:"Krishna Garg" , prof:"Full Stack Dev"} );

