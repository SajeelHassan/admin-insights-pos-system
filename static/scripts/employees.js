//grabbing elements
var nothing = document.getElementById('nothing-employees');
//GET AJAX REQUEST (ALl Inventory data) for inventory
//Load Inventory
var allEmployees;
var xmlObj = new XMLHttpRequest();
xmlObj.open('get', 'incEmployees', true);
xmlObj.send();
xmlObj.onreadystatechange = function () {
    if (this.readyState == 4 && this.status === 200) {
        allEmployees = JSON.parse(this.responseText);
        xmlObj.abort();
        // console.trace(allEmployees);
        if (allEmployees.length) {
            createDataTable(allEmployees);
        }

    }
}
// Main Table Creation
var data = [];
var newTable;
function createDataTable(arraysOfArrays) {
    var t_cols = 10;
    let tableElement = document.createElement('table');
    tableElement.id = 'table-main-employees';

    document.getElementById('main-article-employees').appendChild(tableElement);
    var row;
    newTable = document.getElementById('table-main-employees');
    //Inserting New Row
    for (let i = 0; i < arraysOfArrays.length; i++) {
        row = newTable.insertRow();
        for (let j = 0; j < t_cols; j++)
            row.insertCell();
    }
    //creating table head
    var tablehead = newTable.createTHead();
    row = tablehead.insertRow();
    let ths = ['Sr.', "firstname", "Lastname", "Username", "Joined On", "Email", "Phone", "Orders Score", "Scores Detail", "Manage"]
    for (let i = 0; i < t_cols; i++)
        row.append(document.createElement('th'));
    for (let i = 0; i < t_cols; i++)
        tablehead.rows[0].cells[i].innerHTML = ths[i];

    var data;
    //populating the table
    for (let i = 0; i < arraysOfArrays.length; i++) {
        //populating New Row
        data = arraysOfArrays[i];
        // data[0] = `<input type="checkbox" >`;
        // newTable.rows[i + 1].cells[0].innerHTML = data[0];
        data[t_cols - 2] = `<a href="#" id="emp-detail-${data[0]}">View</a>`;
        data[t_cols - 1] = `<div class="manage" id="emp-manage-${data[0]}"><span class='update-btn' onclick="updateModal(event)">&#9998;</span><span class='delete-btn' onclick="deleteModal(event)">&#10008;</span></div>`;
        data[0] = i + 1;
        for (let j = 0; j < t_cols; j++)
            newTable.rows[i + 1].cells[j].innerHTML = data[j];
        data = [];
    }
    nothing.style.display = 'none';
}
