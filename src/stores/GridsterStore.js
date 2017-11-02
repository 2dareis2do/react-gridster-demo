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

function xcoord(number) {
  return ( 1 + ((number%_store.columns)));
}

function ycoord(number) {
  return ( 1 + parseInt(number/_store.columns, 10));
}


/* increment */
function pathCount(array) {

  _store.selected.x = 0;
  _store.selected.y = 0;

  if (array.length > 0) {
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
//returns value if path is connected
//sets state/elment path to be either connected or null
function calcPath(object){

  let paths = [];
  if (object.length > 0) {
    pathCount(object);

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
        newCells.push({'id': i, 'clicked' : "false", 'state': "initial", 'x' : xcoord(i), 'y': ycoord(i) , 'path': null, 'flag': false});
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

      let shortFilter = _store.grid.filter((obj => obj.clicked === "true"));

      calcPath(shortFilter);


      GridsterStore.emit(CHANGE_EVENT);
    break;

    default:

      return true;
  }

});

export default GridsterStore;

