import { combineEpics } from "redux-observable";
import { sessionEpics } from "./session/epics";
import { authEpics } from "./auth/epics";

export const rootEpic = combineEpics(...sessionEpics, ...authEpics);
