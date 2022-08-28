import { expect, test } from 'vitest'
import { compiler } from '../src/compiler'

test('把 Lisp 风格调用编译成 JavaScript 调用', () => {
  expect(compiler('(add 2 (subtract 4 2))')).toBe(
    'add(2, subtract(4, 2));'
  )
})

test('完整流程支持字符串参数', () => {
  expect(compiler('(print "hello")')).toBe('print("hello");')
})
