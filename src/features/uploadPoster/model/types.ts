type EntityType = 'card' | 'user';

export interface IUpdatePosterParams {
	entityType: EntityType;
	entityId: string;
}
