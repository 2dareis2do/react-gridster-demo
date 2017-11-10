// Gridster store
// Requiring the Dispatcher, Constants, and
// event emitter dependencies
import AppDispatcher from '../dispatcher/AppDispatcher';
import { GridsterConstants } from '../constants/GridsterConstants.js';
import { EventEmitter }from 'events';

EventEmitter.prototype._maxListeners = 200;

const CHANGE_EVENT = 'change';

// Define the store as an empty array
let _store = {
  columns: 10,
  rows: 10,
  grid: []
};

// Define the public event listeners and getters that
// the views will use to listen for changes and retrieve
// the store
class GridsterStoreClass extends EventEmitter {

  addChangeListener(cb) {
    this.on(CHANGE_EVENT, cb);
  }

  removeChangeListener(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  }

  getGrid() {
    return _store;
  }

}

function clearPath() {
  _store.grid.forEach((element, i) => {
    if (element.path === "connected"){
      element.path = null;
    }
  })
}
//paint path
function connectPath(array) {
  array.forEach((element, i) => {
    element.path = "connected";
  })
}

//checks if element is next to
function checkStart(elementX, elementY, startX, startY) {
   // console.log('checkStart');
  if(elementX === startX && elementY + 1 === startY ){
    console.log('checkstart top start');
    return true;
  }
  //right
  if(elementX === startX + 1 && elementY === startY ){
    console.log('checkstart right start');
    return true;
  }
  //bottom
  if(elementX === startX && elementY - 1 === startY ){
    console.log('checkstart bottom start');
    return true;
  }
  // left
  if(elementX === startX - 1 && elementY === startY ){
    console.log('checkstart left start');
    return true;
  }
}

