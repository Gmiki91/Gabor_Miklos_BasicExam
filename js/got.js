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
  displayNames(sortedData);
}

getGameOfThronesCharacterDatas(
  './json/got.json',
  successGetGameOfThronesCharacterDatas
);

// Live servert használd mindig!!!!!
/* IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ! */
function removeDeadPeople(data) {
  var adat = [];
  console.log(data[0]);
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

function displayNames(data) {
  var tbody = document.querySelector('tbody');
  for (var i = 0; i < data.length; i++) {
    if (i % 8 === 0) {
      var tr = document.createElement('tr');
    }
    createTd(data, i, tr);
    addRowToBody(i, tr, tbody);
  }
}

function createTd(data, i, tr) {
  var td = document.createElement('td');
  td.innerHTML = data[i].name;
  tr.appendChild(td);
}

function addRowToBody(i, tr, tbody) {
  if (i % 7 === 0) {
    tbody.appendChild(tr);
  }
}
