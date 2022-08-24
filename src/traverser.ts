import {
  NodeType,
  SourceCallExpressionNode,
  SourceNode,
  SourceProgramNode
} from './ast'

type ParentNode = SourceProgramNode | SourceCallExpressionNode | undefined
type VisitorMethod = (node: SourceNode, parent: ParentNode) => void

interface VisitorOption {
  enter?: VisitorMethod
  exit?: VisitorMethod
}

export interface Visitor {
  Program?: VisitorOption
  CallExpression?: VisitorOption
  NumberLiteral?: VisitorOption
  StringLiteral?: VisitorOption
}

export function traverser(ast: SourceProgramNode, visitor: Visitor) {
  function traverseArray(
    nodes: SourceProgramNode['body'],
    parent: ParentNode
  ) {
    nodes.forEach((node) => traverseNode(node, parent))
  }

  function traverseNode(node: SourceNode, parent?: ParentNode) {
    const methods = visitor[node.type]

    methods?.enter?.(node, parent)

    switch (node.type) {
      case NodeType.Program:
        traverseArray(node.body, node)
        break
      case NodeType.CallExpression:
        traverseArray(node.params, node)
        break
      case NodeType.NumberLiteral:
      case NodeType.StringLiteral:
        break
      default:
        throw new TypeError(`未知节点：${JSON.stringify(node)}`)
    }

    methods?.exit?.(node, parent)
  }

  traverseNode(ast)
}
