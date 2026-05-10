import ReactQueryProvider from './react-query-provider';

export default function Provider({ children }: { children: React.ReactNode }) {
	return <ReactQueryProvider>{children}</ReactQueryProvider>;
}
