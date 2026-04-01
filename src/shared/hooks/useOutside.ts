import {
	Dispatch,
	RefObject,
	SetStateAction,
	useEffect,
	useRef,
	useState,
} from 'react';

type TypeOut = {
	ref: any;
	isShow: boolean;
	setIsShow: Dispatch<SetStateAction<boolean>>;
};

export const useOutside = (
	initialIsVisible: boolean,
	onClose: () => void = () => {},
	ignoreRef?: RefObject<HTMLElement | null>,
): TypeOut => {
	const [isShow, setIsShow] = useState<boolean>(initialIsVisible);
	const ref = useRef<HTMLElement>(null);

	const handleClickOutside = (event: MouseEvent) => {
		if (!ref.current) return;

		const target = event.target as Node;
		const isInside = ref.current.contains(target);
		const isInsideIgnored = ignoreRef?.current?.contains(target);

		if (!isInside && !isInsideIgnored) {
			onClose();
			setIsShow(false);
		}
	};
	//TODO: Support touch for mobile
	useEffect(() => {
		document.addEventListener('mouseup', handleClickOutside);

		return () => {
			document.removeEventListener('mouseup', handleClickOutside);
		};
	});

	return { ref, isShow, setIsShow };
};
