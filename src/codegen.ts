import {
  NodeType,
  TargetCallExpressionNode,
  TargetChildNode,
  TargetExpressionStatementNode,
  TargetProgramNode
} from './ast'

type CodegenNode =
  | TargetProgramNode
  | TargetChildNode
  | TargetExpressionStatementNode
  | TargetCallExpressionNode

export function codegen(node: CodegenNode): string {
  switch (node.type) {
    case NodeType.Program:
      return node.body.map(codegen).join('\n')
    case 'ExpressionStatement':
      return `${codegen(node.expression)};`
    case NodeType.CallExpression:
      return `${node.callee.name}(${node.arguments.map(codegen).join(', ')})`
    case NodeType.NumberLiteral:
      return node.value
    case NodeType.StringLiteral:
      return JSON.stringify(node.value)
    default:
      throw new TypeError(`无法生成代码：${JSON.stringify(node)}`)
  }
}
