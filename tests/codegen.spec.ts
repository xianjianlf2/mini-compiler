import { expect, test } from 'vitest'
import { NodeType, TargetProgramNode } from '../src/ast'
import { codegen } from '../src/codegen'

test('把目标语法树打印成 JavaScript', () => {
  const ast: TargetProgramNode = {
    type: NodeType.Program,
    body: [
      {
        type: 'ExpressionStatement',
        expression: {
          type: NodeType.CallExpression,
          callee: { type: 'Identifier', name: 'add' },
          arguments: [
            { type: NodeType.NumberLiteral, value: '2' },
            {
              type: NodeType.CallExpression,
              callee: { type: 'Identifier', name: 'subtract' },
              arguments: [
                { type: NodeType.NumberLiteral, value: '4' },
                { type: NodeType.NumberLiteral, value: '2' }
              ]
            }
          ]
        }
      }
    ]
  }

  expect(codegen(ast)).toBe('add(2, subtract(4, 2));')
})

test('字符串参数会保留引号', () => {
  const ast: TargetProgramNode = {
    type: NodeType.Program,
    body: [
      {
        type: 'ExpressionStatement',
        expression: {
          type: NodeType.CallExpression,
          callee: { type: 'Identifier', name: 'print' },
          arguments: [{ type: NodeType.StringLiteral, value: 'hello' }]
        }
      }
    ]
  }

  expect(codegen(ast)).toBe('print("hello");')
})
