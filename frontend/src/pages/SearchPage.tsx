import { useSearchParams } from '@solidjs/router';
import { Component, createSignal, Show } from 'solid-js';
import SearchBarComponent from '../components/SearchBarComponent';
import MovieService from '../services/MovieService';

const MovieCard: Component = (props: any) => {
    return (
        <div class='container'>
            <div class='row'>
                <div class='col-lg-6 text-center'>
                    <Show when={props.loading}>
                        <img class='img-fluid' src='http://via.placeholder.com/300x444' />
                    </Show>
                    <Show when={!props.loading}>
                        <img class='img-fluid' src={props.data.Poster} />
                    </Show>
                </div>
                <div class='col-lg-6 pt-4 pt-lg-0'>
                    <Show when={props.loading}>
                        <h1><strong>Loading...</strong></h1>
                    </Show>
                    <Show when={!props.loading}>
                        <div class='text-center pb-4'>
                            <h1><strong>{props.data.Title}</strong></h1>
                            <p>{props.data.Type}</p>
                        </div>
                        <h5>{props.data.Plot}</h5>
                        <div class='pt-2'>
                            <div class='progress'>
                                <div
                                    class={`progress-bar ${parseFloat(props.data.imdbRating) >= 7 ? 'bg-success' :
                                        (parseFloat(props.data.imdbRating) >= 5 ? 'bg-warning' : 'bg-danger')
                                        }`}
                                    role='progressbar'
                                    style={{ 'width': `${parseFloat(props.data.imdbRating) * 10}%` }}
                                    aria-valuenow={parseFloat(props.data.imdbRating) * 10} aria-valuemin='0' aria-valuemax='100'>
                                    {props.data.imdbRating}
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div class='container'>
                            <div class='row'>
                                <div class='col-sm-6'>
                                    <div class='container'>
                                        <div class='row'>
                                            <div class='col-6 fw-bold'>
                                                <p>Year</p>
                                                <p>Rated</p>
                                                <p>Genre</p>
                                            </div>
                                            <div class='col-6'>
                                                <p>{props.data.Year}</p>
                                                <p>{props.data.Rated}</p>
                                                <p>{props.data.Genre}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class='col-sm-6'>
                                    <div class='container'>
                                        <div class='row'>
                                            <div class='col-6 fw-bold'>
                                                <p>Released</p>
                                                <p>Runtime</p>
                                                <p>Language</p>
                                                <p>Country</p>
                                            </div>
                                            <div class='col-6'>
                                                <p>{props.data.Released}</p>
                                                <p>{props.data.Runtime}</p>
                                                <p>{props.data.Language}</p>
                                                <p>{props.data.Country}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Show>
                </div>
                <div>
                    <Show when={!props.loading}>
                        <hr />
                        <div class='container'>
                            <div class='row'>
                                <div class='col-sm-6'>
                                    <p><strong>Director:</strong> {props.data.Director}, Writer: {props.data.Writer}</p>
                                </div>
                                <div class='col-sm-6 text-sm-end'>
                                    <p><strong>Actors:</strong> {props.data.Actors}</p>
                                </div>
                            </div>
                            <p><strong>Awards:</strong> {props.data.Awards}</p>
                        </div>
                    </Show>
                </div>
            </div>
        </div>
    );
}

const SearchPage: Component = () => {
    const [getQueryParams] = useSearchParams();
    const queryParam = { ...getQueryParams }['q'];

    const [getMovieData, setMovieData] = createSignal({ 'error': false, 'loading': true });

    if (queryParam) {
        MovieService.search(queryParam).then((response: Response) => {
            response.json().then((reponseJson) => {
                if (reponseJson.Response == 'False') {
                    setMovieData({ 'error': true, 'loading': false });
                } else {
                    setMovieData(reponseJson);
                }
            });
        });
    }

    return (
        <div>
            <section class='bg-dark text-light'>
                <div class='text-center p-4'>
                    <h1 class='pb-4'><strong>Search by name</strong></h1>
                    <div class='container-fluid'>
                        <SearchBarComponent value={queryParam ?? ''} />
                    </div>
                </div>
            </section>
            <section class='p-4 m-4'>
                <Show when={queryParam}>
                    <Show when={getMovieData().error}>
                        <div class='text-center'>
                            <h1><strong>Not found!</strong></h1>
                        </div>
                    </Show>
                    <Show when={!getMovieData().error}>
                        <Show when={getMovieData().loading}>
                            <MovieCard loading={true} />
                        </Show>
                        <Show when={!getMovieData().loading}>
                            <MovieCard data={getMovieData()} />
                        </Show>
                    </Show>
                </Show>
                <Show when={!queryParam}>
                    <div class='text-center'>
                        <h4><strong>Type a movie name in the search bar.</strong></h4>
                    </div>
                </Show>
            </section>
        </div>
    );
};

export default SearchPage;