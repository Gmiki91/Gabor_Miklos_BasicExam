function getGameOfThronesCharacterDatas(url, callbackFunc) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      callbackFunc(this);
    }
  };
  xhttp.open('GET', url, true);
  xhttp.send();
}

function successGetGameOfThronesCharacterDatas(xhttp) {
  // Nem szabad globálisba kitenni a userDatas-t!
  var userDatas = JSON.parse(xhttp.responseText);
  // Innen hívhatod meg a többi függvényed
  var aliveData = removeDeadPeople(userDatas);
  var sortedData = sortPeople(aliveData);
  displayCharacters(sortedData);
}

getGameOfThronesCharacterDatas(
  './json/got.json',
  successGetGameOfThronesCharacterDatas
);

// Live servert használd mindig!!!!!
/* IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ! */
function removeDeadPeople(data) {
  var adat = [];
  for (var i = 0; i < data.length; i++) {
    if (!data[i].dead) {
      adat.push(data[i]);
    }
  }
  return adat;
}

function sortPeople(data) {
  var sorban = data.sort( function (a, b) {
    return a.name.localeCompare(b.name);
  });
  return sorban;
}
function displayCharacters(data) { // adding the portraits and the names one after another on different rows
  var tbody = document.querySelector('tbody.list');
  var tr = document.createElement('tr');
  var count = 0;

  for (var j = 0; j < 6; j++) {
    for (var i = 0; i < 8; i++) {
      addIcons(data, i + count, tr);
    }
    tr = addRow(tbody, tr);
    for  (i = 0; i < 8; i++) {
      addNames(data, i + count, tr);
    }
    tr = addRow(tbody, tr);
    count += 8;
  }
}

function addRow(tbody, tr) {
  tbody.appendChild(tr);
  return document.createElement('tr');
}

function addIcons(data, i, tr) {
  var td = document.createElement('td');
  td.className = 'ikonok';
  var image = document.createElement('img');
  image.src =  data[i].portrait;
  td.onclick = function () {
    showDetails(data, i);
  };
  td.appendChild(image);
  tr.appendChild(td);
}

function addNames(data, i, tr) {
  var td = document.createElement('td');
  td.className = 'nevek';
  td.innerHTML = data[i].name;
  tr.appendChild(td);
}

function showDetails(data, i) {
  console.log(data[i].name);
}
