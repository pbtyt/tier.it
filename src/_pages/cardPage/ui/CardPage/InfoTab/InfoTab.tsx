'use client';

import { CARD_CONST_LABELS, ICardResponse } from '@/entities/card';
import styles from './InfoTab.module.scss';

export function InfoTab({
	card,
}: {
	card: Pick<ICardResponse, 'type' | 'episodesNumber' | 'status'> | undefined;
}) {
	return (
		<section className={styles.wrapper}>
			<div className={styles.overview}>
				<div className={styles.details}>
					<h3>Детали</h3>
					<ul className={styles.detailsList}>
						<li className={styles.detail}>
							<span className={styles.title}>Тип</span>
							<div className={styles.value}>
								{card?.type ? CARD_CONST_LABELS[card.type] : ''}
							</div>
						</li>
						<li className={styles.detail}>
							<span className={styles.title}>Эпизоды</span>
							<div className={styles.value}>{card?.episodesNumber}</div>
						</li>
						<li className={styles.detail}>
							<span className={styles.title}>Статус</span>
							<div className={styles.value}>
								{card?.status ? CARD_CONST_LABELS[card.status] : ''}
							</div>
						</li>
						<li className={styles.detail}>
							<span className={styles.title}>Год</span>
							<div className={styles.value}>2023</div>
						</li>
					</ul>
				</div>

				<div className={styles.description}>
					<h3>Описание</h3>
					<p className={styles.text}>
						Десять лет назад по всему миру стали открываться некие «врата»,
						ведущие в подземелья с монстрами, противостоять которым оказалось не
						под силу даже военным. Однако если успеть вовремя победить босса
						подземелья, то врата пропадут, не открывшись, и мирные люди не
						пострадают. Сразиться с боссом способны только избранные — люди,
						получившие особые силы, чтобы бороться с чудовищами. Таких людей
						назвали «охотниками». Вот только способности, которые они получают,
						крайне различны как по функционалу, так и по мощи.
						<br />
						<br />
						Например, охотник Сон Джину относится всего лишь к рангу Е: хоть и
						сильнее обычного человека, он в разы слабее любого самого слабого
						охотника. Он не в состоянии справиться с самым ничтожным монстром,
						поэтому вынужден ходить в подземелье в составе большой группы.
						Напарники убивают всю мелочь, так что у Сон Джину нет возможности
						хорошо заработать на охоте. Нет денег, а значит нет финансов на
						улучшение снаряжения. В общем, замкнутый круг. Однако он продолжает
						заниматься «охотой», чтобы оплатить больничные счета матери, которая
						находится в коме.
						<br />
						<br />
						Всё изменилось, когда, отправившись в очередное низкоранговое
						подземелье, они с командой наткнулись на очень странную вещь — ещё
						одно подземелье, которое оказалось внутри того, что они уже
						очистили. Решив рискнуть, они вошли внутрь.
					</p>
				</div>
			</div>
		</section>
	);
}
