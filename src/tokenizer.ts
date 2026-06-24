export enum TokenType {
  Paren = 'Paren',
  Name = 'Name',
  Number = 'Number',
  String = 'String'
}

export interface Token {
  type: TokenType
  value: string
}

const NAME_START = /[a-zA-Z_]/
const NAME_CHAR = /[a-zA-Z0-9_-]/
const ESCAPES: Record<string, string> = {
  n: '\n',
  t: '\t',
  r: '\r',
  '"': '"',
  '\\': '\\'
}

export function tokenizer(input: string): Token[] {
  const tokens: Token[] = []
  let current = 0

  while (current < input.length) {
    let char = input[current]

    if (/\s/.test(char)) {
      current++
      continue
    }

    if (char === '(' || char === ')') {
      tokens.push({ type: TokenType.Paren, value: char })
      current++
      continue
    }

    if (/[0-9]/.test(char)) {
      let value = ''

      while (/[0-9]/.test(char) && current < input.length) {
        value += char
        char = input[++current]
      }

      tokens.push({ type: TokenType.Number, value })
      continue
    }

    if (char === '"') {
      let value = ''
      char = input[++current]

      while (current < input.length && char !== '"') {
        // 处理转义：\" \\ \n \t \r，其余 \x 原样保留 x
        if (char === '\\') {
          const next = input[++current]
          value += ESCAPES[next] ?? next
          char = input[++current]
          continue
        }

        value += char
        char = input[++current]
      }

      if (char !== '"') {
        throw new TypeError('字符串缺少结束引号 "')
      }

      current++
      tokens.push({ type: TokenType.String, value })
      continue
    }

    // 标识符：首字符为字母或下划线，后续可含字母、数字、下划线、连字符
    if (NAME_START.test(char)) {
      let value = ''

      while (current < input.length && NAME_CHAR.test(char)) {
        value += char
        char = input[++current]
      }

      tokens.push({ type: TokenType.Name, value })
      continue
    }

    throw new TypeError(`未知字符：${char}`)
  }

  return tokens
}
