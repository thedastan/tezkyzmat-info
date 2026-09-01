/** Стандартная обёртка списочных ответов бэкенда: `{ detail: T[] }`. */
export interface ApiList<T> {
	detail: T[];
}
