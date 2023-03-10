import { ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import Fuse from 'fuse.js';

export function useFuse<T>(data: T[] | undefined, text: string, keys: string[]): T[] {
    const fuse = useRef<Fuse<T> | null>(null);
    const [searchResult, setSearchResult] = useState<Fuse.FuseResult<T>[]>([]);

    useEffect(() => {
        if (data) {
            fuse.current = new Fuse(data, { keys });
        }
    }, [data, keys]);

    useEffect(() => {
        if (fuse.current) {
            setSearchResult(fuse.current.search(text));
        }
    }, [text]);

    return useMemo(() => (searchResult?.length ? searchResult.map(element => element.item) : data || []), [searchResult, data]);
}

interface UseFuseInput<T> {
    list: T[];
    search: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
export function useFuseInput<T>(data: T[] | undefined, keys: string[]): UseFuseInput<T> {
    const [search, setSearch] = useState('');
    const onChange = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
        setSearch(event.target.value);
    }, []);

    const list = useFuse(data, search, keys);

    return { list, search, onChange };
}
