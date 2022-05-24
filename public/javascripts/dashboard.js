
let taskSortUp = true;
let projSortUp = true;
let dueSortUp = true;
let statusSortUp = true;
let taskList;
let projChecked = [];
let status = [];
let myChart;
let icebox = 0;
let current = 0;
let completed = 0;

//get filter elements
var projFilters = document.querySelectorAll(".projectFilter");
var statusFilters = document.querySelectorAll(".statusFilter");

//get header elements
let taskEl = document.getElementById("taskHeader");
let projectEl = document.getElementById("projectHeader");
let dueEl = document.getElementById("dueHeader");
let statusEl = document.getElementById("statusHeader");

//get arrow elements
let taskArrow = document.getElementById("taskArrow");
let projArrow = document.getElementById("projArrow");
let dueArrow = document.getElementById("dueArrow");
let statusArrow = document.getElementById("statusArrow");

//get task container
let taskContainer = document.getElementById("dashboardTaskTable");

//get chart element
const ctx = document.getElementById('myChart').getContext('2d');


//add event listeners
document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);
});
document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
});
document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.datepicker');
    var instances = M.Datepicker.init(elems);
});

taskEl.addEventListener("click", headerClick);
projectEl.addEventListener("click", headerClick);
dueEl.addEventListener("click", headerClick);
statusEl.addEventListener("click", headerClick);

taskArrow.addEventListener("click", arrowClick);
projArrow.addEventListener("click", arrowClick);
dueArrow.addEventListener("click", arrowClick);
statusArrow.addEventListener("click", arrowClick);


for (let i = 0; i < projFilters.length; i++) {
    projFilters[i].addEventListener('change', function () {
        if (this.checked) {
            projChecked.push(this.name);
            dashFilter(projChecked, status);
        } else {
            let projIndex;
            for (let j = 0; j < projChecked.length; j++) {
                if (projChecked[j] == this.name) {
                    projChecked.splice(j, 1);
                }
            }
            dashFilter(projChecked, status);
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
            dashFilter(projChecked, status);
        } else {
            for (let j = 0; j < status.length; j++) {
                if (status[j] == this.name) {
                    status.splice(j, 1);
                }
            }
            dashFilter(projChecked, status);
        }
    });
}

