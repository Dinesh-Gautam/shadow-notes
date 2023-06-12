// import React, {
//   createContext,
//   useContext,
//   useEffect,
//   useReducer,
//   useRef,
//   useState,
// } from "react";
// import { v4 as uuidv4 } from "uuid";
// import { useData } from "../../context/DatabaseContext";
// import { serverTimestamp } from "firebase/firestore";
// import { headingState } from "./inputs/inputOptions";
// import { reauthenticateWithRedirect } from "firebase/auth";
// export const input_context = createContext();

// export function useInputs() {
//   return useContext(input_context);
// }

// class NodeItem extends Object {
//   constructor(value, prevId, nextId) {
//     super(value);
//     Object.assign(this, value);
//     this.prevId = prevId || null;
//     this.nextId = nextId || null;
//   }
// }

// class List extends Array {
//   constructor(initialValue) {
//     super(new NodeItem(initialValue));
//   }

//   addToLast(value) {
//     // change the nextId of the last item to this new node id
//     this[this.length - 1].nextId = value.id;
//     // add at the end
//     this.push(new NodeItem(value, this[this.length - 1].id, null));
//     return this;
//   }

//   findInList(id) {
//     if (!id) return undefined;
//     return this.find((e) => e.id === id);
//   }

//   findIndexInList(id) {
//     if (!id) return undefined;
//     return this.findIndex((e) => e.id === id);
//   }

//   remove(id) {
//     const itemToBeRemoved = this.findInList(id);
//     const prevNode = this.findIndexInList(itemToBeRemoved.prevId);
//     const nextNode = this.findIndexInList(itemToBeRemoved.nextId);

//     if (prevNode !== undefined) {
//       this[prevNode].nextId = itemToBeRemoved.nextId;
//     }
//     if (nextNode !== undefined) {
//       this[nextNode].prevId = itemToBeRemoved.prevId;
//     }

//     return this.filter((e) => e.id !== id);
//   }

//   get(value) {
//     return this.indexOf(value);
//   }
// }

// export const headingId = uuidv4();

// const addElement = (state, action) => {
//   const { selectedInput, id, parentId, index } = action.payload;

//   if (index === undefined) {
//     return state.addToLast({ ...selectedInput, id, parentId });
//     // return [...state, { ...selectedInput, id, parentId }];
//   } else {
//     return [
//       ...state.slice(0, index),
//       { ...selectedInput, id, parentId },
//       ...state.slice(index),
//     ];
//   }
// };

// const removeElement = (state, action) => {
//   const id = action.payload.id;
//   const elementsToRemove = state.filter(
//     (e) => e.parentId === id || e.id === id
//   );
//   let newState;
//   elementsToRemove.forEach((element) => {
//     newState = state.remove(element.id);
//   });
//   return newState;
// };

// const changeInputValue = (state, action) => {
//   const { id, value, isLabel, isLink } = action.payload;

//   if (isLabel) {
//     return state.map((e) =>
//       e.id === id ? { ...e, state: { ...e.state, labelValue: value } } : e
//     );
//   }

//   if (isLink) {
//     const { valueName } = action.payload;
//     return state.map((e) =>
//       e.id === id ? { ...e, state: { ...e.state, valueName } } : e
//     );
//   }

//   return state.map((e) =>
//     e.id === id ? { ...e, state: { ...e.state, value } } : e
//   );
// };

// const onDragEnd = (state, action) => {
//   const { sIndex, dIndex, destinationId, sourceId, draggableId } =
//     action.payload;

//   // let newItems = [...state];
//   // let removed = newItems.splice(sIndex, 1);
//   // // get all children
//   // const childrenArr = newItems.filter((e) => e.parentId === draggableId);
//   // newItems = newItems.filter((e) => e.parentId !== draggableId);
//   // console.log(removed);
//   // console.log(sourceId, destinationId);
//   // // newItems.splice(dIndex, 0, removed);
//   // if (sourceId !== destinationId) {
//   //   if (sIndex >= dIndex) {
//   //     newItems.splice(dIndex, 0, removed);
//   //   } else {
//   //     newItems.splice(dIndex - 1, 0, removed);
//   //   }
//   //   newItems = newItems.map((e) =>
//   //     e.id === draggableId ? { ...e, parentId: destinationId } : e
//   //   );
//   // } else {
//   //   newItems.splice(dIndex, 0, removed.concat(childrenArr));
//   // }

//   // return newItems.flat();
// };

// const setInputs = (state, action) => {
//   switch (action.type) {
//     case "addElement":
//       return addElement(state, action);
//     case "removeElement":
//       return removeElement(state, action);
//     case "changeInputValue":
//       return changeInputValue(state, action);
//     case "onDragEnd":
//       return onDragEnd(state, action);
//     // case "localStorage":
//     //   return action.payload;
//     // case "clear":
//     //   return initialState;
//     default:
//       return state;
//   }
// };

// export function InputContext(props) {
//   const [inputFocusId, setInputFocusId] = useState(null);
//   const initialState = new List({ ...headingState, id: uuidv4() });

