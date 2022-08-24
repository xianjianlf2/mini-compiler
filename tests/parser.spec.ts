import { expect, test } from 'vitest'
import { NodeType } from '../src/ast'
import { parser } from '../src/parser'
import { tokenizer } from '../src/tokenizer'

test('把 tokens 组织成嵌套语法树', () => {
  expect(parser(tokenizer('(add 2 (subtract 4 2))'))).toEqual({
    type: NodeType.Program,
    body: [
      {
        type: NodeType.CallExpression,
        name: 'add',
        params: [
          { type: NodeType.NumberLiteral, value: '2' },
          {
            type: NodeType.CallExpression,
            name: 'subtract',
            params: [
              { type: NodeType.NumberLiteral, value: '4' },
              { type: NodeType.NumberLiteral, value: '2' }
            ]
          }
        ]
      }
    ]
  })
})

test('保留字符串参数', () => {
  expect(parser(tokenizer('(print "hello")'))).toEqual({
    type: NodeType.Program,
    body: [
      {
        type: NodeType.CallExpression,
        name: 'print',
        params: [{ type: NodeType.StringLiteral, value: 'hello' }]
      }
    ]
  })
})
