export interface Response {
	count: number;
	next?: string;
	previous?: string;
	results: Submission[];
}

export interface Submission {
	id: number;
	owner: string;
	problem: { id: string; title: string };
	language: string;
	judgeResult: string;
	summittedOn: Date;
}
