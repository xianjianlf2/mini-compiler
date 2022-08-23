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

      while (char !== '"' && current < input.length) {
        value += char
        char = input[++current]
      }

      current++
      tokens.push({ type: TokenType.String, value })
      continue
    }

    if (/[a-z]/i.test(char)) {
      let value = ''

      while (/[a-z]/i.test(char) && current < input.length) {
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
