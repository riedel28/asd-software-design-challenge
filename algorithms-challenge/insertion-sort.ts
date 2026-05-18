function insertionSort(arr: number[]) {
	for (let i = 1; i < arr.length; i++) {
		const current = arr[i];
		let j = i - 1;

		while (j >= 0 && arr[j] > current) {
			arr[j + 1] = arr[j];
			j = j - 1;
		}
		arr[j + 1] = current;
	}

	return arr;
}

console.log(insertionSort([5, 2, 4, 6, 1, 3])); // [1, 2, 3, 4, 5, 6]
