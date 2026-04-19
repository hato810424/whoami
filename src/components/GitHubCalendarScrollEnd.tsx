import { useCallback, useLayoutEffect, useState, type ComponentProps } from 'react';
import { GitHubCalendar } from 'react-github-calendar';

/** react-activity-calendar の BEM（ライブラリ内部。バージョンアップで変わる可能性あり） */
const SCROLL_CONTAINER_CLASS = 'react-activity-calendar__scroll-container';

type Props = ComponentProps<typeof GitHubCalendar>;

export default function GitHubCalendarScrollEnd(props: Props) {
	const [article, setArticle] = useState<HTMLElement | null>(null);

	const ref = useCallback((node: HTMLElement | null) => {
		setArticle(node);
	}, []);

	useLayoutEffect(() => {
		if (!article) return;
		const scrollEl = article.querySelector<HTMLElement>(`.${SCROLL_CONTAINER_CLASS}`);
		if (!scrollEl) return;

		const snapEnd = () => {
			scrollEl.scrollLeft = Math.max(0, scrollEl.scrollWidth - scrollEl.clientWidth);
		};

		snapEnd();
		const ro = new ResizeObserver(snapEnd);
		ro.observe(scrollEl);
		return () => ro.disconnect();
	}, [article]);

	return <GitHubCalendar ref={ref} {...props} />;
}
