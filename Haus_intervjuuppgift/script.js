const output1 = document.querySelector('#sum1');
const output2 = document.querySelector('#sum2');
const output3 = document.querySelector('#sum3');
const output4 = document.querySelector('#sum4');
const output5 = document.querySelector('#sum5');



// UPPGIFT 1
let array = [4, 1, 1, 9, 2, 5, 1];
let totalArray = 0;

const sumArray = () => {
  //Dock är inte eval alltid att föredra men fungerar i detta syfte.
  let total = eval(array.join("+"));
  
  totalArray = total;
  output1.innerHTML = total;

  console.log('Uppgift 1, totalsumma: ', total);
};



// Uppgift 2
let string = "She sells sea shells at the sea shore";
let sumWords = 0;

const sumString = () => {
  let stringArray = string.toLowerCase().split(' ');
  output2.innerHTML = stringArray.length;

  let uniqueWords = stringArray.filter((ar, i) => {
    return stringArray.indexOf(ar) === i;
  });
  output3.innerHTML = uniqueWords.length;

  console.log('Uppgift 2, totalsumma antal ord: ', stringArray.length);
  console.log('Uppgift 2, totalsumma unika ord: ', uniqueWords.length);
};



// Uppgift 3
/* 
  Jag vet inte riktigt hur jag ska lösa detta då jag inte gjort något liknande innan.
  Stark start med att göra en split för att separera vid varje pipe. 
  Min tanke var att dela upp varje string för att kunna sortera arrayen. 
  Fastnade på fjärde då den blev NaN. Har inte fått ihop stringen till orginal 
  utan den är nu ett objekt med string + number. 
  Console.log samt lista i html koden skriver ut arrayen sorterad med de värden jag lyckades plocka ut. 
*/
let measuringPoints = '1630343254:12.1|1630543254:42.1|1641343254:7.1|1630562254:31z|1630571254:|1640343254:7.05|1640843254:7.0|1610571254:1.3';
let measuringArray = [];

const sumMeasuring = () => {
  measuringArray = measuringPoints.split('|');

  let newArray = [];
  let numbers = [];

  measuringArray.map(ar => {
    newArray.push(ar.split(':', ar.length));
  });

  if(newArray.length > 0) {
    newArray.map(ar => {
      let x = Number([...ar][1]);
      var obj= {};
      obj[0] = [...ar][0];
      obj[1] = x;
      numbers.push(obj);
    });
  }
  if(numbers.length > 0) {
    measuringArray = numbers;
  }

  measuringArray.sort((a, b) => a[1] - b[1]);
  
  measuringArray.map((ar, i) => {
    let li = document.createElement('li');
    li.setAttribute('id', `${i}`);
    li.innerText = `${ar[0] + ':' + ar[1]}`;
    output4.appendChild(li);
  });
  console.log("Uppgift 3, sorterad array: ",measuringArray);
}



// Uppgift 4 
let jsonArray = [];
let nodeLevelMap = 0;

fetch("./data.json")
.then(response => {
   return response.json();
})
.then(jsondata => {
  jsonArray = jsondata
});

// Hittar endast antalet noder i befintliga trädet.
const getNodes = (array, nodeArray = []) => {

  if(array.nodes.length) {
    let item = array.nodes.shift();
    nodeArray.push(item);
  
    if(item.nodes && item.nodes.length) {
      nodeArray = getNodes(item, nodeArray);
    }

    return getNodes(array, nodeArray);
  }
  else {
    output5.innerHTML = nodeArray.length;
    nodeLevelMap = nodeArray.length
    return nodeArray;
  }
  
};

const startNodeCount = () => {
  getNodes(jsonArray);
  console.log('Uppgift 4, totalsumma antal nodes : ', nodeLevelMap);
};
