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
    if (initialObject !== null && typeof initialObject === "object") {
        for (const key of Object.keys(initialObject)) {
            if (initialObject[key] === null || typeof initialObject[key] !== "object") {
                initialObject[key] = transformFunction(initialObject[key]);

            } else {
                initialObject[key] = transform(initialObject[key], transformFunction);
            }
        }
    }

    return initialObject;
};
