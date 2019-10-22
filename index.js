const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}


start();
let room1 = {
  name: "182 Main St",
  inventory: ['Sign'],
  message: "Your are at 182 Main St"

}
let room2 = {
  name: "Foyer",
  inventory: ['News Paper'],
  message: "You have entered the Foyer"
}
let room3 = {
  name: "Classroom",
  inventory: ['Pencil'],
  message: "You have entered the Classroom, are you ready for the lesson?"
}
let room4 = {
  name: "Muddy Waters",
  inventory: ['Coffee'],
  message: "Welcome to Muddy Waters"

}
let room5 = {
  name: "Mr. Mikes",
  inventory: ['Pizza'],
  message: "Welcome to Mr. Mikes"
}
let states = {
  "182 Main St": { canChangeTo: ["Foyer", "Muddy Waters", "Mr. Mikes"] },
  "Foyer": { canChangeTo: ["Classroom", "182 Main St"] },
  "Classroom": { canChangeTo: ["Foyer"] },
  "Mudddy Waters": { canChangeTo: ["182 Main St"] },
  "Mr. Mikes": { canChangeTo: ["182 Main St"] }
}
let currentRoom = room1;
let userInventory = []
async function start() {
  const welcomeMessage = `182 Main St.
You are standing on Main Street between Church and South Winooski.
There is a door here. A keypad sits on the handle.\nOn the door is a hand written message.`

  let answer = await ask(welcomeMessage);
  while (answer !== 'exit') {
    answer = await ask('>_')
    if (answer === 'read message') {
      console.log("Welcome to Burlington Code Academy! Come up to the third floor. \nIf the door is locked, use the code 12345")

    } else {
      console.log('Sorry I dont understand ' + answer)
    }

    let userKeyPadInput = await ask("Now you know the code, enter it now!")
    while (userKeyPadInput !== '12345') {
      userKeyPadInput = await ask(">_")
      if (userKeyPadInput === '12345') {
        moveToRoom(room2)
        console.log(room2.message)
        console.log("There is a Newspaper in the corner")
      }
    }

    let userMove = await ask("The classroom is up stairs")
    while (userMove !== 'go to class') {
      userMove = await ask('>_')
      if (userMove === 'go to class') {
        moveToRoom(room3)
        console.log(room3.message)
        console.log("Your desk is in the back.\nIf you need a writing utencil there should be one at your desk!")
      }
      else if (userMove === "go to main") {
        moveToRoom(room1)
        console.log(room1.message)
      }
      else {
        console.log("I dont understand" + userMove)
      }
    }


    function moveToRoom(newRoom) {
      let validTransitions = states[currentRoom.name].canChangeTo
      if (validTransitions.includes(newRoom.name)) {
        currentRoom = newRoom;
      }
      else {
        console.log('You cant go there!')
      }

    }
  }
}