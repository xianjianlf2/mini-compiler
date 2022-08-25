import { expect, test } from 'vitest'
import { NodeType } from '../src/ast'
import { parser } from '../src/parser'
import { tokenizer } from '../src/tokenizer'
import { transformer } from '../src/transformer'

test('把源语言语法树转换成目标语法树', () => {
  const ast = parser(tokenizer('(add 2 (subtract 4 2))'))

  expect(transformer(ast)).toEqual({
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
  })
})

test('转换时保留字符串参数', () => {
  const ast = parser(tokenizer('(print "hello")'))

  expect(transformer(ast)).toEqual({
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
  })
})
