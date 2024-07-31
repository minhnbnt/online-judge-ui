export interface Problem {
	id?: string;
	title?: string;
	description?: string;
	level?: number;
	stdin?: string;
	stdout?: string;
	runFlags?: string;
	timeLimit?: number;
	memoryLimit?: number;
}