function pathFinder() {
  console.log('pathfinder');
  //is next stary 
  //get end grid and assign 
  let start = _store.grid.filter((obj => (obj.clicked === "start") ));
  let counter = 0;
  let reverseQ = [];

  let match = false;
  let notFound = true;

  while (match === false) {
  // ideally these should not be here but they ar elinked to 
    let clickedItems = _store.grid.filter((obj => (obj.clicked === "true" && obj.counter > counter ) ));
    //queue is object where couter = counter 
    let queue = _store.grid.filter((obj => (obj.counter === counter) ));
    console.log('queue', queue);
    // iterate through queues 
    if(queue.length > 1 ) {
      console.log('q more than one - may be make choose one');
    }
    if(queue.length !== 0) {
      queue.forEach(function(end, i) {
      console.log('endy', end);

      clickedItems.forEach(function(element, i) {
        // console.log('element.counter', element.counter);
        // if (element.counter === Infinity) {
        //   console.log('infinite loop?')
        // }
        //top
        if(element.x === end.x && (element.y + 1) === end.y ){
          element.counter = counter + 1;
          reverseQ.push(element);
          // console.log('element.id top', element);
          if (checkStart(element.x, element.y, start[0].x, start[0].y)) {
            notFound = false;
            match = true;
          }
        }

        //right
        if(element.x === (end.x + 1) && element.y === end.y ){
          element.counter = counter + 1;
          reverseQ.push(element);
           console.log('element.id right', element);
          if (checkStart(element.x, element.y, start[0].x, start[0].y)) {
            notFound = false;
            match = true;
          }
        }

        //bottom
        if(element.x === end.x && (element.y - 1) === end.y ){
          element.counter = counter + 1;
          reverseQ.push(element);
          // console.log('element.id bottom', element);
          if (checkStart(element.x, element.y, start[0].x, start[0].y)) {
            notFound = false;
            match = true;
          }
        }

        //left
        if(element.x === (end.x - 1) && element.y === end.y ){
          element.counter = counter + 1;
          reverseQ.push(element);
          // console.log('element.id left', element);
          if (checkStart(element.x, element.y, start[0].x, start[0].y)) {
            notFound = false;
            match = true;
          }
        }


      })
    })
 

    // console.log('queue', queue);

    counter = counter + 1;



   }

  }

  console.log('notFound', notFound);
  console.log('counter', counter);
  console.log('match', match);

  let recursion = true;

  // console.log('start', start);
  start[0].counter = counter + 1;

  // console.log('tempQ after', tempQ);
  // console.log('shortestPath', shortestPath);

  //Now, start at S (7) and go to the nearby cell with the lowest number (unchecked cells cannot be moved to). The path traced is (1,3,7) -> (1,4,6) -> (1,5,5) -> (1,6,4) -> (1,7,3) -> (1,8,2) -> (2,8,1) -> (3,8,0). In the event that two numbers are equally low (for example, if S was at (2,5)), pick a random direction – the lengths are the same. The algorithm is now complete.

  //goto start
  //start is array object
  //get start x, y
  // console.log('start', start);

  let neighbours = [];
  //iterate over temp items
    //  if temp item  is neighbour
  // add to list of neighbours

  // run in neighbours is 0 i.e. only on first start complete and match === true
  if(match === true) {

    while (recursion === true && counter > 0) {

      if (neighbours.length === 0) {

        reverseQ.forEach(function(item, i){
          // console.log('rq item', item);
          // console.log('rq item.counter', item.counter);
           // top
          if(item.x === start[0].x && item.y === start[0].y - 1) {
            // console.log('top reverseQ');
            if(item.counter === counter) {
              console.log('top push reverseQ');
              neighbours.push(item);
            }
          }
          //right
          if(start[0].x - 1 === item.x && start[0].y === item.y) {
            // console.log('right reverseQ');
            if(item.counter === counter) {
              console.log('right push reverseQ');
              neighbours.push(item);
            }
          }
          //bottom
          if(start[0].x === item.x && item.y === start[0].y + 1) {
            // console.log('bottom reverseQ');
            if(item.counter === counter) {
              console.log('bottom push reverseQ');
              neighbours.push(item);
            }
          }
          //left
          if(start[0].x + 1 === item.x && start[0].y === item.y) {
            // console.log('left reverseQ');
            if(item.counter === counter) {
              console.log('left push reverseQ');
              neighbours.push(item);
            }
          }

        })
      }

      console.log('neighbours after start', neighbours);

      let lowestNumber = Infinity;
      //get neighboure 



      //  for each neighbour take the loweset count ...
      if(neighbours.length !== 0){
        console.log('gt 1 !');
        neighbours.forEach(function(cell, c){
          // ige tneighbout with lowest value for counter
          //check counter 
          if (cell.counter < lowestNumber) {
            console.log('cell.counter', cell.counter);
            lowestNumber = cell.counter;
          }
        })

      }

       //used to select cell from next round
      let tempZ = [];
      if(neighbours.length !== 0){
        //take item with least count ....
        neighbours.forEach(function(cell, c) {
          console.log('shortest cell push', c);

          if (cell.counter === lowestNumber) {
            console.log('shortest cell push inside', c);

            tempZ.push(cell);
          }

        })
      }

      console.log('tempZ', tempZ);
      console.log('tempZ.length', tempZ.length);

      // let newNeighBours = [];
      if (tempZ.length !==0 && reverseQ.length !==0) {

        reverseQ.forEach(function(item, i){
          // top
          if(tempZ[0].x === item.x && tempZ[0].y - 1 === item.y ) {
            console.log('top reverseQ');
            if(item.counter === counter) {
              // console.log('top tempZ push');
              console.log('item reverseQ push', item);
              neighbours.push(item);
            }
          }
          //right
          if(tempZ[0].x - 1 === item.x && tempZ[0].y === item.y) {
            console.log('right reverseQ');
            if(item.counter === counter) {
              console.log('right reverseQ push');
              neighbours.push(item);
            }
          }
          //bottom
          if(tempZ[0].x === item.x && tempZ[0].y + 1 === item.y) {
            console.log('bottom reverseQ');
            if(item.counter === counter) {
              console.log('bottom reverseQ push');
              neighbours.push(item);
            }
          }
          //left
          if(tempZ[0].x + 1 === item.x && tempZ[0].y === item.y) {
            console.log('left reverseQ');
            if(item.counter === counter) {
              console.log('left reverseQ push');
              neighbours.push(item);
            }
          }

        })

      }
    

      // get next neighbour
      // 

      //...and return or save  if neighbour > 0 //part of while condition?
      // from neighboure 
      console.log('lowestNumber after', lowestNumber);



      // if count = 1  add item and end


        // console.log('tempRec after', tempRec);
        // let tempRec = [];
      // if (shortestPath.length !== 0 ) {
      //   connectPath(shortestPath);
      // }
      counter = counter - 1;
        // counter = counter - 1;
      console.log('counter 2', counter);

      // console.log('shortestPath', shortestPath);
      console.log('neighbours',neighbours);
      if(counter === 0 && neighbours.length !== 0 ) {
            //console.log("BINGO start");

        neighbours.forEach(function(neigh, n) {
          if(neigh.counter === 1 ) {
            console.log('neigh', neigh);

            console.log("BINGO");
            clearPath();
            connectPath(neighbours)
          } else {
            console.log('neigh', neigh.counter);
            console.log('Better luck next time');
         //   connectPath(neighbours)
          }
        })
      }
    }
  }
}

function isDestinationVisited(array) {
  // console.log('is destination  2');
  //compare element to see if it is eiter left right or top of end square
  console.log('array', array);
  // loops though array of clicled items + end starting from end

  //need some way of checking if path exits before as we have no way of knpwing
  // if the end cell has cells in from
  //seprate path into counting 
  //when counting finished  then traverse
  // 
    array.forEach(function(element, i) {
      // top
      if(element.x === _store.end.x && element.y -1 === _store.end.y ) {
        // markPath();
        console.log('is destination 2 top');
        console.log('is destination 2 top element', element);

        pathFinder();

      }
       // right
      if(element.x - 1 === _store.end.x && element.y === _store.end.y) {
        // markPath();
        console.log('is destination 2 right');
        console.log('is destination 2 right element', element);

        pathFinder();

      }

      // bottom
      if(element.x === _store.end.x && element.y +1 === _store.end.y) {
        // markPath();
        console.log('is destination 2 bottom');
        console.log('is destination 2 bottom element', element);

        pathFinder();

      }
       // left
      if(element.x + 1 === _store.end.x && element.y === _store.end.y && element.counter) {
        // markPath();
        console.log('is destination 2 left');
        console.log('is destination 2 left element', element);
        console.log('is destination 2 left element counter', element.counter);

        pathFinder();

      }
  })

}

