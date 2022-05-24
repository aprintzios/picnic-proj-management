let groupOpen = false;
let taskOpen = true;
let taskSortUp = true;
let assignedSortUp = true;
let dueSortUp = true;
let statusSortUp = true;
let taskList;
let peopleChecked = [];
let status = [];

//cached elements
let taskDiv = document.getElementById("taskDiv");
let taskIcon = document.getElementById("taskIcon");
taskDiv.addEventListener("click", headerClick);
taskIcon.addEventListener("click", iconClick);
//get filter elements
var personFilters = document.querySelectorAll(".personFilter");
var statusFilters = document.querySelectorAll(".statusFilter");


//get header elements
let taskEl = document.getElementById("taskHeader");
let assignedEl = document.getElementById("assignedHeader");
let dueEl = document.getElementById("dueHeader");
let statusEl = document.getElementById("statusHeader");

//get arrow elements

let taskArrow = document.getElementById("taskArrow");
let assignedArrow = document.getElementById("assignedArrow");
let dueArrow = document.getElementById("dueArrow");
let statusArrow = document.getElementById("statusArrow");


//get task container
let taskContainer = document.getElementById("dashboardTaskTable");
let projectId = document.getElementById("projectId");

//event listeners
document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);
});

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems);
});

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
});

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.dropdown-trigger');
    var instances = M.Dropdown.init(elems);
});

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.datepicker');
    var instances = M.Datepicker.init(elems);
});


taskEl.addEventListener("click", headerClick);
assignedEl.addEventListener("click", headerClick);
dueEl.addEventListener("click", headerClick);
statusEl.addEventListener("click", headerClick);

taskArrow.addEventListener("click", arrowClick);
assignedArrow.addEventListener("click", arrowClick);
dueArrow.addEventListener("click", arrowClick);
statusArrow.addEventListener("click", arrowClick);

//filter event listeners

for (let i = 0; i < personFilters.length; i++) {
    personFilters[i].addEventListener('change', function () {
        if (this.checked) {
            peopleChecked.push(this.name);
            projFilter(peopleChecked, status);
        } else {
            for (let j = 0; j < peopleChecked.length; j++) {
                if (peopleChecked[j] == this.name) {
                    peopleChecked.splice(j, 1);
                }
            }
            projFilter(peopleChecked, status);
        }
    });
}

for (let i = 0; i < statusFilters.length; i++) {
    statusFilters[i].addEventListener('change', function () {
        if (this.checked) {
            //find which status was checked and push it
            if (this.name == 'icebox') {
                status.push('icebox');
            } else if (this.name == 'current') {
                status.push('current');
            } else {
                status.push('completed');
            }
            projFilter(peopleChecked, status);
        } else {
            for (let j = 0; j < status.length; j++) {
                if (status[j] == this.name) {
                    status.splice(j, 1);
                }
            }
            projFilter(peopleChecked, status);
        }
    });
}

function headerClick(e) {
    if (e.target.id == "taskDiv") {
        if (taskOpen) {
            taskOpen = false;
            //add expand icon
            taskIcon.src = "/images/expand.png"
        } else {
            taskOpen = true;
            taskIcon.src = "/images/collapse.png"
        }
    } else if (e.target.id == "taskHeader") {
        if (taskSortUp == true) {
            taskSortUp = false;
            //clear all other arrows
            assignedArrow.src = "";
            dueArrow.src = "";
            statusArrow.src = "";
            //sort down
            taskArrow.src = "/images/down.png"
            //sort taskList
            sortList(taskList, "taskdown");
            renderTable(taskList);
        } else {
            taskSortUp = true;
            //clear all other arrows
            assignedArrow.src = "";
            dueArrow.src = "";
            statusArrow.src = "";
            //sort up
            taskArrow.src = "/images/up.png"
            sortList(taskList, "taskup");
            renderTable(taskList);
        }

    } else if (e.target.id == "assignedHeader") {
        if (assignedSortUp == true) {
            assignedSortUp = false;
            //clear all other arrows
            taskArrow.src = "";
            dueArrow.src = "";
            statusArrow.src = "";
            //sort down
            assignedArrow.src = "/images/down.png"
            sortList(taskList, "assigneddown");
            renderTable(taskList);
        } else {
            assignedSortUp = true;
            //clear all other arrows
            taskArrow.src = "";
            dueArrow.src = "";
            statusArrow.src = "";
            //sort up
            assignedArrow.src = "/images/up.png"
            sortList(taskList, "assignedup");
            renderTable(taskList);
        }
    } else if (e.target.id == "dueHeader") {
        if (dueSortUp == true) {
            dueSortUp = false;
            //clear all other arrows
            assignedArrow.src = "";
            taskArrow.src = "";
            statusArrow.src = "";
            //sort down
            dueArrow.src = "/images/down.png"
            sortList(taskList, "datedown");
            renderTable(taskList);
        } else {
            dueSortUp = true;
            //clear all other arrows
            assignedArrow.src = "";
            taskArrow.src = "";
            statusArrow.src = "";
            //sort up
            dueArrow.src = "/images/up.png"
            sortList(taskList, "dateup");
            renderTable(taskList);
        }
    } else if (e.target.id == "statusHeader") {
        if (statusSortUp == true) {
            statusSortUp = false;
            //clear all other arrows
            assignedArrow.src = "";
            dueArrow.src = "";
            taskArrow.src = "";
            //sort down
            statusArrow.src = "/images/down.png"
            sortList(taskList, "statusdown");
            renderTable(taskList);
        } else {
            statusSortUp = true;
            //clear all other arrows
            assignedArrow.src = "";
            dueArrow.src = "";
            taskArrow.src = "";
            //sort up
            statusArrow.src = "/images/up.png"
            sortList(taskList, "statusup");
            renderTable(taskList);
        }
    }
}

