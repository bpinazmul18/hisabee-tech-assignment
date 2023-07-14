import { combineReducers, Reducer } from "redux";
import entitiesReducer from "./entities";

export interface RootState {
  entities: ReturnType<typeof entitiesReducer>;
}

const rootReducer: Reducer<RootState> = combineReducers({
  entities: entitiesReducer,
});

export default rootReducer;
