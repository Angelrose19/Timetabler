document.getElementById('csv-form').addEventListener('submit', function (event) {
    event.preventDefault();
  
    var fileInput = document.getElementById('csv-file');
    var file = fileInput.files[0];
  
    if (!file) {
      alert('Please select a CSV file.');
      return;
    }
  
    var reader = new FileReader();
    reader.onload = function (event) {
      var csvData = event.target.result;
      var tableData = parseCSV(csvData);
      if (tableData.length > 0) {
        var table = createTable(tableData);
        var tableContainer = document.getElementById('table-container');
        tableContainer.innerHTML = '';
        tableContainer.appendChild(table);
  
        // Store timetable data in browser storage
        localStorage.setItem('timetableData', JSON.stringify(tableData));
      } else {
        console.log('No data found');
      }
    };
    reader.readAsText(file);
  
    fileInput.value = '';
  });
  
  // Retrieve timetable data from browser storage on page load
  window.addEventListener('DOMContentLoaded', function () {
    var storedData = localStorage.getItem('timetableData');
    if (storedData) {
      var tableData = JSON.parse(storedData);
      var table = createTable(tableData);
      var tableContainer = document.getElementById('table-container');
      tableContainer.innerHTML = '';
      tableContainer.appendChild(table);
    }
  });
  
  function parseCSV(csvData) {
    var lines = csvData.split('\n');
    var tableData = [];
  
    for (var i = 0; i < lines.length; i++) {
      var row = lines[i].split(',');
      tableData.push(row);
    }
  
    return tableData;
  }
  
  function createTable(tableData) {
    var table = document.createElement('table');
  
    for (var i = 0; i < tableData.length; i++) {
      var row = document.createElement('tr');
  
      for (var j = 0; j < tableData[i].length; j++) {
        var cell = document.createElement(i === 0 ? 'th' : 'td');
        cell.textContent = tableData[i][j];
        row.appendChild(cell);
      }
  
      table.appendChild(row);
    }
  
    return table;
  }
  