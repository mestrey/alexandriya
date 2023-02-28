import { useSearchParams } from '@solidjs/router';
import { Component } from 'solid-js';

const SearchPage: Component = () => {
    const [getQueryParams] = useSearchParams();

    return (
        <div>
            <p>search</p>
        </div>
    );
};

export default SearchPage;