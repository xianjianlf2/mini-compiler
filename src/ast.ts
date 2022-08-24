export enum NodeType {
  Program = 'Program',
  CallExpression = 'CallExpression',
  NumberLiteral = 'NumberLiteral',
  StringLiteral = 'StringLiteral'
}

export type SourceChildNode =
  | SourceCallExpressionNode
  | SourceNumberLiteralNode
  | SourceStringLiteralNode

export interface SourceProgramNode {
  type: NodeType.Program
  body: SourceChildNode[]
  context?: TargetChildNode[]
}

export interface SourceCallExpressionNode {
  type: NodeType.CallExpression
  name: string
  params: SourceChildNode[]
  context?: TargetChildNode[]
}

export interface SourceNumberLiteralNode {
  type: NodeType.NumberLiteral
  value: string
}

export interface SourceStringLiteralNode {
  type: NodeType.StringLiteral
  value: string
}

export type SourceNode = SourceProgramNode | SourceChildNode

export type TargetChildNode =
  | TargetExpressionStatementNode
  | TargetCallExpressionNode
  | TargetNumberLiteralNode
  | TargetStringLiteralNode

export interface TargetProgramNode {
  type: NodeType.Program
  body: TargetChildNode[]
}

export interface TargetExpressionStatementNode {
  type: 'ExpressionStatement'
  expression: TargetCallExpressionNode
}

export interface TargetCallExpressionNode {
  type: NodeType.CallExpression
  callee: {
    type: 'Identifier'
    name: string
  }
  arguments: TargetChildNode[]
}

export interface TargetNumberLiteralNode {
  type: NodeType.NumberLiteral
  value: string
}

export interface TargetStringLiteralNode {
  type: NodeType.StringLiteral
  value: string
}

export function createProgramNode(): SourceProgramNode {
  return { type: NodeType.Program, body: [] }
}

export function createCallExpressionNode(
  name: string
): SourceCallExpressionNode {
  return { type: NodeType.CallExpression, name, params: [] }
}

export function createNumberLiteralNode(
  value: string
): SourceNumberLiteralNode {
  return { type: NodeType.NumberLiteral, value }
}

export function createStringLiteralNode(
  value: string
): SourceStringLiteralNode {
  return { type: NodeType.StringLiteral, value }
}
