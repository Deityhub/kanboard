import { CREATE_PROCESS, CREATE_PROCESS_START, CREATE_PROCESS_ERROR, CREATE_TASK, CREATE_TASK_ERROR, CREATE_TASK_START, DELETE_PROCESS, DELETE_PROCESS_START, DELETE_PROCESS_ERROR, EDIT_PROCESS, EDIT_PROCESS_START, EDIT_PROCESS_ERROR, DELETE_TASK, DELETE_TASK_START, DELETE_TASK_ERROR, EDIT_TASK, EDIT_TASK_START, EDIT_TASK_ERROR, GET_BOARD, GET_BOARD_START, GET_BOARD_ERROR, GET_USER_BOARD, GET_USER_BOARD_START, GET_USER_BOARD_ERROR, EDIT_BOARD, EDIT_BOARD_START, EDIT_BOARD_ERROR, CREATE_BOARD, CREATE_BOARD_START, CREATE_BOARD_ERROR, DELETE_BOARD, DELETE_BOARD_START, DELETE_BOARD_ERROR } from "../actions/action-types";

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
        loading: true,
        message: action.payload,
        error: ""
      };
    case EDIT_BOARD:
      return {
        ...state,
        particularBoard: action.payload.board,
        loading: false,
        message: action.payload.message,
        error: ""
      };
    case EDIT_BOARD_ERROR:
      return {
        ...state,
        loading: false,
        message: "",
        error: action.payload
      };
    case DELETE_BOARD_START:
      return {
        ...state,
        loading: true,
        message: action.payload,
        error: ""
      };
    case DELETE_BOARD:
      let updatedBoard = state.boards.filter(board => board._id !== action.payload.deletedBoard);
      return {
        ...state,
        boards: updatedBoard,
        loading: false,
        message: action.payload.message,
        error: ""
      };
    case DELETE_BOARD_ERROR:
      return {
        ...state,
        loading: false,
        message: "",
        error: action.payload
      };
    //next is to start with process and then task
    case CREATE_PROCESS_START:
      return {
        ...state,
        loading: true,
        error: "",
        message: action.payload
      };
    case CREATE_PROCESS:
      // update the process
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
        loading: true,
        error: "",
        message: action.payload
      };
    case DELETE_PROCESS:
      // handle process update accordingly
      return {
        ...state,
        particularBoard: { ...state.particularBoard, processes: state.particularBoard.processes.filter(process => process._id !== action.payload.deletedProcess._id) },
        loading: false,
        message: action.payload.message,
        error: ""
      };
    case DELETE_PROCESS_ERROR:
      return {
        ...state,
        loading: false,
        message: "",
        error: action.payload
      };
    case EDIT_PROCESS_START:
      return {
        ...state,
        loading: true,
        message: action.payload,
        error: ""
      };
    case EDIT_PROCESS:
      // handle the update of process accordingly
      let updatedProcess = [...state.particularBoard.processes];
      updatedProcess = updatedProcess.map(process => {
        if (process._id === action.payload.process._id) {
          process = action.payload.process;
        }

        return process;
      });

      return {
        ...state,
        particularBoard: { ...state.particularBoard, processes: updatedProcess },
        loading: false,
        message: action.payload.message,
        error: ""
      };
    case EDIT_PROCESS_ERROR:
      return {
        ...state,
        loading: false,
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
      return {
        ...state,
        loading: true,
        message: action.payload,
        error: ""
      };
    case DELETE_TASK:
      // handle the update of task
      let newerProcess = [...state.particularBoard.processes];
      newerProcess = newerProcess.map(process => {
        if (process._id === action.payload.process._id) {
          process.tasks = process.tasks.filter(task => task._id !== action.payload.task._id);
        }

        return process;
      });

      return {
        ...state,
        particularBoard: { ...state.particularBoard, processes: newerProcess },
        loading: false,
        message: action.payload.message,
        error: ""
      };
    case DELETE_TASK_ERROR:
      return {
        ...state,
        loading: false,
        message: "",
        error: action.payload
      };
    case EDIT_TASK_START:
      return {
        ...state,
        loading: true,
        message: action.payload,
        error: ""
      };
    case EDIT_TASK:
      // handle the update of task in the process locally
      let modifiedBoard = { ...state.particularBoard };
      modifiedBoard.processes.map(process => {
        if (process._id === action.payload.oldProcess._id) {
          process.tasks = process.tasks.filter(task => task._id !== action.payload.task._id);
        } else if (process._id === action.payload.newProcess._id) {
          process.tasks.push(action.payload.task);
        }

        return process;
      });

      return {
        ...state,
        particularBoard: modifiedBoard,
        loading: false,
        message: action.payload.message,
        error: ""
      };
    case EDIT_TASK_ERROR:
      return {
        ...state,
        loading: false,
        message: "",
        error: action.payload
      };
    default:
      return state;
  }
};

export default dashboard;
