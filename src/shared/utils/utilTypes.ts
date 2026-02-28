import { Dispatch, SetStateAction } from 'react';

export type SetStateType<T> = Dispatch<SetStateAction<T>>;
export type TypeFrom<T> = T[keyof T];

// export type SplitFieldsString<
// 	T,
// 	F extends string
// > = F extends `${infer First},${infer Rest}`
// 	? Extract<First, keyof T> | SplitFieldsString<T, Rest>
// 	: Extract<F, keyof T>;

// export type PickFields<U, T extends keyof U> = Pick<U, T>;

/**
 * Вспомогательный тип для рекурсивного разбора строки с полями через запятую.
 * Преобразует строку вида "field1,field2,field3" в объединение литералов (union)
 * ключей указанного типа T, которые присутствуют в строке.
 *
 * @template T - Тип объекта, из которого извлекаются ключи
 * @template F - Строковый тип с перечислением полей через запятую
 *
 * @example
 * type Example = { id: number; name: string; age: number };
 *
 * // Результат: 'id' | 'name'
 * type Fields = SplitFieldsString<Example, 'id,name'>;
 */
export type SplitFieldsString<T, F extends string> =
	// Если строка пустая - возвращаем все ключи типа T
	F extends ''
		? keyof T
		: // Рекурсивно разбираем строку по запятым
			F extends `${infer First},${infer Rest}`
			? Extract<First, keyof T> | SplitFieldsString<T, Rest> // Извлекаем валидные ключи
			: // Обрабатываем последний элемент в строке
				F extends keyof T
				? F
				: never; // Игнорируем невалидные поля

/**
 * Утилита для выборки указанных полей из типа по строковому списку.
 * Аналог Pick, но с возможностью указания полей через строку с запятыми.
 *
 * @template U - Исходный тип объекта
 * @template F - Строка с перечислением полей через запятую
 *
 * @example
 * type User = {
 *   id: number;
 *   name: string;
 *   email: string;
 *   age: number;
 * };
 *
 * // Результат: { id: number; name: string }
 * type UserPreview = PickFields<User, 'id,name'>;
 *
 * // Пустая строка возвращает исходный тип
 * type FullUser = PickFields<User, ''>;
 */
export type PickFields<U, F extends string> = F extends ''
	? U // Пустая строка = все поля
	: Pick<U, SplitFieldsString<U, F>>; // Выбор только указанных полей
