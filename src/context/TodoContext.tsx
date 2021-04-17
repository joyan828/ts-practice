import React, { useReducer, createContext, Dispatch } from 'react';

type TodoTypes = {
    id: number;
    text: string;
    done: boolean;
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
];



const CREATE = 'todo/CREATE';
const TOGGLE = 'todo/TOGGLE';
const REMOVE = 'todo/REMOVE';

// actions types
interface CreateAction {
    type: typeof CREATE;
    todo: TodoTypes
}

interface ToggleAction {
    type: typeof TOGGLE;
    id: number
}

interface RemoveAction {
    type: typeof REMOVE;
    id: number
}

// actions creators
export const create = (todo: TodoTypes): CreateAction => ({
    type: CREATE,
    todo
}); 

export const toggle = (id: number): ToggleAction => ({
    type: TOGGLE,
    id
}); 

export const remove = (id: number): RemoveAction => ({
    type: REMOVE,
    id
}); 

type TodoAction = 
    | CreateAction 
    | ToggleAction 
    | RemoveAction; 
    
type TodoState =  Readonly<TodoTypes[]>;

const initialState: TodoState = [];

// reducer 
function todoReducer(
    state: TodoState = initialState, 
    action: TodoAction
): TodoState {
    switch ( action.type ) {
        case CREATE :
            return state.concat(action.todo);
        case TOGGLE : 
            return state.map((todo: TodoTypes) => 
                todo.id === action.id 
                ? {
                    ...todo, 
                    done: !todo.done
                } 
                : todo
            );
        case REMOVE :
            return state.filter((todo: TodoTypes) => 
                todo.id !== action.id
            );
        default : 
            throw new Error(`Unhandled action type: ${ action }`);
    }
}

type TodoDispatch = Dispatch<TodoAction>

const TodoStateContext = createContext<TodoState | null>(null);
const TodoDispatchContext = createContext<TodoDispatch | null>(null)

export function TodoProvider({ children }: any) {
    const [ state, dispatch ] = useReducer(todoReducer, initialTodos)
    return (
        <TodoStateContext.Provider value={state}>
            <TodoDispatchContext.Provider value={dispatch}>
                {children}
            </TodoDispatchContext.Provider>
        </TodoStateContext.Provider>
    )
}