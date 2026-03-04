export const clamp = (current: number, min: number, max: number): number => {
	return Math.min(Math.max(current, min), max);
};

export const remToPx = (rem: number, fallbackBase: number = 16): number => {
	try {
		if (typeof window === 'undefined') {
			return rem * fallbackBase;
		}

		const rootFontSize = parseFloat(
			getComputedStyle(document.documentElement).fontSize,
		);

		if (isNaN(rootFontSize)) {
			return rem * fallbackBase;
		}

		return rem * rootFontSize;
	} catch (error) {
		console.warn('Error getting root font size, using fallback:', error);
		return rem * fallbackBase;
	}
};

export const areFloatsEqualRelative = (
	a: number,
	b: number,
	epsilon: number = 1e-6,
): boolean => {
	if (Number.isNaN(a) || Number.isNaN(b)) {
		return false;
	}

	if (!Number.isFinite(a) || !Number.isFinite(b)) {
		return a === b;
	}

	epsilon = Math.abs(epsilon);

	const diff = Math.abs(a - b);

	const maxAbs = Math.max(Math.abs(a), Math.abs(b));

	return diff <= Math.max(epsilon, epsilon * maxAbs);
};
