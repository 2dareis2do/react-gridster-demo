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

console.log('start.x', start[0].x);
console.log('start.y', start[0].y);
  let end = _store.grid.filter((obj => (obj.clicked === "end") ));
  console.log('end', end);
  let counter = 0;

 // let adjacentItems = clickedItems.filter((obj => (obj.x ===  && obj.counter > counter ) ));
  let tempQ = [];

  let match = false;


while (match === false) {
  // ideally these should not be here but they ar elinked to 
  let clickedItems = _store.grid.filter((obj => (obj.clicked === "true" && obj.counter > counter ) ));
  let queue = _store.grid.filter((obj => (obj.counter === counter) ));
  console.log('queue', queue);

  console.log('clickedItems', clickedItems);
  //function isTop(current, unvisited) {
  queue.forEach(function(end, i) {
    console.log('endy', end);
    clickedItems.forEach(function(element, i) {
      console.log('element', element);
      console.log('end', end);

      //top
      if(element.x === end.x && element.y + 1 === end.y ){
        element.counter = counter + 1;
        tempQ.push(element);
        console.log('element.id top', element);

        if (checkStart(element.x, element.y, start[0].x, start[0].y)) {
          match = true;
        }

      }

      //right
      if(element.x === end.x + 1 && element.y === end.y ){
        element.counter = counter + 1;
        tempQ.push(element);
        console.log('element.id right', element);

        if (checkStart(element.x, element.y, start[0].x, start[0].y)) {
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
        }

      }

      //left
      if(element.x === end.x - 1 && element.y === end.y ){
        element.counter = counter + 1;
        tempQ.push(element);
        console.log('element.id left', element);

        if (checkStart(element.x, element.y, start[0].x, start[0].y)) {
          match = true;
        }
      }



    })
  })

  counter = counter + 1;
  console.log('counter', counter);
  console.log('match', match);
  console.log('tempQ', tempQ);

  if (counter > 20) {
    match = true; 
    console.log('end on 20')
  } 

  }

}

function isDestinationVisited(array) {
  //compare element to see if it is eiter left right or top of end square
    array.forEach(function(element, i) {
      if(element.distance.x + 1 === (_store.end.x - _store.start.x) &&
        element.distance.y === (_store.end.y - _store.start.y)) {
        markPath();
        pathFinder();

      }

      if(element.distance.x === (_store.end.x - _store.start.x) &&
        element.distance.y -1 === (_store.end.y - _store.start.y)) {
        markPath();
        pathFinder();

      }

      if(element.distance.x === (_store.end.x - _store.start.x) && element.distance.y +1 === (_store.end.y - _store.start.y)) {
        markPath();
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


      // let visited = _store.grid.filter((obj => (obj.visited === "visited") ));
      // console.log('visited', visited);
      // current starts at start
      let current = _store.grid.filter((obj => (obj.visited === "current") ));
      //else set current to to unvisted element that does not have distance set to infinity 
      if (current.length === 0 ) {
        unVisited.forEach(function(element, i){
          if (element.distance !== Infinity) {
            current = [element];
            unVisited.splice(i,1);
          }
        })
      }
      if (current.length > 0 ) {
        current[0].visited = "current";
      }

      // let end = _store.grid.filter((obj => (obj.clicked === "end" && obj.visited !== "visited") ));

      unVisited.push(...current);

      // unVisited.push(...end);
      // console.log('unVisited', unVisited);
      conpareDistances(current, unVisited);
      removeCurrent(unVisited);
      isDestinationVisited(unVisited);


      GridsterStore.emit(CHANGE_EVENT);
    break;

    default:

      return true;
  }

});

export default GridsterStore;

