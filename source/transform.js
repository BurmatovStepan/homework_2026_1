"use strict";

/**
 * Рекурсивно изменяет все примитивные значения в объекте
 * @param { Object } initialObject - Исходный объект
 * @param { Function } transformFunction - Функция преобразования
 *
 * @example
 * // returns {a: 5, b: [3, 4, 5], c: null}
 * transform({a: 3, b: [1, 2, 3], c: 2}, (value) => value + 2)
 * @returns { Object }
 */
const transform = (initialObject, transformFunction) => {
    if (initialObject === null || typeof initialObject !== "object") {
        return transformFunction(initialObject);
    }

    if (initialObject instanceof String ||
        initialObject instanceof Number ||
        initialObject instanceof Boolean
    ) {
        return transformFunction(initialObject.valueOf())
    }

    if (Array.isArray(initialObject)) {
        return initialObject.map(item => transform(item, transformFunction));
    }

    return Object.keys(initialObject).reduce((acc, key) => {
        acc[key] = transform(initialObject[key], transformFunction);
        return acc;
    }, {});
};
