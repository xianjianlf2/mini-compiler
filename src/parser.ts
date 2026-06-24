import {
  createCallExpressionNode,
  createNumberLiteralNode,
  createProgramNode,
  createStringLiteralNode,
  SourceChildNode
} from './ast'
import { Token, TokenType } from './tokenizer'

export function parser(tokens: Token[]) {
  let current = 0
  const ast = createProgramNode()

  function walk(): SourceChildNode {
    let token = tokens[current]

    if (token.type === TokenType.Number) {
      current++
      return createNumberLiteralNode(token.value)
    }

    if (token.type === TokenType.String) {
      current++
      return createStringLiteralNode(token.value)
    }

    if (token.type === TokenType.Paren && token.value === '(') {
      token = tokens[++current]

      if (!token || token.type !== TokenType.Name) {
        throw new TypeError('函数调用必须以名称开头')
      }

      const node = createCallExpressionNode(token.value)
      token = tokens[++current]

      while (token && !(token.type === TokenType.Paren && token.value === ')')) {
        node.params.push(walk())
        token = tokens[current]
      }

      // 走到这里要么遇到 ')'，要么 token 已耗尽——后者说明括号没闭合
      if (!token) {
        throw new TypeError(`函数调用 ${node.name} 缺少右括号 )`)
      }

      current++
      return node
    }

    throw new TypeError(`无法解析 token：${JSON.stringify(token)}`)
  }

  while (current < tokens.length) {
    ast.body.push(walk())
  }

  return ast
}
