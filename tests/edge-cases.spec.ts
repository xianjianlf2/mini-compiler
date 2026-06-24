import { expect, test } from 'vitest'
import { tokenizer, TokenType } from '../src/tokenizer'
import { parser } from '../src/parser'
import { compiler } from '../src/compiler'

// --- 标识符：下划线 / 数字 / 连字符 ---
test('标识符支持下划线、数字与连字符', () => {
  expect(tokenizer('(add_numbers a1 my-var)')).toEqual([
    { type: TokenType.Paren, value: '(' },
    { type: TokenType.Name, value: 'add_numbers' },
    { type: TokenType.Name, value: 'a1' },
    { type: TokenType.Name, value: 'my-var' },
    { type: TokenType.Paren, value: ')' }
  ])
})

// --- 字符串转义 ---
test('字符串支持转义引号与换行', () => {
  const tokens = tokenizer('(print "a\\"b\\nc")')
  expect(tokens[2]).toEqual({ type: TokenType.String, value: 'a"b\nc' })
})

test('转义后的字符串能正确生成代码', () => {
  // 内含引号的字符串，codegen 用 JSON.stringify 重新转义
  expect(compiler('(print "say \\"hi\\"")')).toBe('print("say \\"hi\\"");')
})

test('未闭合的字符串会报错', () => {
  expect(() => tokenizer('(print "hello)')).toThrow(/字符串缺少结束引号/)
})

// --- 括号闭合校验 ---
test('缺少右括号会报错', () => {
  expect(() => parser(tokenizer('(add 2 3'))).toThrow(/缺少右括号/)
})

test('嵌套调用缺少内层右括号会报错', () => {
  expect(() => parser(tokenizer('(add (subtract 4 2)'))).toThrow(/缺少右括号/)
})

test('未知字符仍然报错', () => {
  expect(() => tokenizer('(add 2 @)')).toThrow(/未知字符/)
})
