import Vue from "vue";
import {
  createComponent,
  onMounted,
  reactive,
  toRefs,
  ref
} from "@vue/composition-api";
import Viz from "viz.js";
const { Module, render } = require("viz.js/full.render.js");

export default createComponent({
  setup() {
    const t = new Tree();

    // const

    const s = reactive({
      treeMap: "",
      newNumber: "",
      a: ref([50, 20, 71])
    });

    var viz = new Viz({ Module, render });

    onMounted(async () => {
      s.a.forEach((el: number) => {
        t.insert(el);
      });
      s.treeMap = t.graph();
      createGraph(s.treeMap);
    });

    function addNew() {
      t.insert(parseInt(s.newNumber));
      s.newNumber = "";
      s.treeMap = t.graph();
      createGraph(s.treeMap);
    }
    function createGraph(str: string) {
      viz.renderSVGElement("digraph" + str).then((result: any) => {
        document.getElementById("image")!.innerHTML = "";
        document.getElementById("image")!.appendChild(result);
      });
    }

    return {
      ...toRefs(s),
      addNew
      //   s
    };
  }
});

interface _Tree_Node_t {
  data: number;
  left: _Tree_Node_t | null;
  right: _Tree_Node_t | null;
}

class Tree {
  count: number;
  root: _Tree_Node_t | null;
  graphMap: string;
  constructor() {
    this.count = 0;
    this.root = null;
    this.graphMap = "";
  }

  insert(d: number) {
    let ptr = this.root;
    let prev = null;
    while (ptr != null) {
      prev = ptr;
      if (d < ptr.data) ptr = ptr.left!;
      else if (d > ptr.data) ptr = ptr.right!;
      else return;
    }
    // Tree_Node_t * new = malloc(sizeof(Tree_Node_t));
    const el: _Tree_Node_t = {
      data: d,
      left: null,
      right: null
    };
    this.count++;
    if (prev == null) {
      this.root = el;
    } else {
      if (d < prev.data) prev.left = el;
      else prev.right = el;
    }
  }

  print(ptr: _Tree_Node_t | null, parent?: _Tree_Node_t | null) {
    if (ptr != null) {
      this.print(ptr.left, ptr);
      if (parent) this.graphMap += `${parent!.data} -> ${ptr.data} `;
      this.print(ptr.right, ptr);
    }
  }

  graph() {
    this.graphMap = "{ ";
    this.print(this.root);
    this.graphMap += "}";
    return this.graphMap;
  }
}
