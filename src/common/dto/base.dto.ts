import { Allow } from 'class-validator';

export abstract class BaseDto {
	@Allow()
	id: number;

	@Allow()
	status: string;

	@Allow()
	createdAt: Date | null;

	@Allow()
	updatedAt: Date | null;
}