function xcoord(number) {
  return ( 1 + ((number%_store.columns)));
}

function ycoord(number) {
  return ( 1 + parseInt(number/_store.columns, 10));
}

// Initialize the singleton to register with the
// dispatcher and export for React components
const GridsterStore = new GridsterStoreClass();

// Register each of the actions with the dispatcher
// by changing the store's data and emitting a
// change
AppDispatcher.register((payload) => {

  const action = payload.action;

  switch(action.actionType) {

    case GridsterConstants.UPDATE_ITEM:

      _store.grid.push(action.value);
      GridsterStore.emit(CHANGE_EVENT);

      break;

    case GridsterConstants.UPDATE_ROW:

      _store.rows = action.value;
      GridsterStore.emit(CHANGE_EVENT);
    break;

    case GridsterConstants.UPDATE_COL:

      _store.columns = action.value;
      GridsterStore.emit(CHANGE_EVENT);
    break;

    case GridsterConstants.GENERATE_GRID:

      let total = _store.columns * _store.rows;

      let newCells = [];

      for(let i=0;i<total;i++){
        newCells.push({'id': i, 'clicked' : "false", 'state': "initial", 'x' : xcoord(i), 'y': ycoord(i) , 'path': null, 'flag': false, 'distance': Infinity, 'counter': Infinity, 'visited': "unvisited"});
      }

      _store.grid = newCells;

      GridsterStore.emit(CHANGE_EVENT);
    break;

    case GridsterConstants.GENERATE_CLICK:

      let clickIndex = _store.grid.findIndex((obj => obj.id === parseInt(action.value, 10)));

      if(_store.grid[clickIndex].clicked === "false" && clickIndex !== _store.start.id && clickIndex !== _store.end.id) {
        _store.grid[clickIndex].clicked = "true";
      } else if (_store.grid[clickIndex].clicked !== "false" && clickIndex !== _store.start.id && clickIndex !== _store.end.id) {
        _store.grid[clickIndex].clicked = "false";
      }

      GridsterStore.emit(CHANGE_EVENT);

    break;


    case GridsterConstants.MOUSE_ENTER:

      let enterIndex = _store.grid.findIndex((obj => obj.id === parseInt(action.value, 10)));

      _store.grid[enterIndex].state = "hover";

      GridsterStore.emit(CHANGE_EVENT);

    break;

    case GridsterConstants.MOUSE_EXIT:

      let exitIndex = _store.grid.findIndex((obj => obj.id === parseInt(action.value, 10)));

      _store.grid[exitIndex].state = "initial";

      GridsterStore.emit(CHANGE_EVENT);
    break;

    case GridsterConstants.MOUSE_DOWN:

      let downIndex = _store.grid.findIndex((obj => obj.id === parseInt(action.value, 10)));

      _store.grid[downIndex].state = "down";

      GridsterStore.emit(CHANGE_EVENT);
    break;

    case GridsterConstants.GENERATE_START:

      let startRow = parseInt(Math.random()*_store.rows, 10);
      let startCell = startRow * _store.columns;
      _store.start = {'id': startCell, 'x': xcoord(startCell), 'y': ycoord(startCell)};

      let startIndex = _store.grid.findIndex((obj => obj.id === parseInt(startCell, 10)));

      _store.grid[startIndex].clicked = "start";
      _store.grid[startIndex].distance = {'x':0, 'y': 0};
      _store.grid[startIndex].visited = "current";

      GridsterStore.emit(CHANGE_EVENT);
    break;

    case GridsterConstants.GENERATE_END:

      let endRow = parseInt(Math.random()*_store.rows, 10);
      let endCell = endRow * _store.columns + (_store.columns -1);
      _store.end = {'id': endCell, 'x': xcoord(endCell), 'y': ycoord(endCell)};

      let endIndex = _store.grid.findIndex((obj => obj.id === parseInt(endCell, 10)));
      _store.grid[endIndex].clicked = "end";
      _store.grid[endIndex].counter = 0;

      GridsterStore.emit(CHANGE_EVENT);
    break;

    case GridsterConstants.SHORT_PATH:

      // shortfilter marks all clicked items
      // this is initially the same as unvisited items + end item
      // let shortFilter = _store.grid.filter((obj => obj.clicked === "true" ));

      let unVisited = _store.grid.filter((obj => (obj.clicked === "true" && obj.visited !== "visited" && obj.visited !== "current"  ) ));


      let end = _store.grid.filter((obj => (obj.clicked === "end" && obj.visited !== "visited") ));

      // unVisited.push(...end);

      isDestinationVisited(unVisited);


      GridsterStore.emit(CHANGE_EVENT);
    break;

    default:

      return true;
  }

});

export default GridsterStore;

