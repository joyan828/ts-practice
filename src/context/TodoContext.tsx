import React, { useReducer } from 'react';

type InitialTodos = {
    id: number,
    text: string,
    done: boolean 
}

const initialTodos = [
    {
        id: 1,
        text: '프로젝트 생성하기',
        done: true
    },
    {
        id: 2,
        text: '프로젝트 스타일링하기',
        done: true
    },
    {
        id: 3,
        text: 'Context 만들기',
        done: false
    },
    {
        id: 4,
        text: '기능 구현하기',
        done: false
    },
]

// action types 

const CREATE = 'CREATE';
const TOGGLE = 'TOGGLE';
const REMOVE = 'REMOVE';

// actions creators
export const create = (todo: InitialTodos) => ({
    type: CREATE,
    todo
}); 

export const toggle = (todo: InitialTodos) => ({
    type: TOGGLE,
    todo
}); 

export const remove = (todo: InitialTodos) => ({
    type: REMOVE,
    todo
}); 

type TodoAction = 
    | ReturnType<typeof create> 
    | ReturnType<typeof toggle> 
    | ReturnType<typeof remove> 
    
type TodoState = {
    state : InitialTodos[]
}

const initialState: TodoState = {
    state: []
}

function todoReducer(state: TodoState = initialState, action: TodoAction){
    switch ( action.type ) {
        case 'CREATE' :
            return state.concat(action.todo);
        case 'TOGGLE' : 
            return state.map((todo: InitialTodos) => 
                todo.id === action.id 
                ? {
                    ...todo, 
                    done: !todo.done
                } 
                : todo
            );
        case 'REMOVE' :
            return state.filter((todo: InitialTodos) => 
                todo.id !== action.id
            );
        default : 
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

export function TodoProvider({ children }) {
    const [ state, dispatch ] = useReducer(todoReducer, initialTodos)
    return children;
}