import { Dispatch, SetStateAction } from 'react';

export type SetStateType<T> = Dispatch<SetStateAction<T>>;
export type TypeFrom<T> = T[keyof T];

// --- 1. Вспомогательные типы для работы со строками ---

type Whitespace = ' ' | '\n' | '\t';
type Trim<S extends string> = S extends `${Whitespace}${infer T}`
	? Trim<T>
	: S extends `${infer T}${Whitespace}`
		? Trim<T>
		: S;

type SplitAndTrim<S extends string, Sep extends string> = string extends S
	? string
	: S extends `${infer Head}${Sep}${infer Tail}`
		? Trim<Head> | SplitAndTrim<Tail, Sep>
		: S extends ''
			? never
			: Trim<S>;

// --- 2. Вспомогательные типы для работы с объектами ---

type Builtin =
	| string
	| number
	| boolean
	| bigint
	| symbol
	| Date
	| null
	| undefined;
type UnwrapArray<T> = T extends Array<infer U> ? U : T;
type IsScalar<T> = NonNullable<UnwrapArray<T>> extends Builtin ? true : false;

type ScalarKeys<T> = {
	[K in keyof T]-?: IsScalar<T[K]> extends true ? K : never;
}[keyof T];

type Prettify<T> = T extends object ? { [K in keyof T]: T[K] } : T;

// --- 3. Парсер токенов (имитация buildSelect) ---

// Извлекает следующие инструкции для конкретного ключа K
type Next<
	K extends string,
	Token extends string,
> = Token extends `${K}.${infer Rest}`
	? Rest
	: Token extends `${K}-${infer Rest}`
		? `OMIT:${Rest}`
		: Token extends `${K}:${infer Rest}`
			? `SELECT:${Rest}`
			: Token extends K
				? `TRUE`
				: never;

type ExtrSelect<N extends string> = N extends `SELECT:${infer S}`
	? SplitAndTrim<S, ';'>
	: never;
type ExtrOmit<N extends string> = N extends `OMIT:${infer S}`
	? SplitAndTrim<S, ';'>
	: never;
// Исключаем управляющие токены, чтобы получить пути для дальнейших include
type ExtrPaths<N extends string> = Exclude<
	N,
	`SELECT:${string}` | `OMIT:${string}` | 'TRUE'
>;

// --- 4. Ядро выборки полей ---

type ProcessObj<T, NextTokens extends string> = Prettify<
	[ExtrSelect<NextTokens>] extends [never]
		? // Режим 2: Include / Omit (берем все скаляры минус OMIT, плюс указанные отношения)
			Pick<T, Exclude<ScalarKeys<T>, ExtrOmit<NextTokens>>> & {
				[K in keyof T as K extends string
					? Next<K, ExtrPaths<NextTokens>> extends never
						? never
						: K
					: never]: ProcessType<T[K], Next<K & string, ExtrPaths<NextTokens>>>;
			}
		: // Режим 1: Strict Select (берем ТОЛЬКО явно указанные поля — для оператора `:`)
			{
				[K in keyof T as K extends string
					? Next<K, ExtrSelect<NextTokens>> extends never
						? never
						: K
					: never]: ProcessType<T[K], Next<K & string, ExtrSelect<NextTokens>>>;
			}
>;

// Обёртка для обработки массивов и опциональных полей (? / undefined / null)
// Если мы дошли до скалярного поля (например string), то просто возвращаем его тип.
type ProcessType<T, NextTokens extends string> =
	NonNullable<T> extends Array<infer U>
		? IsScalar<U> extends true
			? T
			: Array<ProcessObj<U, NextTokens>> | Extract<T, undefined | null>
		: IsScalar<NonNullable<T>> extends true
			? T
			: ProcessObj<NonNullable<T>, NextTokens> | Extract<T, undefined | null>;

// Корневой уровень: Prisma `select` всегда работает как Strict Select
type ProcessRoot<T, Tokens extends string> = Prettify<{
	[K in keyof T as K extends string
		? Next<K, Tokens> extends never
			? never
			: K
		: never]: ProcessType<T[K], Next<K & string, Tokens>>;
}>;

// --- 5. ЭКСПОРТНЫЙ ТИП ---

export type PickFields<T, Fields extends string> = Fields extends ''
	? ProcessObj<T, never> // По умолчанию возвращаем все скаляры
	: ProcessRoot<T, SplitAndTrim<Fields, ','>>;
