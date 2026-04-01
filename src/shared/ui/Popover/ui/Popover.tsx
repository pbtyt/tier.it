'use client';

import { useOutside } from '@/shared/hooks/useOutside';
import { ElementPositionType } from '@/shared/types/base.types';
import { getPosition } from '@/shared/utils/getElementPosition';
import { getSize } from '@/shared/utils/getElementSize';
import {
	createContext,
	CSSProperties,
	PropsWithChildren,
	ReactNode,
	RefObject,
	useCallback,
	useContext,
	useEffect,
	useId,
	useRef,
	useState,
} from 'react';
import { createPortal } from 'react-dom';

interface IPopoverContext {
	activeId: string | null;
	setActiveId: (id: string | null) => void;
}

const PopoverContext = createContext<IPopoverContext | undefined>(undefined);

export function PopoverProvider({ children }: { children: ReactNode }) {
	const [activeId, setActiveId] = useState<string | null>(null);
	return (
		<PopoverContext.Provider value={{ activeId, setActiveId }}>
			{children}
		</PopoverContext.Provider>
	);
}

export const usePopoverContext = () => {
	const context = useContext(PopoverContext);
	if (!context)
		throw new Error('usePopover must be used within PopoverProvider');
	return context;
};

interface IPopoverProps {
	id: string;
	position: ElementPositionType;
	anchorPos: 'center' | 'left' | 'right';
	popoverRef?: RefObject<HTMLDivElement | null>;
	className?: string;
	style?: CSSProperties;
}
export function Popover({
	id,
	popoverRef,
	position,
	anchorPos = 'center',
	className,
	style,
	children,
}: PropsWithChildren<IPopoverProps>) {
	const transforms = {
		center: 'translate(-50%, 0)',
		left: 'none',
		right: 'translate(-100%, 0)',
	};

	return createPortal(
		<div id={id}>
			<div
				ref={popoverRef}
				className={className}
				style={{
					...style,
					zIndex: '100',
					position: 'absolute',
					inset: `${position.top}px auto auto ${position.left}px`,
					transform: transforms[anchorPos],
				}}
			>
				{children}
			</div>
		</div>,
		document.getElementById('popover-root')!,
	);
}

type TypeOut<T extends HTMLElement> = {
	openPopover: () => void;
	ref: RefObject<T | null>;
	PopoverMarkup: ReactNode | null;
};
interface IPopoverPositionSettings {
	topOffset?: number;
	leftOffset?: number;
	attachmentPos?: 'left' | 'right' | 'center';
	size?: 'default' | 'parent';
}
export function usePopover<T extends HTMLElement>(
	PopoverElement: ReactNode,
	popoverPositionSettings: IPopoverPositionSettings = {},
): TypeOut<T> {
	const ref = useRef<T>(null);

	const { activeId, setActiveId } = usePopoverContext();
	const uniqueId = `popover-${useId()}`;

	const isOpen = activeId === uniqueId;
	const closePopover = useCallback(() => setActiveId(null), [setActiveId]);

	const { ref: outsideRef } = useOutside(true, closePopover, ref);

	const defaultPositionSettings: Required<IPopoverPositionSettings> = {
		attachmentPos: 'center',
		size: 'default',
		leftOffset: 0,
		topOffset: 0,
	};
	const positionSettings = {
		...defaultPositionSettings,
		...popoverPositionSettings,
	};

	const [position, setPosition] = useState<ElementPositionType>({
		top: 0,
		left: 0,
	});

	const getParentWidth = useCallback(() => {
		if (!ref.current) return;

		const elementSize = getSize(ref.current);

		return elementSize.width;
	}, [positionSettings.size]);

	const calculatePosition = useCallback(() => {
		if (!ref.current) return;

		const elementSize = getSize(ref.current);
		const elementPosition = getPosition(ref.current);

		let attachmentLeft = elementPosition.left;
		if (positionSettings.attachmentPos === 'center') {
			attachmentLeft += elementSize.width / 2;
		} else if (positionSettings.attachmentPos === 'right') {
			attachmentLeft += elementSize.width;
		}

		setPosition({
			top:
				elementPosition.top + elementSize.height + positionSettings.topOffset,
			left: attachmentLeft + positionSettings.leftOffset,
		});
	}, [
		positionSettings.attachmentPos,
		positionSettings.leftOffset,
		positionSettings.topOffset,
	]);

	const openPopover = () => {
		if (isOpen) {
			closePopover();
		} else {
			calculatePosition();
			setActiveId(uniqueId);
		}
	};

	useEffect(() => {
		if (!isOpen) return;

		const handleUpdate = () => calculatePosition();

		window.addEventListener('resize', handleUpdate);
		window.addEventListener('scroll', handleUpdate, true);

		return () => {
			window.removeEventListener('resize', handleUpdate);
			window.removeEventListener('scroll', handleUpdate, true);
		};
	}, [isOpen, calculatePosition]);

	const PopoverMarkup = isOpen ? (
		<Popover
			id={uniqueId}
			position={position}
			anchorPos={positionSettings.attachmentPos}
			popoverRef={outsideRef}
			style={
				popoverPositionSettings.size === 'parent'
					? { minWidth: `${getParentWidth()}px` }
					: {}
			}
		>
			{PopoverElement}
		</Popover>
	) : null;

	return { ref, openPopover, PopoverMarkup };
}
