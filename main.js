

document.getElementById('submitFile').addEventListener('click', submitData);

document.getElementById('formFile').addEventListener('change', activeButton);

function activeButton() {
  document.getElementById('submitFile').disabled = false;
}


function submitData() {
  let myModal = new bootstrap.Modal(document.getElementById("Modal"), {});
  myModal.show(); 

  function handleShown() {
    readFile(document.getElementById('formFile'));
    myModal._element.removeEventListener('shown.bs.modal', handleShown);
  }

  myModal._element.addEventListener('shown.bs.modal', handleShown);

  document.getElementById('submitFile').disabled = true;
}


let dataFile = [];

 function readFile(input) {
  let file = input.files[0];
  
  let reader = new FileReader();
  reader.readAsText(file);

  reader.onload = function() {
    const stringArray = reader.result.split('\n') 

    dataFile = stringArray.map(function(item) {
      return parseInt(item, 10); 
    });
  };
  
  reader.onerror = function() {
    console.log(reader.error);
  };
  
  reader.onloadend = function () {
    getMaxValue(dataFile);
    getMinValue(dataFile);
    getMedValue(dataFile);
    getAverValue(dataFile);
    getMaxSequence(dataFile)
    getMinSequence(dataFile)
    setTimeout(() => { closeProgressBar() }, 1000);
   }
}



function closeProgressBar() {
  var myModalEl = document.getElementById('Modal');
  var modal = bootstrap.Modal.getInstance(myModalEl)
  modal.hide();
}




function getMaxValue(data) {
  let length = data.length, max = -Infinity;
  while (length--) {
    if (Number(data[length]) > max) {
      max = Number(data[length]);
    }
  }
  console.log(max);
  document.getElementById('maxValue').innerText = max;
};




function getMinValue(data) {
  var length = data.length, min = Infinity;
  while (length--) {
    if (Number(data[length]) < min) {
      min = Number(data[length]);
    }
  }
  console.log(min);
  document.getElementById('minValue').innerText = min;
};




function getMedValue(originalData) {
  var count = 0;
  
  const data = [...originalData].sort((a, b) => a - b);

  if (data.length % 2 === 0) {
    let medData = (data[data.length / 2 - 1] + data[data.length / 2]) / 2;
    console.log(medData);
    document.getElementById('medValue').innerText = medData;
  } else {
    let medData =  data[Math.floor(data.length / 2)];
    document.getElementById('medValue').innerText = medData;
  }
}



function getAverValue(data) {
  let sum = 0;
  let count = 0;
  for (var i = 0; i < data.length; i++) {
    if (typeof data[i] === 'number' && !isNaN(data[i])) {
      sum += data[i];
      count++; 
    }
  }
  if (count > 0) {
    let averData = sum / count;
    console.log(count);
    document.getElementById('averValue').innerText = averData;
  } else {
    console.error("Неможливо обчислити середнє значення: масив не містить чисел");
  }
};

function getMaxSequence(data) {
  let currentSequence = [];
  let maxSequence = [];
  
  for (let i = 0; i < data.length; i++) {
    if (currentSequence.length === 0 || data[i] > currentSequence[currentSequence.length - 1]) {
      currentSequence.push(data[i]);
    } else {
      if (currentSequence.length > maxSequence.length) {
        maxSequence = currentSequence.slice();
      }
      currentSequence = [data[i]];
    }
  }
  
  if (currentSequence.length > maxSequence.length) {
    maxSequence = currentSequence.slice();
  }
  
  console.log('Найдовша зростаюча послідовність чисел:', maxSequence);
  document.getElementById('maxSequence').innerText = maxSequence;
}


function getMinSequence(data) {
  let currentSequence = [];
  let minSequence = [];
  
  for (let i = 0; i < data.length; i++) {
    if (currentSequence.length === 0 || data[i] < currentSequence[currentSequence.length - 1]) {
      currentSequence.push(data[i]);
    } else {
      if (currentSequence.length > minSequence.length) {
        minSequence = currentSequence.slice();
      }
      currentSequence = [data[i]];
    }
  }
  
  if (currentSequence.length > minSequence.length) {
    minSequence = currentSequence.slice();
  }
  console.log('Найдовша cпадаюча послідовність чисел:', minSequence);
  document.getElementById('minSequence').innerText = minSequence;
}





