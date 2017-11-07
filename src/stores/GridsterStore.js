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
  editing: false,
  grid: [],
  x: 0,
  y: 0,
  selected: {'y': 0, 'x': 0}
};


console.log('_store', _store);

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
function dijkstra() {
  // Assign to every node a tentative distance value: set it to zero for our initial node and to infinity for all other nodes.
  // Set the initial node as current. Mark all other nodes unvisited. Create a set of all the unvisited nodes called the unvisited set.
  // For the current node, consider all of its neighbors and calculate their tentative distances. Compare the newly calculated tentative distance to the current assigned value and assign the smaller one. For example, if the current node A is marked with a distance of 6, and the edge connecting it with a neighbor B has length 2, then the distance to B (through A) will be 6 + 2 = 8. If B was previously marked with a distance greater than 8 then change it to 8. Otherwise, keep the current value.


}

function conpareDistances(current, unvisited) {
  console.log('unvisited', unvisited);
  // console.log('current[0].x)', current[0].x);
  // console.log('current[0].y', current[0].y);
  // console.log('unvisited.length', unvisited.length);

  //iterate over neighbours  and calculate distances 

  //step 3 inplement while loop

  // _store.grid.forEach(function(element, i) {
  //   if(element.clicked === "end" && element.visited === "unvisited") {
  //     console.log('connected!!!!');
  //   }
  //   else {
  //     console.log('not connected!!!!');
  //   }
  // })

  isTop(current, unvisited);
  isRight(current, unvisited);
  isBottom(current, unvisited);
  isLeft(current, unvisited);

  // figure out value for each - which is shorter?

  // so we are looking at neighbours
  // 
}

function removeCurrent(array) {
  array.forEach(function(element, i) {
    if(element.visited === "current") {
      element.visited = "visited";
    }
  })
}

function isDestinationVisited(array) {
    array.forEach(function(element, i) {
      if(element.clicked === "end" && element.visited === "visited") {
        console.log('The ENd');
        return true;
      } else {
        return false;
      }
  })

}
  function conpareDistancesNext(current, unvisited) {

  let neighbours = unvisited.filter(neighbour => neighbour.distance !== Infinity )
  console.log('neighbours', neighbours);
  neighbours.forEach(function(element, i) {
    // console.log('_store.end.x  - _store.start.x', _store.end.x - _store.start.x);
    // console.log('_store.end.y  - _store.start.x', _store.end.y - _store.start.y);

    // console.log('element.distance.x', element.distance.x);
    // console.log('element.distance.y', element.distance.y);

    // console.log('end - element.distance.x', _store.end.x - _store.start.x - element.distance.x);
    // console.log('end - element.distance.y', _store.end.y - _store.start.y - element.distance.y);
    console.log('x + y ', Math.abs(_store.end.x - _store.start.x - element.distance.x) + Math.abs(_store.end.y - _store.start.y - element.distance.y) )
  });



  // unvisited.forEach(function(element, i) {
  //   if(element.visited === "current") {
  //     console.log('element.visited', element.visited)
  //     unvisited.splice(i, 1);
  //   }
  // })
  console.log('unvisited 2 ', unvisited);

//If the destination node has been marked visited (when planning a route between two specific nodes) or 
//if the smallest tentative distance among the nodes in the unvisited set is infinity (when planning a complete traversal; occurs when there is no connection between the initial node and remaining unvisited nodes), then stop. The algorithm has finished.

  _store.grid.forEach(function(element, i) {
    if(element.clicked === "end" && element.visited === "visited") {
      console.log('connected!!!!');
    }
  })

  //Otherwise, select the unvisited node that is marked with the smallest tentative distance, set it as the new "current node", and go back to step 3.

  neighbours.forEach(function(element, i) {
    console.log('element', element);
      element.visited = "current";
  }) 

    isTop(current, unvisited);
  isRight(current, unvisited);
  isBottom(current, unvisited);
  isLeft(current, unvisited);

}

