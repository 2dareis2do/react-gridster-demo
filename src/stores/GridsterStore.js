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

function checkTop(x, y, targetX, targetY){
  if(x === targetX && y + 1 === targetY ){
    console.log('checkstart top start');
    return true;
  }
}

function checkRight(x, y, targetX, targetY){
  if(x === targetX + 1 && y === targetY ){
    console.log('checkstart right start');
    return true;
  }
}

function checkBottom(x, y, targetX, targetY){
  if(x === targetX && y - 1 === targetY ){
    console.log('checkstart bottom start');
    return true;
  }
}

function checkLeft(x, y, targetX, targetY){
  if(x === targetX - 1 && y === targetY ){
    console.log('checkstart left start');
    return true;
  }
}
/*
  Takes @cellX and @cellY value and returns
  in addition to @startX and @startY
  And returns true if either top, bottom, left or right
*/
function checkStart(cellX, cellY, startX, startY) {
   // top
  // if(elementX === startX && elementY + 1 === startY ){
  //   console.log('checkstart top start');
  //   return true;
  // }
  if(checkTop(cellX, cellY, startX, startY)) {
    return true;
  }
  //right
  // if(elementX === startX + 1 && elementY === startY ){
  //   console.log('checkstart right start');
  //   return true;
  // }
  if(checkRight(cellX, cellY, startX, startY)) {
    return true;
  }

  //bottom
  // if(elementX === startX && elementY - 1 === startY ){
  //   console.log('checkstart bottom start');
  //   return true;
  // }
  if(checkBottom(cellX, cellY, startX, startY)) {
    return true;
  }
  // left
  // if(elementX === startX - 1 && elementY === startY ){
  //   console.log('checkstart left start');
  //   return true;
  // }
  if(checkLeft(cellX, cellY  , startX, startY)) {
    return true;
  }
}

/* 
  iterates through @unvisited cells 
  starting at @end tries to iterate through until it is next to @start
  does so increntally 
  i.e. 0, 0+1, 0+1+1, 0+1+1+1 
  until count item is next to end
  || if not available i.e cell end is not end, and none other available return
*/

function pathFinder(unvisited, end, start) {

  console.log('pathfinder');

  let counter = 0;
  let reverseQ = [];

  let match = false;
  let notFound = true;

  while (match === false) {

    /*
        ideally these should not be here but they are linked to 
        i.e. those set to infinity or counted elsewhere with a higher value
    */

    let uncountedItems = unvisited.filter((obj => (obj.counter > counter) ));

    //queue is array object where counter = counter 
    let matchedItems = _store.grid.filter((obj => (obj.counter === counter) ));

    if (matchedItems.length > 1) {
      console.log('matched items more than one');
      console.log('matchedItems', matchedItems);
    }

    if(matchedItems.length !== 0 && start.length !== 0) {

      matchedItems.forEach(function(matchCell, i) {
        //iterate through start array
        start.forEach(function(startCell, s) {

          uncountedItems.forEach(function(element, j) {
            //top
            console.log('top', checkTop(element.x, element.y, matchCell.x, matchCell.y));
            if(element.x === matchCell.x && (element.y + 1) === matchCell.y ){
              element.counter = counter + 1;
              reverseQ.push(element);
              // console.log('element.id top', element);
              if (checkStart(element.x, element.y, startCell.x, startCell.y)) {
                notFound = false;
                match = true;
              }
            }

            //right
            if(element.x === (matchCell.x + 1) && element.y === matchCell.y ){
              element.counter = counter + 1;
              reverseQ.push(element);
               // console.log('element.id right', element);
              if (checkStart(element.x, element.y, startCell.x, startCell.y)) {
                notFound = false;
                match = true;
              }
            }

            //bottom
            if(element.x === matchCell.x && (element.y - 1) === matchCell.y ){
              element.counter = counter + 1;
              reverseQ.push(element);
              // console.log('element.id bottom', element);
              if (checkStart(element.x, element.y, startCell.x, startCell.y)) {
                notFound = false;
                match = true;
              }
            }

            //left
            if(element.x === (matchCell.x - 1) && element.y === matchCell.y ){
              element.counter = counter + 1;
              reverseQ.push(element);
              // console.log('element.id left', element);
              if (checkStart(element.x, element.y, startCell.x, startCell.y)) {
                notFound = false;
                match = true;
              }
            }


          })
        })
    })

    // console.log('queue', queue);
    counter = counter + 1;

   }

  }

  console.log('reverseQ', reverseQ);

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

/*
  accepts array of objects  
  if one of @unvisited cells is next to @end
  if match calls pathFinder function passing, @unvisited cells, @start and @end
*/
function isEndVisited(unvisited, end, start) {
  //need some way of checking if path exits before as we have no way of knowing
  if(end.length > 1) {
    console.log('multiple ends!!');
  }

  if(unvisited.length !== 0 && end.length !== 0) {

    end.forEach(function(enditem, j) {

      unvisited.forEach(function(element, i) {
        // top
        if(element.x === enditem.x && element.y -1 === enditem.y ) {
          pathFinder(unvisited, end, start);
        }
         // right
        if(element.x - 1 === enditem.x && element.y === enditem.y) {
          pathFinder(unvisited, end, start);
        }
        // bottom
        if(element.x === enditem.x && element.y +1 === enditem.y) {
          pathFinder(unvisited, end, start);
        }
         // left
        if(element.x + 1 === enditem.x && element.y === enditem.y) {
          // console.log('end left here')
          pathFinder(unvisited, end, start);
        }

      })

    })

  }
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


      let end = _store.grid.filter((obj => (obj.clicked === "end") ));

      let start = _store.grid.filter((obj => (obj.clicked === "start") ));


      // unVisited.push(...end);
      // condition here 
      isEndVisited(unVisited, end, start);


      GridsterStore.emit(CHANGE_EVENT);
    break;

    default:

      return true;
  }

});

export default GridsterStore;

