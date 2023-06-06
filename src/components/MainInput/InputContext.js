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
import { headingState } from "./inputs/inputOptions";
import { reauthenticateWithRedirect } from "firebase/auth";
export const input_context = createContext();

export function useInputs() {
  return useContext(input_context);
}

export const headingId = uuidv4();

const addElement = (state, action) => {
  const { selectedInput, id, parentId, index } = action.payload;

  if (index === undefined) {
    // return state.addToLast({ ...selectedInput, id, parentId });
    if (parentId) {
      const parentIndex = state.findIndex((e) => e.id === parentId);
      return [
        ...state.slice(0, parentIndex),
        { ...selectedInput, id, parentId },
        ...state.slice(parentIndex),
      ];
    }
    return [...state, { ...selectedInput, id, parentId }];
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
  const destination = newItems[dIndex + 1];
  let removed = newItems.splice(sIndex, 1);
  // get all children
  const childrenArr = newItems.filter((e) => e.parentId === draggableId);
  newItems = newItems.filter((e) => e.parentId !== draggableId);
  console.log(removed);
  console.log(sourceId, destinationId);
  // newItems.splice(dIndex, 0, removed);
  if (sourceId !== destinationId) {
    if (sIndex >= dIndex) {
      newItems.splice(dIndex, 0, removed);
    } else {
      newItems.splice(dIndex - 1, 0, removed);
    }
    newItems = newItems.map((e) =>
      e.id === draggableId ? { ...e, parentId: destinationId } : e
    );
  } else {
    newItems.splice(dIndex, 0, removed.concat(childrenArr));
  }

  const flatArray = newItems.flat();

  // find all the children of the current parent

  console.log("destination");
  console.log(destination);
  if (destination?.parentId) {
    // it is a child
    const children = flatArray.filter(
      (e) => e.parentId === destination.parentId
    );
    const parentIndex = flatArray.findIndex(
      (e) => e.id === destination.parentId
    );
    for (const child of children) {
      const index = flatArray.findIndex((e) => e.id === child.id);
      flatArray.splice(index, 1);
    }
    flatArray.splice(parentIndex, 0, ...children);
  }

  return flatArray;
};

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
