/* eslint-disable require-jsdoc */

'use strict';

QUnit.module('Тестируем функцию transform', () => {
    QUnit.test('Работает правильно с простыми объектами', (assert) => {
        const originalObject = { a: 1, b: 2, c: 3 };
        const transformFunction = (value) => value * 2;
        const result = transform(originalObject, transformFunction);

        assert.deepEqual(result, { a: 2, b: 4, c: 6 }, 'Значения должны быть умножены на 2');
    });

    QUnit.test('Работает правильно с вложенными объектами', (assert) => {
        const originalObject = { a: 1, b: { c: 2, d: 3 }, e: 4 };
        const transformFunction = (value) => value + 1;
        const result = transform(originalObject, transformFunction);

        assert.deepEqual(result, { a: 2, b: { c: 3, d: 4 }, e: 5 }, 'Значения должны быть увеличены на 1');
    });

    QUnit.test('Работает правильно с массивами', (assert) => {
        const originalObject = { a: [1, 2, 3], b: 4 };
        const transformFunction = (value) => value * 3;
        const result = transform(originalObject, transformFunction);

        assert.deepEqual(result, { a: [3, 6, 9], b: 12 }, 'Элементы массива должны быть умножены на 3');
    });

    QUnit.test('Работает правильно с особыми константами', (assert) => {
        const originalObject = {a: null, b: NaN, c: Infinity, d: [null, NaN, -Infinity]};
        const transformFunction = (value) => value - 100;
        const result = transform(originalObject, transformFunction);

        assert.deepEqual(result, {a: -100, b: NaN, c: Infinity, d: [-100, NaN, -Infinity]}, 'Константы должны изменяться по стандартной логике JS');
    });

    QUnit.test('Глубокое преобразование вложенных объектов', (assert) => {
        const originalObject = { a: 1, b: { c: 2, d: [3] } };
        const transformFunction = (value) => value + 10;
        const result = transform(originalObject, transformFunction);

        assert.deepEqual(result, { a: 11, b: { c: 12, d: [13] } }, 'Должно работать на любой глубине вложенности');
    });

    QUnit.test('Работает со строками', (assert) => {
        const originalObject = {a: "123", b: "Hello", v: [null, "hi", 2.23]};
        const transformFunction = (value) => value + "@!";
        const result = transform(originalObject, transformFunction);

        assert.deepEqual(result, {a: "123@!", b: "Hello@!", v: ["null@!", "hi@!", "2.23@!"]}, 'Должно работать со строками');
    });

    QUnit.test('Не изменяет оригинальный объект', (assert) => {
        const originalObject = { a: 23, b: ["323", { c: null, d: 2.321 }], e: NaN };
        const transformFunction = (value) => value - 10;
        const result = transform(originalObject, transformFunction);

        assert.deepEqual(result, { a: 13, b: [313, { c: -10, d: -7.679 }], e: NaN }, 'Результатом должен быть измененный объект');
        assert.deepEqual(originalObject, { a: 23, b: ["323", { c: null, d: 2.321 }], e: NaN }, 'Оригинальный объект не должен изменяться');
    })

    QUnit.test('Работает с примитивами, созданными через new', (assert) => {
        const originalObject = {a: new String("123"), b: new Number("123"), c: new Boolean("123"), d: "normal", v: [new String("321"), 321]};
        const transformFunctionString = (value) => value + "@!";
        const resultStringTransform = transform(originalObject, transformFunctionString);

        const transformFunctionMultiply = (value) => value * value;
        const resultMultiplyTransform = transform(originalObject, transformFunctionMultiply);

        assert.deepEqual(resultStringTransform, {a: "123@!", b: "123@!", c: "true@!", d: "normal@!", v: ["321@!", "321@!"]}, 'Должно работать с примитивами, созданными через new');
        assert.deepEqual(resultMultiplyTransform, {a: 123 ** 2, b: 123 ** 2, c: 1, d: NaN, v: [321 ** 2, 321 ** 2]}, 'Должно работать с примитивами, созданными через new');
    });
});
