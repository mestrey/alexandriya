import { Component, createSignal } from 'solid-js';

const SearchBarComponent: Component = (props: any) => {
    const [getSearchQuery, setSearchQuery] = createSignal('');

    const formSubmit = (event: Event) => {
        event.preventDefault();

        if (getSearchQuery()) {
            window.location.href = `search?q=${encodeURI(getSearchQuery())}`;
        }
    };

    return (
        <form onsubmit={formSubmit}>
            <div class='row'>
                <div class='col-sm-10'>
                    <input type='text' id='searchQueryInput' class='form-control' placeholder='Name of a movie...'
                        value={props.value ?? getSearchQuery()} onChange={(e) => setSearchQuery(e.currentTarget.value)}
                    />
                </div>
                <div class='col-sm-2 pt-3 pt-sm-0'>
                    <button type='submit' class='px-4 btn btn-primary'>GO</button>
                </div>
            </div>
        </form>
    );
};

export default SearchBarComponent;