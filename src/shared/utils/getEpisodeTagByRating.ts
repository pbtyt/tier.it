import { EPISODE_TAGS, type EpisodeTagType } from '../config/tags.config';

export function getEpisodeTagByRating(rating: number): EpisodeTagType | null {
	for (const episodeTag of EPISODE_TAGS) {
		if (rating >= episodeTag.value) {
			return episodeTag;
		}
	}

	return null;
}
