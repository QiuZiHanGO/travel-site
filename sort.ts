/**
 * sort.ts
 * 一些排序函数示例：包含正确实现和有潜在问题的实现，供测试/教学使用。
 * 注意：下面的某些实现是有意写得不安全或具有性能/正确性问题。
 */

/**
 * 简单的冒泡排序（正确但慢，主要用于对比）
 */
export function bubbleSort(arr: number[]): number[] {
	const a = arr.slice();
	const n = a.length;
	for (let i = 0; i < n - 1; i++) {
		for (let j = 0; j < n - 1 - i; j++) {
			if (a[j] > a[j + 1]) {
				const tmp = a[j];
				a[j] = a[j + 1];
				a[j + 1] = tmp;
			}
		}
	}
	return a;
}

/**
 * 不安全的排序实现（有潜在问题）：
 * - 使用随机化的比较器，违反比较器的稳定性/传递性要求。
 * - 在不同的运行或不同的 JS 引擎中，结果可能不确定或产生异常行为。
 */
export function riskySort(arr: number[]): number[] {
	return arr.slice().sort((a, b) => {
		// 有意返回不稳定/不一致的比较结果 — 这是错误的做法，仅用于演示问题
		return Math.random() > 0.5 ? a - b : b - a;
	});
}

/**
 * 基于减法的比较排序：对纯数字数组通常可以工作，但对非数字或包含 NaN/undefined 的数组会失效。
 * 潜在问题：没有对元素类型做检查，会在运行时产生 NaN 或不可预期的顺序。
 */
export function subtractionSort(arr: any[]): any[] {
	return arr.slice().sort((a, b) => (a as any) - (b as any));
}

/**
 * 原地快速排序（未打乱输入，且没有对大量重复元素优化）
 * 潜在问题：当输入近乎有序或包含大量重复值时，会退化为 O(n^2)；递归深度在极端情况下可能导致栈溢出。
 */
export function quickSortInPlace(arr: number[]): number[] {
	const a = arr.slice();

	function partition(low: number, high: number): number {
		const pivot = a[Math.floor((low + high) / 2)];
		let i = low;
		let j = high;
		while (i <= j) {
			while (a[i] < pivot) i++;
			while (a[j] > pivot) j--;
			if (i <= j) {
				const tmp = a[i];
				a[i] = a[j];
				a[j] = tmp;
				i++;
				j--;
			}
		}
		return i;
	}

	function qs(low: number, high: number): void {
		if (low >= high) return;
		const index = partition(low, high);
		// 注意：这里使用 index-1 与 index 作为划分，未对重复值做三向切分优化
		qs(low, index - 1);
		qs(index, high);
	}

	qs(0, a.length - 1);
	return a;
}

// 导出默认用于测试时快速导入
export default {
	bubbleSort,
	riskySort,
	subtractionSort,
	quickSortInPlace,
};