function xcoord(number) {
  return ( 1 + ((number%_store.columns)));
}

function ycoord(number) {
  return ( 1 + parseInt(number/_store.columns, 10));
}

function isTop(current, unvisited) {
  unvisited.forEach(function(element, i) {

          console.log('current.id top', current);
          console.log('current.id x top', current[0].x);

    if(element.x === current[0].x && element.y + 1 === current[0].y ){
      console.log('element.id top', element);
      if(element.distance === Infinity) {
        element.distance = {'x': current[0].distance.x, 'y': current[0].distance.y - 1};
      }
    }
  })
}

function isRight(current, unvisited) {
  unvisited.forEach(function(element, i) {
    if(element.x === current[0].x + 1 && element.y === current[0].y ){
      console.log('element.id right', element);
      if(element.distance === Infinity) {
        element.distance = {'x': current[0].distance.x + 1, 'y': current[0].distance.y};
      }
    }
  })
}

function isBottom(current, unvisited) {
  unvisited.forEach(function(element, i) {
    if(element.x === current[0].x && element.y - 1 === current[0].y ){
      console.log('element.id bottom', element);
      if(element.distance === Infinity) {
        element.distance = {'x': current[0].distance.x, 'y': current[0].distance.y + 1};
      }
    }
  })
}

function isLeft(current, unvisited) {
  unvisited.forEach(function(element, i) {
    if(element.x === current[0].x - 1 && element.y === current[0].y ){
      console.log('element.id left', element);
      if(element.distance === Infinity) {
        element.distance = {'x': current[0].distance.x - 1, 'y': current[0].distance.y};
      }
    }
  })
}

/*
  increments '_store.selected.x' and either increments or decrements '_store.selected.y'
  relative to _store.start.x and _store.start.y
  does not show relative to selected cell !
*/
function pathCount(array) {

  _store.selected.x = 0;
  _store.selected.y = 0;

  if (array.length > 0) {
    // clone array
    var copy = array.map(a => {return {...a}})

    array.forEach(function(element, i){
      // if right of start
      if (array[i].x -1 === _store.start.x && array[i].y === _store.start.y ) {
           array[i].flag = "right";
           _store.grid[i].flag = "right";
           _store.selected.x++;
      }
      if ((array[i].y + 1) === _store.start.y && array[i].x === _store.start.x ) {
          _store.grid[i].flag = "downy";
          array[i].flag = "downyy";

         _store.selected.y--;
      }
      if (array[i].y - 1 === _store.start.y && array[i].x === _store.start.x ) {
            // array[i].flag = "upy";
            // _store.grid[i].flag = "upy";
           _store.selected.y++;

      }
      if(array[i].x > 0 && array[i].x < _store.rows * _store.columns) {
       // iterate through and see if movement right

          if (copy.length > 0) {
            copy.forEach(function(elem, k){

            if((elem.x -1) === element.x && elem.y === element.y){
              _store.selected.x++;
            }
            // plus - retricted to 
            if((elem.y - 1) === element.y && elem.x === element.x && elem.y > _store.start.y){
              _store.selected.y++;
             }
             //minus
            if((elem.y + 1) === element.y && elem.x === element.x && elem.y < _store.start.y){
              _store.selected.y--;
            }

          })
        }
      }

    })

  // console.log('_store.selected', _store.selected);

  }

}

/*
  returns value if path is connected
  sets state/elment path to be either connected or null
*/