function arrowClick(e) {
    //determine which header was clicked
    if (e.target.id == "taskArrow") {
        if (taskSortUp == true) {
            taskSortUp = false;
            //clear all other arrows
            assignedArrow.src = "";
            dueArrow.src = "";
            statusArrow.src = "";
            //sort down
            taskArrow.src = "/images/down.png"
            sortList(taskList, "taskdown");
            renderTable(taskList);
        } else {
            taskSortUp = true;
            //clear all other arrows
            assignedArrow.src = "";
            dueArrow.src = "";
            statusArrow.src = "";
            //sort up
            taskArrow.src = "/images/up.png"
            sortList(taskList, "taskup");
            renderTable(taskList);
        }

    } else if (e.target.id == "assignedArrow") {
        if (assignedSortUp == true) {
            assignedSortUp = false;
            //clear all other arrows
            taskArrow.src = "";
            dueArrow.src = "";
            statusArrow.src = "";
            //sort down
            assignedArrow.src = "/images/down.png"
            sortList(taskList, "assigneddown");
            renderTable(taskList);
        } else {
            assignedSortUp = true;
            //clear all other arrows
            taskArrow.src = "";
            dueArrow.src = "";
            statusArrow.src = "";
            //sort up
            assignedArrow.src = "/images/up.png"
            sortList(taskList, "assignedup");
            renderTable(taskList);
        }
    } else if (e.target.id == "dueArrow") {
        if (dueSortUp == true) {
            dueSortUp = false;
            //clear all other arrows
            assignedArrow.src = "";
            taskArrow.src = "";
            statusArrow.src = "";
            //sort down
            dueArrow.src = "/images/down.png"
            sortList(taskList, "datedown");
            renderTable(taskList);
        } else {
            dueSortUp = true;
            //clear all other arrows
            assignedArrow.src = "";
            taskArrow.src = "";
            statusArrow.src = "";
            //sort up
            dueArrow.src = "/images/up.png"
            sortList(taskList, "dateup");
            renderTable(taskList);
        }
    } else if (e.target.id == "statusArrow") {
        if (statusSortUp == true) {
            statusSortUp = false;
            //clear all other arrows
            assignedArrow.src = "";
            dueArrow.src = "";
            taskArrow.src = "";
            //sort down
            statusArrow.src = "/images/down.png"
            sortList(taskList, "statusdown");
            renderTable(taskList);
        } else {
            statusSortUp = true;
            //clear all other arrows
            assignedArrow.src = "";
            dueArrow.src = "";
            taskArrow.src = "";
            //sort up
            statusArrow.src = "/images/up.png"
            sortList(taskList, "statusup");
            renderTable(taskList);
        }
    }

}

function iconClick(e) {
    if (e.target.id == "taskIcon") {
        if (taskOpen) {
            taskOpen = false;
            //add expand icon
            taskIcon.src = "/images/expand.png"
        } else {
            taskOpen = true;
            taskIcon.src = "/images/collapse.png"
        }
    }
}



function renderTable(taskList) {

    //clear previous
    var taskChildren = taskContainer.querySelectorAll('.taskRow');
    for (let i = 0; i < taskChildren.length; i++) {
        taskChildren[i].remove();
    }


    for (let i = 0; i < taskList.length; i++) {
        let newElementRow = document.createElement('tr');
        newElementRow.classList.add("taskRow")
        let td1 = document.createElement('td');
        let td2 = document.createElement('td');
        let td3 = document.createElement('td');
        let td4 = document.createElement('td');
        let td5 = document.createElement('td');

        td1.innerHTML = taskList[i].name;
        td2.innerHTML = taskList[i].assignedTo.name;
        td3.innerHTML = taskList[i].due.slice(0, 10);
        td4.innerHTML = taskList[i].status;

        let a5 = document.createElement('a');
        a5.href = "/projects/"+projectId.defaultValue+"/task/" + taskList[i]._id;
        a5.innerText = "edit";
        td5.appendChild(a5);
        let br = document.createElement('br');
        td5.appendChild(br);


        let f5 = document.createElement('form');
        f5.method = "POST";
        f5.action = "/projects/" + projectId.defaultValue + "/task/" + taskList[i]._id + "/destroy?_method=DELETE";

        let f5a = document.createElement('a');
        f5a.setAttribute('onclick', 'this.parentNode.submit();');
        f5a.innerText = "delete";
        f5.appendChild(f5a);
        td5.appendChild(f5);

        newElementRow.appendChild(td1);
        newElementRow.appendChild(td2);
        newElementRow.appendChild(td3);
        newElementRow.appendChild(td4);
        newElementRow.appendChild(td5);
        taskContainer.appendChild(newElementRow);
    }

}


