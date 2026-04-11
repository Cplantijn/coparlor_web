import { combineEpics } from "redux-observable";
import { sessionEpics } from "./session/epics";

export const rootEpic = combineEpics(...sessionEpics);
