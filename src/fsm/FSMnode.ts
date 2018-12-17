import FSMState from "./FSMState";
import NodeResult from "./NodeResult";

export default class FSMnode {
  work: (state: FSMState) => Promise<NodeResult>;

  constructor(work: (state: FSMState) => Promise<NodeResult>) {
    console.log("FSMnod >constructor");
    this.work = work;
  }

  async execute(state: FSMState) {
    return this.work(state);
  }
}
