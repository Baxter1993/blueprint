*

import * as React from "react";

import { Button, H5, MenuItem, Switch } from "@blueprintjs/core";
import { Example, IExampleProps } from "@blueprintjs/docs-theme";
import { Select } from "@blueprintjs/select";
import {
    areFilmsEqual,
    createFilm,
    filmSelectProps,
    IFilm,
    maybeAddCreatedFilmToArrays,
    maybeDeleteCreatedFilmFromArrays,
    renderCreateFilmOption,
    TOP_100_FILMS,
} from "./films";

const FilmSelect = Select.ofType<IFilm>();

export interface ISelectExampleState {
    allowCreate: boolean;
    createdItems: IFilm[];
    film: IFilm;
    filterable: boolean;
    hasInitialContent: boolean;
    items: IFilm[];
    minimal: boolean;
    resetOnClose: boolean;
    resetOnQuery: boolean;
    resetOnSelect: boolean;
    disableItems: boolean;
    disabled: boolean;
}

export class SelectExample extends React.PureComponent<IExampleProps, ISelectExampleState> {
    public state: ISelectExampleState = {
        allowCreate: false,
        createdItems: [],
        disableItems: false,
        disabled: false,
        film: TOP_100_FILMS[0],
        filterable: true,
        hasInitialContent: false,
        items: filmSelectProps.items,
        minimal: false,
        resetOnClose: false,
        resetOnQuery: true,
        resetOnSelect: false,
    };

    vate handleResetOnSelectChange = this.handleSwitchChange("resetOnSelect");

    public render() {
        const { allowCreate, disabled, disableItems, film, minimal, ...flags } = this.state;

        const initialContent = this.state.hasInitialContent ? (
            <MenuItem disabled={true} text={`${TOP_100_FILMS.length} items loaded.`} />
        ) : (
            undefined
        );
        const maybeCreateNewItemFromQuery = allowCreate ? createFilm : undefined;
        const maybeCreateNewItemRenderer = allowCreate ? renderCreateFilmOption : null;

        return (
            <Example options={this.renderOptions()} {...this.props}>
                <FilmSelect
                    {...filmSelectProps}
                    {...flags}
                    createNewItemFromQuery={maybeCreateNewItemFromQuery}
                    createNewItemRenderer={maybeCreateNewItemRenderer}
                    disabled={disabled}
                    itemDisabled={this.isItemDisabled}
                    itemsEqual={areFilmsEqual}
                    // we may customize the default filmSelectProps.items by
                    // adding newly created items to the list, so pass our own
                    items={this.state.items}
                    initialContent={initialContent}
                    noResults={<MenuItem disabled={true} text="No results." />}
                    onItemSelect={this.handleValueChange}
                    popoverProps={{ minimal }}
                >
                    <Button
                        icon="film"
                        rightIcon="caret-down"
                        text={film ? `${film.title} (${film.year})` : "(No selection)"}
                        disabled={disabled}
                    />
                </FilmSelect>
            </Example>
        );
    }

    protected renderOptions() {
        return (
            <>
                <H5>Props</H5>
                <Switch label="Disabled" checked={this.state.disabled} onChange={this.handleDisabledChange} />
                <Switch label="Filterable" checked={this.state.filterable} onChange={this.handleFilterableChange} />
                <Switch
                    label="Reset on close"
                    checked={this.state.resetOnClose}
                    onChange={this.handleResetOnCloseChange}
                />
                <Switch
                    label="Reset on query"
                    checked={this.state.resetOnQuery}
                    onChange={this.handleResetOnQueryChange}
                />
                <Switch
                    label="Reset on select"
                    checked={this.state.resetOnSelect}
                    onChange={this.handleResetOnSelectChange}
                />
                <Switch
                    label="Use initial content"
                    checked={this.state.hasInitialContent}
                    onChange={this.handleInitialContentChange}
                />
                <Switch
                    label="Disable films before 2000"
                    checked={this.state.disableItems}
                    onChange={this.handleItemDisabledChange}
                />
                <Switch
                    label="Allow creating new items"
                    checked={this.state.allowCreate}
                    onChange={this.handleAllowCreateChange}
                />
                <H5>Popover props</H5>
                <Switch
                    label="Minimal popover style"
                    checked={this.state.minimal}
                    onChange={this.handleMinimalChange}
                />
            </>
        );
    }

    
