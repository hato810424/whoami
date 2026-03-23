import { execSync } from 'node:child_process';

/** ビルド時点の短いコミットハッシュ（静的生成時に解決） */
export function getCommitShort(): string {
	if (process.env.PUBLIC_GIT_COMMIT) return process.env.PUBLIC_GIT_COMMIT;
	if (process.env.GITHUB_SHA) return process.env.GITHUB_SHA.slice(0, 7);
	try {
		return execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim();
	} catch {
		return '';
	}
}

/** フルコミット（取得できなければ短いハッシュと同じ文字列になる場合あり） */
export function getCommitFull(): string {
	if (process.env.PUBLIC_GIT_COMMIT_FULL) return process.env.PUBLIC_GIT_COMMIT_FULL;
	if (process.env.GITHUB_SHA) return process.env.GITHUB_SHA;
	try {
		return execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim();
	} catch {
		return getCommitShort();
	}
}
