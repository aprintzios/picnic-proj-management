/*-- constants --*/

/*-- app's state vars --*/

/*-- cached elements --*/
let taskCells = document.getElementsByClassName('dasboardTaskCell');

console.log("task cell", taskCells);
/*-- event listeners --*/
for (let i=0; i<taskCells.length; i++){
    taskCells[i].addEventListener('click', taskClick);
}
/*-- functions --*/


init();

async function init() {
    let testData = await fetch('/testAPI').then(res => res.json());
    console.log(testData);
}

function taskClick(e){
    console.log(e.target);
}