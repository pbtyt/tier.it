'use client';

import { useCardEpisodes } from '@/entities/episode/hooks/useCardEpisodes';
import { Select } from '@/shared/ui/Select/ui/Select';
import { EpisodeWithActions } from '@/widgets/episodeWithActions';
import { useState } from 'react';
import styles from './EpisodeList.module.scss';

interface IEpisodeListProps {
	cardId: string;
}

export function EpisodeList({ cardId }: IEpisodeListProps) {
	/* TODO: REWRITE implementation */
	/* SUPER DUMB SORT implementation */
	const [filterField, setFilterField] = useState<string>('');
	const [filterOrder, setFilterOrder] = useState<string>('');

	const { episodes } = useCardEpisodes({
		cardId: cardId,
		fields: '',
		filter: `${filterOrder}${filterField}`,
	});

	/* TODO: REWRITE implementation */
	/* SUPER DUMB SORT implementation */
	const onFilterFieldSelect = (value: string) => {
		setFilterField(value);
	};
	const onFilterOrderSelect = (value: string) => {
		setFilterOrder(value);
	};

	return (
		<>
			{/* TODO: REWRITE implementation */}
			{/* SUPER DUMB SORT implementation */}
			<div
				style={{
					display: 'flex',
					gap: '1rem',
					alignItems: 'center',
				}}
			>
				<Select
					placeholder={'Выбрать сортировку'}
					defaultValue='number'
					onSelect={onFilterFieldSelect}
				>
					<Select.Item preview='По номеру' value='number' />
					<Select.Item preview='По рейтингу' value='totalEpisodeRating' />
				</Select>
				<Select
					placeholder={'Выбрать порядок сортировки'}
					defaultValue='-'
					onSelect={onFilterOrderSelect}
				>
					<Select.Item preview='По возрастанию' value='+' />
					<Select.Item preview='По убыванию' value='-' />
				</Select>
			</div>
			{episodes?.map((e, index) => (
				<div className={styles.episodeWrapper} key={e.id}>
					<EpisodeWithActions
						title={e.title}
						number={e.number}
						totalEpisodeRating={e.totalEpisodeRating}
						progress={(e.totalEpisodeRating / 5) * 100}
						id={e.id}
						/**
						TODO: Критический баг: несоответствие типов без приведения.
						Изначально e.episodeRating является объектом 
						episodeRating: {
							id: string;
							rating: number;
							episodeId: string;
							criteriaId: string;
						}[]
						А должен быть episodeRating: IEpisodeRatingResponse[]
						interface IEpisodeRatingResponse {
							id: string;
						
							rating: number;
						
							episodeId: string;
							criteriaId: string;
						}
						*/
						episodeRatingData={e.episodeRating}
					/>
				</div>
			))}
		</>
	);
}
