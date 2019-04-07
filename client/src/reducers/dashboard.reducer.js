import { CREATE_PROCESS, CREATE_PROCESS_START, CREATE_PROCESS_ERROR, CREATE_TASK, CREATE_TASK_ERROR, CREATE_TASK_START, DELETE_PROCESS, DELETE_PROCESS_START, DELETE_PROCESS_ERROR, EDIT_PROCESS, EDIT_PROCESS_START, EDIT_PROCESS_ERROR, DELETE_TASK, DELETE_TASK_START, DELETE_TASK_ERROR, EDIT_TASK, EDIT_TASK_START, EDIT_TASK_ERROR, GET_BOARD, GET_BOARD_START, GET_BOARD_ERROR, GET_USER_BOARD, GET_USER_BOARD_START, GET_USER_BOARD_ERROR, EDIT_BOARD, EDIT_BOARD_START, EDIT_BOARD_ERROR, CREATE_BOARD, CREATE_BOARD_START, CREATE_BOARD_ERROR, DELETE_BOARD, DELETE_BOARD_START, DELETE_BOARD_ERROR } from "../actions/action-types";
import { capitalize } from "../config";

const initialState = {
  boards: [],
  particularBoard: {},
  loading: false,
  error: "",
  message: "",
  boardCount: 0,
  getBoards: false,
  getBoard: false
};

const dashboard = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_BOARD_START:
      return {
        ...state,
        loading: true,
        message: action.payload,
        error: "",
        getBoards: true
      };
    case GET_USER_BOARD:
      return {
        ...state,
        boards: action.payload.boards,
        particularBoard: {},
        loading: false,
        message: "",
        error: "",
        boardCount: action.payload.count,
        getBoards: false
      };
    case GET_USER_BOARD_ERROR:
      return {
        ...state,
        particularBoard: {},
        loading: false,
        message: "",
        error: action.payload,
        getBoards: false
      };
    case GET_BOARD_START:
      return {
        ...state,
        loading: true,
        message: action.payload,
        error: "",
        getBoard: true
      };
    case GET_BOARD:
      return {
        ...state,
        particularBoard: action.payload.board,
        loading: false,
        message: action.payload.message,
        error: "",
        getBoard: false
      };
    case GET_BOARD_ERROR:
      return {
        ...state,
        loading: false,
        message: "",
        error: action.payload,
        getBoard: false
      };
    case CREATE_BOARD_START:
      return {
        ...state,
        loading: true,
        message: action.payload.message,
        error: ""
      };
    case CREATE_BOARD:
      return {
        ...state,
        boards: [...state.boards, action.payload.board],
        loading: false,
        message: action.payload.message,
        error: ""
      };
    case CREATE_BOARD_ERROR:
      return {
        ...state,
        loading: false,
        message: "",
        error: action.payload
      };
    case EDIT_BOARD_START:
      return {
        ...state,
        particularBoard: { ...state.particularBoard, name: capitalize(action.payload.details.name) },
        message: action.payload.message,
        error: ""
      };
    case EDIT_BOARD:
      return {
        ...state,
        message: action.payload.message,
        error: ""
      };
    case EDIT_BOARD_ERROR:
      return {
        ...state,
        message: "",
        error: action.payload
      };
    case DELETE_BOARD_START:
      let updatedBoard = state.boards.filter(board => board._id !== action.payload.boardId);

      return {
        ...state,
        boards: updatedBoard,
        message: action.payload.message,
        error: ""
      };
    case DELETE_BOARD:
      return {
        ...state,
        message: action.payload.message,
        error: ""
      };
    case DELETE_BOARD_ERROR:
      return {
        ...state,
        message: "",
        error: action.payload
      };
    case CREATE_PROCESS_START:
      return {
        ...state,
        loading: true,
        error: "",
        message: action.payload
      };
    case CREATE_PROCESS:
      return {
        ...state,
        particularBoard: { ...state.particularBoard, processes: [...state.particularBoard.processes, action.payload.process] },
        loading: false,
        message: action.payload.message,
        error: ""
      };
    case CREATE_PROCESS_ERROR:
      return {
        ...state,
        loading: false,
        message: "",
        error: action.payload
      };
    case DELETE_PROCESS_START:
      return {
        ...state,
        error: "",
        message: action.payload.message,
        particularBoard: { ...state.particularBoard, processes: state.particularBoard.processes.filter(process => process._id !== action.payload.processId) }
      };
    case DELETE_PROCESS:
      return {
        ...state,
        message: action.payload.message,
        error: ""
      };
    case DELETE_PROCESS_ERROR:
      return {
        ...state,
        message: "",
        error: action.payload
      };
    case EDIT_PROCESS_START:
      let processes = [...state.particularBoard.processes];
      processes = processes.map(process => {
        if (process._id === action.payload.processId) {
          process.title = capitalize(action.payload.details.title);
        }

        return process;
      });

      return {
        ...state,
        particularBoard: { ...state.particularBoard, processes },
        message: action.payload.message,
        error: ""
      };
    case EDIT_PROCESS:
      return {
        ...state,
        message: action.payload.message,
        error: ""
      };
    case EDIT_PROCESS_ERROR:
      return {
        ...state,
        error: action.payload,
        message: ""
      };
    case CREATE_TASK_START:
      return {
        ...state,
        loading: true,
        message: action.payload,
        error: ""
      };
    case CREATE_TASK:
      // update the task accordingly
      let newProcess = [...state.particularBoard.processes];
      newProcess = newProcess.map(process => {
        if (process._id === action.payload.process._id) {
          process.tasks = [...process.tasks, action.payload.task];
        }

        return process;
      });

      return {
        ...state,
        particularBoard: { ...state.particularBoard, processes: newProcess },
        loading: false,
        message: action.payload.message,
        error: ""
      };
    case CREATE_TASK_ERROR:
      return {
        ...state,
        loading: false,
        message: "",
        error: action.payload
      };
    case DELETE_TASK_START:
      let updatedProcess = [...state.particularBoard.processes];
      updatedProcess = updatedProcess.map(process => {
        if (process._id === action.payload.processId) {
          process.tasks = process.tasks.filter(task => task._id !== action.payload.taskId);
        }

        return process;
      });
      return {
        ...state,
        particularBoard: { ...state.particularBoard, processes: updatedProcess },
        message: action.payload.message,
        error: ""
      };
    case DELETE_TASK:
      return {
        ...state,
        message: action.payload.message,
        error: ""
      };
    case DELETE_TASK_ERROR:
      return {
        ...state,
        message: "",
        error: action.payload
      };
    case EDIT_TASK_START:
      let processChange = [...state.particularBoard.processes];
      let tasks = [];

      state.particularBoard.processes.map(process => {
        //get all the tasks in any given board
        tasks.push(...process.tasks);
        return process;
      });

      tasks.map(task => {
        if (task._id === action.payload.taskId) {
          const oldProcess = task.process;
          processChange = processChange.map(process => {
            if (process._id === oldProcess) {
              process.tasks = process.tasks.filter(task => task._id !== action.payload.taskId);
            }

            if (process._id === action.payload.processId) {
              task.process = action.payload.processId;
              process.tasks.push(task);
            }

            return process;
          });
        }
      });

      return {
        ...state,
        particularBoard: { ...state.particularBoard, processes: processChange },
        message: action.payload.message,
        error: ""
      };
    case EDIT_TASK:
      return {
        ...state,
        message: action.payload.message,
        error: ""
      };
    case EDIT_TASK_ERROR:
      return {
        ...state,
        message: "",
        error: action.payload
      };
    default:
      return state;
  }
};

export default dashboard;