function calcPath(object){

  // paths = array of possible paths to top left bottom end
  let paths = [];
  if (object.length > 0) {

    // iterates over object and updated _store selected
    pathCount(object);

    // calculate values for possible valid paths
    // valed path is one that goes from start to end
    // one for each end point - may revise

    //calculate start point to left
    paths.push({'id':'centertoleft', 'x': (_store.end.x -1) - _store.start.x , 'y': _store.end.y - _store.start.y});

    //calculate top point to path if availab;le
    if (_store.end.y > 1){
      paths.push({'id':'top', 'x': _store.end.x - _store.start.x, 'y': (_store.end.y - 1) - _store.start.y});

    }
    //calculate bottom point path if to if available
    if (_store.end.y < _store.columns){
      paths.push({'id':'bottom', 'x':  _store.end.x - _store.start.x, 'y': (_store.end.y + 1) - _store.start.y});

    }

    // for each valid path
    // see if there is a match from selected paths 
    // if so change element.path state to "connected"

    // console.log('paths', paths);
    let count = 0;
    paths.forEach(function(element, i){
      //restricts to either rows or columns
      if(paths[i].x === _store.selected.x && paths[i].y === _store.selected.y) {
        count++;
        object.forEach((element, i) => {
          element.path = "connected";
      })
      }
    });

    if (count < 1) {
        _store.grid.forEach((element) => {
        element.path = null;
      })
    }

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
        newCells.push({'id': i, 'clicked' : "false", 'state': "initial", 'x' : xcoord(i), 'y': ycoord(i) , 'path': null, 'flag': false, 'distance': Infinity, 'visited': "unvisited"});
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

      console.log('_store.grid[startIndex]', _store.grid[startIndex]);
      GridsterStore.emit(CHANGE_EVENT);
    break;

    case GridsterConstants.GENERATE_END:

      let endRow = parseInt(Math.random()*_store.rows, 10);
      let endCell = endRow * _store.columns + (_store.columns -1);
      _store.end = {'id': endCell, 'x': xcoord(endCell), 'y': ycoord(endCell)};

      let endIndex = _store.grid.findIndex((obj => obj.id === parseInt(endCell, 10)));
      _store.grid[endIndex].clicked = "end";

      GridsterStore.emit(CHANGE_EVENT);
    break;

    case GridsterConstants.SHORT_PATH:

      // shortfilter marks all clicked items
      // this is initially the same as unvisited items + end item
      let shortFilter = _store.grid.filter((obj => obj.clicked === "true" ));
      //clone add
      let unVisited = _store.grid.filter((obj => (obj.clicked === "true" && obj.visited !== "visited" && obj.visited !== "current"  ) ));
      // console.log('unVisitedprepre ', unVisited);

      // current starts at statrt
      let current = _store.grid.filter((obj => (obj.visited === "current") ));
      console.log('current', current);
      if (current.length === 0 ) {
        console.log('current undefined - need to define')
        // if more than one item not infinity calculate shortest path
        //from items not marked as infinity or visited
        // or where distance has value  
        console.log('unVisited',unVisited);
        unVisited.forEach(function(element, i){
          if (element.distance !== Infinity) {
                        console.log('c element', element);

            console.log('current.visited', current.visited);
            current = [element];


            unVisited.splice(i,1);

          }
        })
      }
      current[0].visited = "current";
      console.log('current element pre', current);

      let end = _store.grid.filter((obj => (obj.clicked === "end" && obj.visited !== "visited") ));

      if(end === undefined) {
        console.log('end now');
      }
      console.log('un visited before', unVisited);
      unVisited.push(...current);
            console.log('un visited current', unVisited);

      unVisited.push(...end);
            console.log('un visited end', unVisited);

      // let unVisitedClone = unVisited.map(a => {return {...a}});

      // console.log('shortFilter', shortFilter);
      // console.log('unVisitedpre ', unVisited);
      //check current node 
      // let currentNode = _store.grid.filter((obj => obj.visited === "current"));
      // console.log('currentNode', currentNode);
      //compare distances 
      conpareDistances(current, unVisited);
      removeCurrent(unVisited);
      isDestinationVisited(unVisited);
      console.log('unvisted 3', unVisited);

      calcPath(shortFilter);


      GridsterStore.emit(CHANGE_EVENT);
    break;

    default:

      return true;
  }

});

export default GridsterStore;

