//TODO: Entity ?
type BadgeTierType = 'S' | 'A+' | 'A' | 'B+' | 'B' | 'C' | 'D';

export type BadgeType = {
	tier: BadgeTierType;
	color: string;
	minInterest: number;
	maxInterest: number;
};

// export const BADGE_CONFIG: BadgeType[] = [
// 	{
// 		tier: 'S',
// 		color: '#FE8019',
// 		minInterest: 4.6,
// 		maxInterest: 5,
// 	},
// 	{
// 		tier: 'A+',
// 		color: '#FABD2F',
// 		minInterest: 4.0,
// 		maxInterest: 4.6,
// 	},
// 	{
// 		tier: 'A',
// 		color: '#B8BB26',
// 		minInterest: 3.4,
// 		maxInterest: 4.0,
// 	},
// 	{
// 		tier: 'B+',
// 		color: '#8EC07C',
// 		minInterest: 2.8,
// 		maxInterest: 3.4,
// 	},
// 	{
// 		tier: 'B',
// 		color: '#83A598',
// 		minInterest: 2.0,
// 		maxInterest: 2.8,
// 	},
// 	{
// 		tier: 'C',
// 		color: '#D3869B',
// 		minInterest: 1.0,
// 		maxInterest: 2.0,
// 	},
// 	{
// 		tier: 'D',
// 		color: '#928374',
// 		minInterest: 0,
// 		maxInterest: 1.0,
// 	},
// ];

export const BADGE_CONFIG: BadgeType[] = [
	{
		tier: 'S',
		color: '#FE8019',
		minInterest: 4.7,
		maxInterest: 5,
	},
	{
		tier: 'A+',
		color: '#FABD2F',
		minInterest: 4.1,
		maxInterest: 4.7,
	},
	{
		tier: 'A',
		color: '#B8BB26',
		minInterest: 3.5,
		maxInterest: 4.1,
	},
	{
		tier: 'B+',
		color: '#8EC07C',
		minInterest: 3.0,
		maxInterest: 3.5,
	},
	{
		tier: 'B',
		color: '#83A598',
		minInterest: 2.3,
		maxInterest: 3.0,
	},
	{
		tier: 'C',
		color: '#D3869B',
		minInterest: 1.2,
		maxInterest: 2.3,
	},
	{
		tier: 'D',
		color: '#928374',
		minInterest: 0,
		maxInterest: 1.2,
	},
];
