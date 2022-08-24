import { expect, test } from 'vitest'
import { NodeType } from '../src/ast'
import { parser } from '../src/parser'
import { tokenizer } from '../src/tokenizer'
import { traverser, Visitor } from '../src/traverser'

test('按先进入、后退出的顺序遍历语法树', () => {
  const ast = parser(tokenizer('(add 2 (subtract 4 2))'))
  const calls: string[] = []
  const visitor: Visitor = {
    Program: {
      enter() {
        calls.push('enter Program')
      },
      exit() {
        calls.push('exit Program')
      }
    },
    CallExpression: {
      enter(node) {
        if (node.type === NodeType.CallExpression) {
          calls.push(`enter ${node.name}`)
        }
      },
      exit(node) {
        if (node.type === NodeType.CallExpression) {
          calls.push(`exit ${node.name}`)
        }
      }
    },
    NumberLiteral: {
      enter(node) {
        calls.push(`number ${node.value}`)
      }
    }
  }

  traverser(ast, visitor)

  expect(calls).toEqual([
    'enter Program',
    'enter add',
    'number 2',
    'enter subtract',
    'number 4',
    'number 2',
    'exit subtract',
    'exit add',
    'exit Program'
  ])
})
