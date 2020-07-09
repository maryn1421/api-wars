let f = 1;
let myTable = document.querySelector('#my-table');
console.log(myTable);
let modalTable = document.querySelector('#modal-table');
let prevBtn = document.querySelector('#prev');
let nextBtn = document.querySelector('#next');

function displayPage(){
    let url = 'https://swapi.co/api/planets/?page=' + f;
    console.log(url);
    let newRequest = new XMLHttpRequest();
    newRequest.open('GET', url);
    newRequest.onload = function() {
        let ourData = JSON.parse(newRequest.responseText);
        renderHTML(ourData.results);
    };
  newRequest.onerror = function() {
    console.log("Connection error");
  };
  newRequest.send();
  function renderHTML(result) {
      if (f !== 1) {
          for (let i = 1; i <= 10; i++) {
              document.getElementById("my-table").deleteRow(1);
          }
      }
      for (let i = 0; i < result.length; i++) {
          console.log("in the for loop");
          let name = result[i].name;
          let diameter = result[i].diameter + ' km';
          let climate = result[i].climate;
          let terrain = result[i].terrain;
          let surface_water = result[i].surface_water + ' %';
          let population = result[i].population + ' people';
          let residents = result[i].residents;
          let residentTag = 'No known residents';
          if (residents.length > 0) {
              residentTag = '<button class="residentBtn" data-toggle="modal" data-target="#residentModal" aria-labelledby="residentModalLabel" aria-hidden="true" data-planet="' + residents + '"> ' + residents.length + ' residents.</button>'
          }
          let htmlSting = '<tr class="table-data"><td>' + name + '</td><td>' + diameter + '</td><td>' + climate + '</td><td>' + terrain + '</td><td>' + surface_water + '</td><td>' + population + '</td><td>' + residentTag + '</td></tr>';
          myTable.insertAdjacentHTML('beforeend', htmlSting);
      }
           $('#residentModal').on('show.bs.modal', function (event) {
            let button = $(event.relatedTarget);
            let residents = button.data('planet');
            let ar = residents.split(",");
            $('.residentdata').remove();
            for (let n=0; n<ar.length; n++){
               $.getJSON(ar[n], function(response){
                   let nameRes = response.name;
                   let heightRes = response.height/100 + ' m';
                   let massRes = response.mass + ' kg';
                   let hairRes = response.hair_color;
                   let skinRes = response.skin_color;
                   let eyeRes = response.eye_color;
                   let birthRes = response.birth_year;
                   let genderRes = response.gender;
                   if (genderRes === 'male') {
                       genderRes = `<i class="fas fa-mars"></i>`
                   }else if (genderRes === 'female'){
                       genderRes = `<i class="fas fa-venus"></i>`
                   }

                   modalTable.insertAdjacentHTML('beforeend',`<tr class="residentdata"><td>${nameRes}</td><td>${heightRes}</td><td>${massRes}</td><td>${hairRes}</td><td>${skinRes}</td><td>${eyeRes}</td><td>${birthRes}</td><td>${genderRes}</td></tr>`);
               });
            }
            });

    }
    }

displayPage();



prevBtn.addEventListener('click', function(event){
    if (f <= 1){
        f = 1;}
    f -= 1;
    displayPage();

});

nextBtn.addEventListener('click', function(event){
    if (f >= 6){
        f = 6;}
    f += 1;
    displayPage();

});