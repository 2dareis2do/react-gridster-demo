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

//paint path
function connectPath(array) {
  array.forEach((element, i) => {
    element.path = "connected";
  })
}

function conpareDistances(current, unvisited) {
  isTop(current, unvisited);
  isRight(current, unvisited);
  isBottom(current, unvisited);
  isLeft(current, unvisited);
}

function removeCurrent(array) {
  array.forEach(function(element, i) {
    if(element.visited === "current") {
      element.visited = "visited";
    }
  })
}

function markPath() {
  console.log('mark path');
  let notInfinity = [];
  _store.grid.forEach(function(element, i){
    if(element.distance !== Infinity) {
      notInfinity.push(element);
    }
  })
  connectPath(notInfinity);
}

//checks if element is next to
function checkStart(elementX, elementY, startX, startY) {
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
  //get end grid and assign 
  let start = _store.grid.filter((obj => (obj.clicked === "start") ));

// console.log('start.x', start[0].x);
// console.log('start.y', start[0].y);
  let end = _store.grid.filter((obj => (obj.clicked === "end") ));
  // console.log('end', end);
  let counter = 0;
 // let adjacentItems = clickedItems.filter((obj => (obj.x ===  && obj.counter > counter ) ));
  let tempQ = [];

  let match = false;
  let notFound = true;

  while (match === false) {
  // ideally these should not be here but they ar elinked to 
    let clickedItems = _store.grid.filter((obj => (obj.clicked === "true" && obj.counter > counter ) ));

    let queue = _store.grid.filter((obj => (obj.counter === counter) ));

    console.log('clickedItems', clickedItems);
    //function isTop(current, unvisited) {
    queue.forEach(function(end, i) {
      // console.log('endy', end);
      clickedItems.forEach(function(element, i) {
        // console.log('element', element);
        // console.log('end', end);

        //top
        if(element.x === end.x && element.y + 1 === end.y ){
          element.counter = counter + 1;
          tempQ.push(element);
          console.log('element.id top', element);

          if (checkStart(element.x, element.y, start[0].x, start[0].y)) {
            notFound = false;
            match = true;
          }

        }

        //right
        if(element.x === end.x + 1 && element.y === end.y ){
          element.counter = counter + 1;
          tempQ.push(element);
          console.log('element.id right', element);

          if (checkStart(element.x, element.y, start[0].x, start[0].y)) {
            notFound = false;
            match = true;
          }
        }

        //bottom
        if(element.x === end.x && element.y - 1 === end.y ){
          element.counter = counter + 1;
          tempQ.push(element);
          console.log('element.id bottom', element);

          if (checkStart(element.x, element.y, start[0].x, start[0].y)) {
            match = true;
            notFound = false;
          }

        }

        //left
        if(element.x === end.x - 1 && element.y === end.y ){
          element.counter = counter + 1;
          tempQ.push(element);
          console.log('element.id left', element);

          if (checkStart(element.x, element.y, start[0].x, start[0].y)) {
            match = true;
            notFound = false;
          }
        }

      })
    })

    counter = counter + 1;
    console.log('counter', counter);
    console.log('match', match);
    // console.log('tempQ', tempQ);
    console.log('queue', queue);
    console.log('notFound', notFound);

    if (counter > 20) {
      match = true;
      notFound = true;
      console.log('end on 20 not found!!')
      console.log('notfound > 20', notFound);

    }

  }

  let recursion = true;
  let shortestPath = [];


  console.log('tempQ b4', tempQ);
  let adjacentItem = [];
 console.log('start', start);
  start[0].counter = counter + 1;
   console.log('start', start);

  adjacentItem.push(...start)
  console.log('adjacentItem', adjacentItem);
  // tempQ.push(...start);

  console.log('tempQ after', tempQ);
  console.log('shortestPath', shortestPath);

  // iterat though objects starting at counter
  // while (recursion === true && counter > 0) {
  //   //check  mactch first
  //   if(match && notFound === false) {
  //     // console.log('iterate through objects where counter === counter - create array - mark as path');

  //     //get array of items and find items that are near start use temp
  //     if(adjacentItem.length !== 0){

  //       tempQ.forEach(function(element, i){

  //         adjacentItem.forEach(function(item, j) {
  //           // top
  //          if(item.x === element.x && item.y === element.y - 1) {
  //             console.log('top');
  //                           console.log('top');

  //             if(element.counter === counter) {
  //                 console.log('top push');
  //                 console.log('element', element);

  //               tempRec.push(element);
  //             }
  //           }
  //           //right
  //          if(element.x - 1 === item.x && element.y == item.y) {
  //             console.log('right');
  //             if(element.counter === counter) {
  //                                 console.log('right push');

  //               tempRec.push(element);
  //             }          
  //           }

  //           //bottom
  //           if(element.x === item.x && element.y + 1  == item.y) {
  //             console.log('bottom');
  //             if(element.counter === counter) {
  //                                                 console.log('bottom push');

  //               tempRec.push(element);
  //             }          
  //           }
  //           //left
  //           if(element.x + 1 === item.x && element.y == item.y) {
  //             console.log('left');
  //             if(element.counter === counter) {
  //                                                                 console.log('left push');

  //               tempRec.push(element);
  //             }
  //           }
  //         })

  //       // )}
  //       //check if element exists that matches couter add here
  //       // if (element.counter === counter ) {
  //       //   shortestPath.push(element);
  //       //   if (tempQ.length > 0) {
  //       //     console.log('tempQ[i]', tempQ[i]);
  //       //     // console.log('tempQ[i] - 1', tempQ[i - 1 ]);
  //       //     shortestPath.forEach(function(item, j) {
  //       //       if(item.counter === counter) {
  //       //          console.log('item sp ', item);

  //       //       }
  //       //     })

  //       //   }
  //         // console.log('need to check if top, right, left botton of any existing node with counter -1');
  //         // shortestPath.forEach(function(item, j) {
  //         //   if (item.counter === counter + 1) {
  //         //     console.log('next to item', item.counter + 1);
  //         //     console.log('next to item', item);

  //         //     console.log('next to item x', item.x);
  //         //     console.log('next to item y', item.y);
  //         //     // if(shortestPath[j]).counter === shortestPath[j]).counter + 1 }
  //         //   }
  //         // })
  //       // }
  //     })
  //   }

  // }

  //   counter = counter -1;
  // }
  //Now, start at S (7) and go to the nearby cell with the lowest number (unchecked cells cannot be moved to). The path traced is (1,3,7) -> (1,4,6) -> (1,5,5) -> (1,6,4) -> (1,7,3) -> (1,8,2) -> (2,8,1) -> (3,8,0). In the event that two numbers are equally low (for example, if S was at (2,5)), pick a random direction – the lengths are the same. The algorithm is now complete.

  //goto start
  //start is array object
  //get start x, y
  console.log('start', start);
  let neighbours = [];
  console.log('neighbours', neighbours);
  //iterate over temp items
    //  if temp item  is neighbour
  // add to list of neighbours

  // run in neighbours is 0 i.e. only on first start
  while (recursion === true && counter > 0) {
  if (neighbours.length === 0) {

  tempQ.forEach(function(item, i){
                // top
     if(item.x === start[0].x && item.y === start[0].y - 1) {
        console.log('top');
                      console.log('top');

        if(item.counter === counter) {
            console.log('top push');
            console.log('item', item);

          neighbours.push(item);
        }
      }
      //right
     if(start[0].x - 1 === item.x && start[0].y === item.y) {
        console.log('right');
        if(item.counter === counter) {
                            console.log('right push');

          neighbours.push(item);
        }
      }

      //bottom
      if(start[0].x === item.x && start[0].y + 1  === item.y) {
        console.log('bottom');
        if(item.counter === item) {
                                            console.log('bottom push');

          neighbours.push(item);
        }          
      }
      //left
      if(start[0].x + 1 === item.x && start[0].y === item.y) {
        console.log('left');
        if(item.counter === counter) {
                                                            console.log('left push');

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
        lowestNumber = cell.counter;
      }
    })

  }

//used to select cell from next round
  let tempZ = [];
 if(neighbours.length !== 0){
    //take item with least count ....
    neighbours.forEach(function(cell, c) {
          console.log('shortest cell push');

      if (cell.counter === lowestNumber) {
        tempZ.push(cell);
      }

    })
  }

  // let newNeighBours = [];


   tempQ.forEach(function(item, i){
                // top
     if(item.x === tempZ[0].x && item.y === tempZ[0].y - 1) {
        console.log('top');
                      console.log('top');

        if(item.counter === counter) {
            console.log('top tempZ push');
            console.log('item tempZ', item);

          neighbours.push(item);
        }
      }
      //right
     if(tempZ[0].x - 1 === item.x && tempZ[0].y === item.y) {
        console.log('right');
        if(item.counter === counter) {
                            console.log('right tempZ push');

          neighbours.push(item);
        }
      }

      //bottom
      if(tempZ[0].x === item.x && tempZ[0].y + 1  === item.y) {
        console.log('bottom');
        if(item.counter === item) {
                                            console.log('bottom tempZ push');

          neighbours.push(item);
        }          
      }
      //left
      if(tempZ[0].x + 1 === item.x && tempZ[0].y === item.y) {
        console.log('left');
        if(item.counter === counter) {
                                                            console.log('left tempZ push');

          neighbours.push(item);
        }
      }

    })

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

  console.log('shortestPath', shortestPath);

  if(counter === 0 ** neighbours.length !== 0 ) {
            console.log("BINGO start");

    neighbours.forEach(function(neigh, n) {
      if(neigh.counter === 1 ) {
        console.log("BINGO");
        connectPath(neighbours)
      } else {
        console.log('Better luck next time');
      }
    })
    }
  }
}

function isDestinationVisited(array) {
  console.log('is destination');
  //compare element to see if it is eiter left right or top of end square
    array.forEach(function(element, i) {
      if(element.distance.x + 1 === (_store.end.x - _store.start.x) &&
        element.distance.y === (_store.end.y - _store.start.y)) {
        // markPath();
        console.log('is destination left');

        pathFinder();

      }

      if(element.distance.x === (_store.end.x - _store.start.x) &&
        element.distance.y -1 === (_store.end.y - _store.start.y)) {
        // markPath();
        console.log('is destination top');

        pathFinder();

      }

      if(element.distance.x === (_store.end.x - _store.start.x) && element.distance.y +1 === (_store.end.y - _store.start.y)) {
        // markPath();
        console.log('is destination bottom');

        pathFinder();

      }
  })

}

function isDestinationVisited2(array) {
  // console.log('is destination  2');
  //compare element to see if it is eiter left right or top of end square
    array.forEach(function(element, i) {
      if(element.x + 1 === _store.end.x && element.y === _store.end.y) {
        // markPath();
        console.log('is destination 2 left');

        pathFinder();

      }

      if(element.x === _store.end.x && element.y -1 === _store.end.y ) {
        // markPath();
        console.log('is destination 2 top');

        pathFinder();

      }

      if(element.x === _store.end.x && element.y +1 === _store.end.y) {
        // markPath();
        console.log('is destination 2 bottom');

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

function isTop(current, unvisited) {
  if (current.length !== 0) {
    unvisited.forEach(function(element, i) {
      if(element.x === current[0].x && element.y + 1 === current[0].y ){
        // console.log('element.id top', element);
        if(element.distance === Infinity) {
          element.distance = {'x': current[0].distance.x, 'y': current[0].distance.y - 1};
          isDestinationVisited(unvisited);
        }
      }
    })
  }
}

function isRight(current, unvisited) {
  if (current.length !== 0) {
    unvisited.forEach(function(element, i) {
      if(element.x === current[0].x + 1 && element.y === current[0].y ){
        // console.log('element.id right', element);
        if(element.distance === Infinity) {
          element.distance = {'x': current[0].distance.x + 1, 'y': current[0].distance.y};
          isDestinationVisited(unvisited);
        }
      }
    })
  }
}

function isBottom(current, unvisited) {
  if (current.length !== 0) {
    unvisited.forEach(function(element, i) {
      if(element.x === current[0].x && element.y - 1 === current[0].y ){
        // console.log('element.id bottom', element);
        if(element.distance === Infinity) {
          element.distance = {'x': current[0].distance.x, 'y': current[0].distance.y + 1};
          isDestinationVisited(unvisited);
        }
      }
    })
  }
}

function isLeft(current, unvisited) {
  if (current.length !== 0) {
    unvisited.forEach(function(element, i) {
      if(element.x === current[0].x - 1 && element.y === current[0].y ){
        // console.log('element.id left', element);
        if(element.distance === Infinity) {
          element.distance = {'x': current[0].distance.x - 1, 'y': current[0].distance.y};
        }
      }
    })
  }
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

      // console.log('unVisited', unVisited);

      // let visited = _store.grid.filter((obj => (obj.visited === "visited") ));
      // console.log('visited', visited);
      // current starts at start
      // let current = _store.grid.filter((obj => (obj.visited === "current") ));
      //else set current to to unvisted element that does not have distance set to infinity 
      // if (current.length === 0 ) {
      //   unVisited.forEach(function(element, i){
      //     if (element.distance !== Infinity) {
      //       current = [element];
      //       unVisited.splice(i,1);
      //     }
      //   })
      // }
      // if (current.length > 0 ) {
      //   current[0].visited = "current";
      // }

      let end = _store.grid.filter((obj => (obj.clicked === "end" && obj.visited !== "visited") ));

      // unVisited.push(...current);

      unVisited.push(...end);
      // conpareDistances(current, unVisited);
      // removeCurrent(unVisited);
      isDestinationVisited2(unVisited);


      GridsterStore.emit(CHANGE_EVENT);
    break;

    default:

      return true;
  }

});

export default GridsterStore;

