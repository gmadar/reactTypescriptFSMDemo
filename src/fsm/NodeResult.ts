import FSMState from "./FSMState";

export default interface NodeResult {
  nextState: FSMState;
  nextNode: string;
}
