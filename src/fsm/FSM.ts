import FSMState from "./FSMState";
import FSMnode from "./FSMnode";
import NodeResult from "./NodeResult";

export default class FSM {
  currentNode: string;
  state: FSMState;
  nodes: { [stateName: string]: FSMnode };
  newStateCallback: undefined | ((state: FSMState) => any);

  constructor(
    initialNode: string,
    nodes: { [nodeName: string]: FSMnode },
    newStateCallback?: (state: FSMState) => any
  ) {
    if (!nodes[initialNode])
      throw new Error(`initial node "${initialNode}" must be in nodes object`);
    this.currentNode = initialNode;
    this.nodes = nodes;
    this.newStateCallback = newStateCallback;
    this.state = {};
  }

  async initialize() {
    while (
      this.nodes[this.currentNode] &&
      this.nodes[this.currentNode].execute
    ) {
      const { nextState, nextNode }: NodeResult = await this.nodes[
        this.currentNode
      ].execute(this.state);
      this.state = nextState;
      this.currentNode = nextNode;
      if (this.newStateCallback) this.newStateCallback(nextState);
    }
  }
}
