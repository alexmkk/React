import React, { Component } from 'react';
import AppHeader from '../app-header/app-header';
import SearchPanel from '../search-panel/search-panel';
import PostStatusFilter from '../post-status-filter/post-status-filter';
import PostList from '../post-list/post-list';
import PostAddForm from '../post-add-form/post-add-form';

import './app.css';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                { label: 'Go to learn React', important: true, like: false, id: 1 },
                { label: 'That is so good', important: false, like: false, id: 2 },
                { label: 'I need a break', important: false, like: false, id: 3 }
            ],
            term: '',
            filter: 'all'
        }
        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.onUpdateSearch = this.onUpdateSearch.bind(this);
        this.onFilterSelect = this.onFilterSelect.bind(this);
        this.onToggleTemplate = this.onToggleTemplate.bind(this);

        this.maxId = 4;
    }

    addItem(body) {
        const newItem = {
            label: body,
            important: false,
            id: this.maxId++
        }
        this.setState(({ data }) => {
            const newArray = [...data, newItem];
            return {
                data: newArray
            }
        })
    }

    onToggleTemplate(id, field) {
        this.setState(({ data }) => {
            const index = data.findIndex(elem => elem.id === id);

            const old = data[index];
            const newItem = { ...old, [field]: !old[field] }

            const newArray = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

            return {
                data: newArray
            };
        });
    }

    deleteItem(id) {
        this.setState(({ data }) => {
            const index = data.findIndex(elem => elem.id === id);

            const newArray = [...data.slice(0, index), ...data.slice(index + 1)];
            return {
                data: newArray
            }
        })
    }

    searchPost(items, term) {
        if (term.length === 0) {
            return items;
        }

        return items.filter(item => {
            return item.label.indexOf(term) > -1
        });
    }

    filterPost(items, filter) {
        if (filter === 'like') {
            return items.filter(item => item.like)
        } else {
            return items;
        }
    }

    onUpdateSearch(term) {
        this.setState({ term });
    }

    onFilterSelect(filter) {
        this.setState({ filter });
    }

    render() {
        const { data, term, filter } = this.state;
        const liked = data.filter(item => item.like).length;
        const allPosts = data.length;

        const visiblePosts = this.filterPost(this.searchPost(data, term), filter);

        return (
            <div className="app">
                <AppHeader liked={liked} allPosts={allPosts} />
                <div className="search-panel d-flex">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch} />
                    <PostStatusFilter
                        filter={filter}
                        onFilterSelect={this.onFilterSelect}
                    />
                </div>
                <PostList
                    posts={visiblePosts}
                    onDelete={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleLike={this.onToggleLike}
                    onToggleTemplate={this.onToggleTemplate}
                />
                <PostAddForm
                    onAdd={this.addItem}
                />
            </div>
        )
    }
}