import { expect, test } from 'vitest'
import { tokenizer, TokenType } from '../src/tokenizer'

test('把函数调用拆成 tokens', () => {
  expect(tokenizer('(add 2 (subtract 4 2))')).toEqual([
    { type: TokenType.Paren, value: '(' },
    { type: TokenType.Name, value: 'add' },
    { type: TokenType.Number, value: '2' },
    { type: TokenType.Paren, value: '(' },
    { type: TokenType.Name, value: 'subtract' },
    { type: TokenType.Number, value: '4' },
    { type: TokenType.Number, value: '2' },
    { type: TokenType.Paren, value: ')' },
    { type: TokenType.Paren, value: ')' }
  ])
})

test('支持字符串参数', () => {
  expect(tokenizer('(print "hello")')).toEqual([
    { type: TokenType.Paren, value: '(' },
    { type: TokenType.Name, value: 'print' },
    { type: TokenType.String, value: 'hello' },
    { type: TokenType.Paren, value: ')' }
  ])
})