//   const [inputs, inputsDispatch] = useReducer(setInputs, initialState);

//   const value = {
//     inputs,
//     inputsDispatch,
//     inputFocusId,
//     setInputFocusId,
//   };
//   return (
//     <input_context.Provider value={value}>
//       {props.children}
//     </input_context.Provider>
//   );
// }

import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { v4 as uuidv4 } from "uuid";
import { useData } from "../../context/DatabaseContext";
import { serverTimestamp } from "firebase/firestore";
import { headingState, input } from "./inputs/inputOptions";
import { reauthenticateWithRedirect } from "firebase/auth";
export const input_context = createContext();

export function useInputs() {
  return useContext(input_context);
}

export const headingId = uuidv4();

const addElement = (state, action) => {
  const { selectedInput, id, parentId, index } = action.payload;

  if (index === undefined) {
    // return state.addToLast({ ...selectedInput, id, parentId })
    return sortArray([...state, { ...selectedInput, id, parentId }]);
  } else {
    return [
      ...state.slice(0, index),
      { ...selectedInput, id, parentId },
      ...state.slice(index),
    ];
  }
};

const removeElement = (state, action) => {
  const { id } = action.payload;
  return state.filter((e) => e.id !== id && e.parentId !== id);
};

const changeInputValue = (state, action) => {
  const { id, value, isLabel, isLink } = action.payload;

  if (isLabel) {
    return state.map((e) =>
      e.id === id ? { ...e, state: { ...e.state, labelValue: value } } : e
    );
  }

  if (isLink) {
    const { valueName } = action.payload;
    return state.map((e) =>
      e.id === id ? { ...e, state: { ...e.state, valueName } } : e
    );
  }

  return state.map((e) =>
    e.id === id ? { ...e, state: { ...e.state, value } } : e
  );
};

const onDragEnd = (state, action) => {
  const { sIndex, dIndex, destinationId, sourceId, draggableId } =
    action.payload;

  let newItems = [...state];

  console.log(sourceId, destinationId);
  console.log(draggableId);
  // newItems.splice(dIndex, 0, removed);
  if (sourceId !== destinationId) {
    let removed = newItems.splice(sIndex, 1)[0];

    if (sIndex >= dIndex) {
      newItems.splice(dIndex, 0, removed);
    } else {
      newItems.splice(dIndex - 1, 0, removed);
    }
    newItems = newItems.map((e) =>
      e.id === draggableId ? { ...e, parentId: destinationId } : e
    );
  } else {
    // remove all children
    const selected = newItems.find((e) => e.id === draggableId);
    if (selected.parentId) {
      let removed = newItems.splice(sIndex, 1)[0];
      newItems.splice(dIndex, 0, removed);
    } else {
      const childrenArray = [];
      // todo : don't hardcode the heading name, check if the input is moveable or not same for the input body file
      const nonMoveableLength = newItems.filter(
        (e) => e.name === input.heading
      ).length;
      newItems = newItems
        .map((e) => {
          if (e.parentId) {
            childrenArray.push(e);
            return null;
          } else {
            return e;
          }
        })
        .filter((e) => e);

      console.log(newItems);
      let removed = newItems.splice(sIndex + nonMoveableLength, 1)[0];
      newItems.splice(dIndex + nonMoveableLength, 0, removed);
      newItems.push(childrenArray);
    }
  }

  const flatArray = newItems.flat();

  return sortArray(flatArray);
};

function sortArray(array) {
  const copyArray = [...array];
  const sortedParents = [];
  for (let ele of copyArray) {
    if (ele.parentId) {
      // it is a child
      const splicedChildren = [];
      // get parent index
      const parentIndex = copyArray.findIndex((e) => e.id === ele.parentId);
      // get siblings
      const children = copyArray.filter((e) => e.parentId === ele.parentId);
      for (let child of children) {
        const childIndex = copyArray.findIndex((e) => e.id === child.id);
        splicedChildren.push(copyArray.splice(childIndex, 1)[0]);
      }
      copyArray.splice(parentIndex + 1, 0, ...splicedChildren);
      sortedParents.push(ele.parentId);
    }
  }

  console.log(copyArray);
  return copyArray.flat();
}

const setInputs = (state, action) => {
  switch (action.type) {
    case "addElement":
      return addElement(state, action);
    case "removeElement":
      return removeElement(state, action);
    case "changeInputValue":
      return changeInputValue(state, action);
    case "onDragEnd":
      return onDragEnd(state, action);
    // case "localStorage":
    //   return action.payload;
    // case "clear":
    //   return initialState;
    default:
      return state;
  }
};

export function InputContext(props) {
  const [inputFocusId, setInputFocusId] = useState(null);
  const initialState = [{ ...headingState, id: uuidv4() }];

  const [inputs, inputsDispatch] = useReducer(setInputs, initialState);

  const value = {
    inputs,
    inputsDispatch,
    inputFocusId,
    setInputFocusId,
  };
  return (
    <input_context.Provider value={value}>
      {props.children}
    </input_context.Provider>
  );
}
