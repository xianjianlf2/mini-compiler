import {
  NodeType,
  SourceProgramNode,
  TargetCallExpressionNode,
  TargetProgramNode
} from './ast'
import { traverser } from './traverser'

export function transformer(ast: SourceProgramNode): TargetProgramNode {
  const newAst: TargetProgramNode = {
    type: NodeType.Program,
    body: []
  }

  ast.context = newAst.body

  traverser(ast, {
    CallExpression: {
      enter(node, parent) {
        if (node.type !== NodeType.CallExpression) {
          return
        }

        let expression: TargetCallExpressionNode | {
          type: 'ExpressionStatement'
          expression: TargetCallExpressionNode
        } = {
          type: NodeType.CallExpression,
          callee: {
            type: 'Identifier',
            name: node.name
          },
          arguments: []
        }

        node.context = expression.arguments

        if (parent?.type !== NodeType.CallExpression) {
          expression = {
            type: 'ExpressionStatement',
            expression
          }
        }

        parent?.context?.push(expression)
      }
    },
    NumberLiteral: {
      enter(node, parent) {
        if (node.type === NodeType.NumberLiteral) {
          parent?.context?.push({
            type: NodeType.NumberLiteral,
            value: node.value
          })
        }
      }
    },
    StringLiteral: {
      enter(node, parent) {
        if (node.type === NodeType.StringLiteral) {
          parent?.context?.push({
            type: NodeType.StringLiteral,
            value: node.value
          })
        }
      }
    }
  })

  return newAst
}