async function projFilter(people, status) {
    const endpoint = '/projFilter';
    taskList = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            people,
            status,
            project: projectId.defaultValue
        })
    }).then(res => res.json());

    icebox = 0;
    current = 0;
    completed = 0;
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].status == 'icebox') {
            icebox++;
        } else if (taskList[i].status == 'current') {
            current++;
        } else {
            completed++;
        }
    }
    
    renderTable(taskList);
}

function sortList(list, sort) {
    if (sort == "taskdown") {
        for (let i = 0; i < list.length; i++) {
            let min = list[i].name;
            let minIndex = i;
            for (let j = i + 1; j < list.length; j++) {
                if (list[j].name < min) {
                    min = list[j].name;
                    minIndex = j;
                }

            }
            //swap i and minindex
            let temp = list[i];
            list[i] = list[minIndex];
            list[minIndex] = temp;
        }
    } else if (sort == "taskup") {
        for (let i = 0; i < list.length; i++) {
            let min = list[i].name;
            let minIndex = i;
            for (let j = i + 1; j < list.length; j++) {
                if (list[j].name < min) {
                    min = list[j].name;
                    minIndex = j;
                }

            }
            //swap i and minindex
            let temp = list[i];
            list[i] = list[minIndex];
            list[minIndex] = temp;
        }
        list.reverse();
    } else if (sort == "assigneddown") {
        for (let i = 0; i < list.length; i++) {
            let min = list[i].assignedTo.name;
            let minIndex = i;
            for (let j = i + 1; j < list.length; j++) {
                if (list[j].assignedTo.name < min) {
                    min = list[j].assignedTo.name;
                    minIndex = j;
                }
            }
            //swap i and minindex
            let temp = list[i];
            list[i] = list[minIndex];
            list[minIndex] = temp;
        }
    } else if (sort == "assignedup") {
        for (let i = 0; i < list.length; i++) {
            let min = list[i].assignedTo.name;
            let minIndex = i;
            for (let j = i + 1; j < list.length; j++) {
                if (list[j].assignedTo.name < min) {
                    min = list[j].assignedTo.name;
                    minIndex = j;
                }
            }
            //swap i and minindex
            let temp = list[i];
            list[i] = list[minIndex];
            list[minIndex] = temp;
        }
        list.reverse();
    } else if (sort == "datedown") {
        for (let i = 0; i < list.length; i++) {
            let min = list[i].due;
            let minIndex = i;
            for (let j = i + 1; j < list.length; j++) {
                if (list[j].due < min) {
                    min = list[j].due;
                    minIndex = j;
                }
            }
            //swap i and minindex
            let temp = list[i];
            list[i] = list[minIndex];
            list[minIndex] = temp;
        }

    } else if (sort == "dateup") {
        for (let i = 0; i < list.length; i++) {
            let min = list[i].due;
            let minIndex = i;
            for (let j = i + 1; j < list.length; j++) {
                if (list[j].due < min) {
                    min = list[j].due;
                    minIndex = j;
                }

            }
            //swap i and minindex
            let temp = list[i];
            list[i] = list[minIndex];
            list[minIndex] = temp;
        }
        list.reverse();
    } else if (sort == "statusdown") {
        for (let i = 0; i < list.length; i++) {
            let min = list[i].status;
            let minIndex = i;
            for (let j = i + 1; j < list.length; j++) {
                if (list[j].status < min) {
                    min = list[j].status;
                    minIndex = j;
                }
            }
            //swap i and minindex
            let temp = list[i];
            list[i] = list[minIndex];
            list[minIndex] = temp;
        }
        list.reverse();

    } else if (sort == "statusup") {
        for (let i = 0; i < list.length; i++) {
            let min = list[i].status;
            let minIndex = i;
            for (let j = i + 1; j < list.length; j++) {
                if (list[j].status < min) {
                    min = list[j].status;
                    minIndex = j;
                }

            }
            //swap i and minindex
            let temp = list[i];
            list[i] = list[minIndex];
            list[minIndex] = temp;
        }
    }
}

//function call
projFilter(peopleChecked, status);
sortList(taskList, "taskdown");
renderTable(taskList);