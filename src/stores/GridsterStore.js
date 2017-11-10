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
    console.log('checkstart top');
    return true;
  }
}

function checkRight(x, y, targetX, targetY){
  if(x === targetX + 1 && y === targetY ){
    console.log('checkstart right');
    return true;
  }
}

function checkBottom(x, y, targetX, targetY){
  if(x === targetX && y - 1 === targetY ){
    console.log('checkstart bottom');
    return true;
  }
}

function checkLeft(x, y, targetX, targetY){
  if(x === targetX - 1 && y === targetY ){
    console.log('checkstart left');
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
  if(checkTop(cellX, cellY, startX, startY)) {
    return true;
  }
  //right
  if(checkRight(cellX, cellY, startX, startY)) {
    return true;
  }
  //bottom
  if(checkBottom(cellX, cellY, startX, startY)) {
    return true;
  }
  // left
  if(checkLeft(cellX, cellY  , startX, startY)) {
    return true;
  }
}

// function test() {
//   let data = _store.grid.filter((obj => (obj.counter !== Infinity && obj.clicked !== "end") ));

//   console.log('test data', data)
// }

/* 
  iterates through @unvisited cells 
  starting at @end cell tries to iterate through until it is next to @start cell
  does so increntally 
  i.e. 0, 0+1, 0+1+1, 0+1+1+1 
  until count item is next to end
  || if not available i.e cell end is not end, and none other available return
*/
function isPath(unvisited, end, start) {
  console.log('pathfinder');

  let counter = 0;
  let countedCells = [];

  let match = false;
  let next = true;
  // let notFound = true;

  while (match === false && next === true) {

    /*
        ideally these should not be here but they are linked to 
        i.e. those set to infinity or counted elsewhere with a higher value
    */

    let uncountedItems = unvisited.filter((obj => (obj.counter > counter) ));
    // console.log('uncountedItems', uncountedItems);
    if(uncountedItems.length === 0) {
      next = false;
    }
    //queue is array object where counter = counter 
    let matchedItems = _store.grid.filter((obj => (obj.counter === counter) ));
      // console.log('matchedItems', matchedItems);

    if (matchedItems.length > 1) {
      console.log('matched items more than one');
      console.log('matchedItems', matchedItems);
    }

    if(matchedItems.length !== 0 && start.length !== 0 && uncountedItems.length !== 0) {

      matchedItems.forEach(function(matchCell, i) {
        //iterate through start array
        //only one item
        start.forEach(function(startCell, s) {

          uncountedItems.forEach(function(element, j) {
            if(checkTop(element.x, element.y, matchCell.x, matchCell.y)) {
              element.counter = counter + 1;
              countedCells.push(element);
              if (checkStart(element.x, element.y, startCell.x, startCell.y)) {
                match = true;
              }
            }

            //right
            if(checkRight(element.x, element.y, matchCell.x, matchCell.y)) {
              element.counter = counter + 1;
              countedCells.push(element);
              if (checkStart(element.x, element.y, startCell.x, startCell.y)) {
                match = true;
              }
            }

            //bottom
            if(checkBottom(element.x, element.y, matchCell.x, matchCell.y)) {
              element.counter = counter + 1;
              countedCells.push(element);
              if (checkStart(element.x, element.y, startCell.x, startCell.y)) {
                match = true;
              }
            }

            //left
            if(checkLeft(element.x, element.y, matchCell.x, matchCell.y)) {
              element.counter = counter + 1;
              countedCells.push(element);
              if (checkStart(element.x, element.y, startCell.x, startCell.y)) {
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

  if (match === true ) {
    return true;
  }
}

function pathFinder(unvisited, end, start) {
 
  console.log('pathfinder');
  if (isPath(unvisited, end, start)) {
    console.log('ready to find sharoertest path!!')
  }  
  // let counter = 0;
  // let countedCells = [];
  // console.log('countedCells', countedCells);

  // let match = false;
  // let next = true;
  // let notFound = true;

  // while (match === false && next === true) {

  //   /*
  //       ideally these should not be here but they are linked to 
  //       i.e. those set to infinity or counted elsewhere with a higher value
  //   */

  //   let uncountedItems = unvisited.filter((obj => (obj.counter > counter) ));
  //   // console.log('uncountedItems', uncountedItems);
  //   if(uncountedItems.length === 0) {
  //     next = false;
  //   }
  //   //queue is array object where counter = counter 
  //   let matchedItems = _store.grid.filter((obj => (obj.counter === counter) ));
  //     // console.log('matchedItems', matchedItems);

  //   if (matchedItems.length > 1) {
  //     console.log('matched items more than one');
  //     console.log('matchedItems', matchedItems);
  //   }

  //   if(matchedItems.length !== 0 && start.length !== 0 && uncountedItems.length !== 0) {

  //     matchedItems.forEach(function(matchCell, i) {
  //       //iterate through start array
  //       //only one item
  //       start.forEach(function(startCell, s) {

  //         uncountedItems.forEach(function(element, j) {
  //           if(checkTop(element.x, element.y, matchCell.x, matchCell.y)) {
  //             element.counter = counter + 1;
  //             countedCells.push(element);
  //             if (checkStart(element.x, element.y, startCell.x, startCell.y)) {
  //               match = true;
  //             }
  //           }

  //           //right
  //           if(checkRight(element.x, element.y, matchCell.x, matchCell.y)) {
  //             element.counter = counter + 1;
  //             countedCells.push(element);
  //             if (checkStart(element.x, element.y, startCell.x, startCell.y)) {
  //               match = true;
  //             }
  //           }

  //           //bottom
  //           if(checkBottom(element.x, element.y, matchCell.x, matchCell.y)) {
  //             element.counter = counter + 1;
  //             countedCells.push(element);
  //             if (checkStart(element.x, element.y, startCell.x, startCell.y)) {
  //               match = true;
  //             }
  //           }

  //           //left
  //           if(checkLeft(element.x, element.y, matchCell.x, matchCell.y)) {
  //             element.counter = counter + 1;
  //             countedCells.push(element);
  //             if (checkStart(element.x, element.y, startCell.x, startCell.y)) {
  //               match = true;
  //             }
  //           }

  //         })
  //       })
  //   })

  //   // console.log('queue', queue);
  //   counter = counter + 1;

  //  }

  // }

  // test();

   // console.log('countedCells list of all visited cells after been counted', countedCells);


  // console.log('notFound', notFound);
  // console.log('counter', counter);
  // console.log('match', match);

  // let recursion = true;

  // console.log('start', start);
  let countedCells = _store.grid.filter((obj => (obj.counter !== Infinity && obj.clicked !== "end") ));
  console.log('countedCells', countedCells);
  /// get max value of counter in data
  let counter = 0;
  countedCells.forEach(function(count) {
    if(count.counter > counter) {
      counter = count.counter;
    }
  })
  // i.e. if count - 8 from end make start.counter = 9
  start[0].counter = counter + 1;

  //Now, start at S (7) and go to the nearby cell with the lowest number (unchecked cells cannot be moved to). The path traced is (1,3,7) -> (1,4,6) -> (1,5,5) -> (1,6,4) -> (1,7,3) -> (1,8,2) -> (2,8,1) -> (3,8,0). In the event that two numbers are equally low (for example, if S was at (2,5)), pick a random direction – the lengths are the same. The algorithm is now complete.
  let match = true;
  let neighbours = [];

  // run in neighbours is 0 i.e. only on first start complete and match === true
  if(match === true) {

    while (counter > 0) {

      if (neighbours.length === 0 && start.length !== 0 && countedCells.length !== 0) {
       //iterate through start array - should only be one 
        start.forEach(function(startCell, s) {

          countedCells.forEach(function(item, i){
             // top
            if(checkTop(item.x, item.y, startCell.x, startCell.y)) {
              if(item.counter === counter) {
                console.log('top push countedCells');
                neighbours.push(item);
              }
            }
            //right
            if(checkRight(item.x, item.y, startCell.x, startCell.y)) {
              if(item.counter === counter) {
                console.log('right push countedCells');
                neighbours.push(item);
              }
            }
            //bottom
            if(checkBottom(item.x, item.y, startCell.x, startCell.y)) {
              if(item.counter === counter) {
                console.log('bottom push countedCells');
                neighbours.push(item);
              }
            }
            //left
            if(checkLeft(item.x, item.y, startCell.x, startCell.y)) {
              if(item.counter === counter) {
                console.log('left push countedCells');
                neighbours.push(item);
              }
            }

          })
        })
      }

      console.log('neighbours after start reversal', neighbours);

      let lowestNumber = Infinity;
      //get neighboure

      //  for each neighbour take the loweset count ...
      if(neighbours.length !== 0){
        // console.log('gt 1 !');
        neighbours.forEach(function(cell, c){
          if (cell.counter < lowestNumber) {
            // console.log('cell.counter', cell.counter);
            lowestNumber = cell.counter;
          }
        })
      }

      console.log('lowestNumber afer iterating though neighbours', lowestNumber);

      // container for lowest items
      let nextLowest = [];
      if(neighbours.length !== 0){
        //take item with least count ....
        neighbours.forEach(function(cell, c) {
          if (cell.counter === lowestNumber) {
            console.log('shortest cell push inside', c);
            nextLowest.push(cell);
          }
        })
      }

      if(nextLowest.length > 1) {
        console.log('nextLowest bigger than one ', nextLowest);
      }
      if (nextLowest.length !==0 && countedCells.length !==0) {

        countedCells.forEach(function(item){

          nextLowest.forEach(function(nextItem){
            // top
            if(checkTop(item.x, item.y, nextItem.x, nextItem.y)) {
              if(item.counter === counter) {
                // console.log('top tempZ push');
                // console.log('item countedCells push', item);
                neighbours.push(item);
              }
            }
            //left
            if(checkLeft(item.x, item.y, nextItem.x, nextItem.y)) {
              if(item.counter === counter) {
                // console.log('right countedCells push');
                neighbours.push(item);
              }
            }
            //bottom
            if(checkBottom(item.x, item.y, nextItem.x, nextItem.y)) {
              if(item.counter === counter) {
                // console.log('bottom countedCells push');
                neighbours.push(item);
              }
            }
            //right
            if(checkRight(item.x, item.y, nextItem.x, nextItem.y)) {
              if(item.counter === counter) {
                // console.log('left countedCells push');
                neighbours.push(item);
              }
            }

          })
        })

      }

      // from neighboure 
      console.log('lowestNumber after', lowestNumber);

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
          } 
         //  else {
         //    console.log('neigh', neigh.counter);
         //    console.log('Better luck next time');
         // //   connectPath(neighbours)
         //  }
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

