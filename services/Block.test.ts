import Block from "./Block";

describe('Тестрование блока', () => {
  test('создает элемент DOM', () => {
    const block = new Block('div');
    expect(block.element.tagName).toBe('DIV');
    expect(document.body.contains(block.element)).toBe(false);
  });
})
