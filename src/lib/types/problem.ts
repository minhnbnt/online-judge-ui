export interface ProblemSubmitPayload {
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

export interface ProblemEntry {
	id: string;
	title: string;
	level: number;
}