//functions
function headerClick(e) {
    //determine which header was clicked
    if (e.target.id == "taskHeader") {
        if (taskSortUp == true) {
            taskSortUp = false;
            //clear all other arrows
            projArrow.src = "";
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
            projArrow.src = "";
            dueArrow.src = "";
            statusArrow.src = "";
            //sort up
            taskArrow.src = "/images/up.png"
            sortList(taskList, "taskup");
            renderTable(taskList);
        }

    } else if (e.target.id == "projectHeader") {
        if (projSortUp == true) {
            projSortUp = false;
            //clear all other arrows
            taskArrow.src = "";
            dueArrow.src = "";
            statusArrow.src = "";
            //sort down
            projArrow.src = "/images/down.png"
            sortList(taskList, "projdown");
            renderTable(taskList);
        } else {
            projSortUp = true;
            //clear all other arrows
            taskArrow.src = "";
            dueArrow.src = "";
            statusArrow.src = "";
            //sort up
            projArrow.src = "/images/up.png"
            sortList(taskList, "projup");
            renderTable(taskList);
        }
    } else if (e.target.id == "dueHeader") {
        if (dueSortUp == true) {
            dueSortUp = false;
            //clear all other arrows
            projArrow.src = "";
            taskArrow.src = "";
            statusArrow.src = "";
            //sort down
            dueArrow.src = "/images/down.png"
            sortList(taskList, "datedown");
            renderTable(taskList);
        } else {
            dueSortUp = true;
            //clear all other arrows
            projArrow.src = "";
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
            projArrow.src = "";
            dueArrow.src = "";
            taskArrow.src = "";
            //sort down
            statusArrow.src = "/images/down.png"
            sortList(taskList, "statusdown");
            renderTable(taskList);
        } else {
            statusSortUp = true;
            //clear all other arrows
            projArrow.src = "";
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
            projArrow.src = "";
            dueArrow.src = "";
            statusArrow.src = "";
            //sort down
            taskArrow.src = "/images/down.png"
            sortList(taskList, "taskdown");
            renderTable(taskList);
        } else {
            taskSortUp = true;
            //clear all other arrows
            projArrow.src = "";
            dueArrow.src = "";
            statusArrow.src = "";
            //sort up
            taskArrow.src = "/images/up.png"
            sortList(taskList, "taskup");
            renderTable(taskList);
        }

    } else if (e.target.id == "projArrow") {
        if (projSortUp == true) {
            projSortUp = false;
            //clear all other arrows
            taskArrow.src = "";
            dueArrow.src = "";
            statusArrow.src = "";
            //sort down
            projArrow.src = "/images/down.png"
            sortList(taskList, "projdown");
            renderTable(taskList);
        } else {
            projSortUp = true;
            //clear all other arrows
            taskArrow.src = "";
            dueArrow.src = "";
            statusArrow.src = "";
            //sort up
            projArrow.src = "/images/up.png"
            sortList(taskList, "projup");
            renderTable(taskList);
        }
    } else if (e.target.id == "dueArrow") {
        if (dueSortUp == true) {
            dueSortUp = false;
            //clear all other arrows
            projArrow.src = "";
            taskArrow.src = "";
            statusArrow.src = "";
            //sort down
            dueArrow.src = "/images/down.png"
            sortList(taskList, "datedown");
            renderTable(taskList);
        } else {
            dueSortUp = true;
            //clear all other arrows
            projArrow.src = "";
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
            projArrow.src = "";
            dueArrow.src = "";
            taskArrow.src = "";
            //sort down
            statusArrow.src = "/images/down.png"
            sortList(taskList, "statusdown");
            renderTable(taskList);
        } else {
            statusSortUp = true;
            //clear all other arrows
            projArrow.src = "";
            dueArrow.src = "";
            taskArrow.src = "";
            //sort up
            statusArrow.src = "/images/up.png"
            sortList(taskList, "statusup");
            renderTable(taskList);
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
        let pa = document.createElement('a');

        td1.innerHTML = taskList[i].name;
        pa.href = "/projects/" + taskList[i].project._id;
        pa.innerText = taskList[i].project.name;
        td2.appendChild(pa);
        td3.innerHTML = taskList[i].due.slice(0, 10);
        td4.innerHTML = taskList[i].status;

        newElementRow.appendChild(td1);
        newElementRow.appendChild(td2);
        newElementRow.appendChild(td3);
        newElementRow.appendChild(td4);
        taskContainer.appendChild(newElementRow);
    }

}

function renderGraph(icebox, current, completed) {
    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Icebox', 'Current', 'Completed'],
            datasets: [{
                label: "",
                data: [icebox, current, completed],
                backgroundColor: [
                    'rgba(206, 150, 251, 0.2)',
                    'rgba(255, 143, 207, 0.2)',
                    'rgba(0, 194, 186, 0.2)'
                ],
                borderColor: [
                    'rgba(206, 150, 251, 1)',
                    'rgba(255, 143, 207, 1)',
                    'rgba(0, 194, 186, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

}


async function dashFilter(projects, status) {
    const endpoint = '/dashFilter';
    taskList = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            projects,
            status
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
    if (myChart) {
        myChart.destroy();
    }
    renderTable(taskList);
    renderGraph(icebox, current, completed);
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
    } else if (sort == "projdown") {
        for (let i = 0; i < list.length; i++) {
            let min = list[i].project.name;
            let minIndex = i;
            for (let j = i + 1; j < list.length; j++) {
                if (list[j].project.name < min) {
                    min = list[j].project.name;
                    minIndex = j;
                }
            }
            //swap i and minindex
            let temp = list[i];
            list[i] = list[minIndex];
            list[minIndex] = temp;
        }
    } else if (sort == "projup") {
        for (let i = 0; i < list.length; i++) {
            let min = list[i].project.name;
            let minIndex = i;
            for (let j = i + 1; j < list.length; j++) {
                if (list[j].project.name < min) {
                    min = list[j].project.name;
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
dashFilter(projChecked, status);