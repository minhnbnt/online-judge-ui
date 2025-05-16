import type { UserInfoResponse } from './userInfo';

export interface Response {
	count: number;
	next?: string;
	previous?: string;
	results: Submission[];
}

export interface Submission {
	id: number;
	owner: UserInfoResponse;
	problem: { id: string; title: string };
	language: string;
	judgeResult: string;
	submittedOn: Date;
}

export interface SubmissionDetailed extends Submission {
	source: string;
	version: string;
}
