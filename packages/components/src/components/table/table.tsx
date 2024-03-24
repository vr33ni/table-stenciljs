import { Component, h, Host, Method, Element, Prop, State } from '@stencil/core';
import classNames from 'classnames';

import { createGrid, FirstDataRenderedEvent, GridApi, GridOptions } from 'ag-grid-community';
import { ButtonCellRenderer } from './buttonCellRenderer';
import { CustomNoRowsOverlay } from './customNoRowsOverlay';


@Component({
  tag: 'my-table',
  styleUrl: 'table.scss',
  shadow: true
})
export class Table {
  gridOptions: GridOptions;
  gridApi: GridApi;
  @State() currentPage: number = 1;
  @Prop() cols: any[] | string;
  @Prop() rows: any[] | string;
  @State() rowData: any[] = [];
  @State() colData: any[] = [];
  @State() filterOptions: { [key: string]: string[] } = {};
  @State() currentFilters = {};

  allRowData: any[] = [];
  @Prop() rowHeight: string = 'default';
  @Prop() tableHeight: string = 'auto';
  @Prop() pagination: boolean = true;
  @Prop() paginationPageSize: number = 10;
  @Prop() filterOrientation: string = 'topbar'; // sidebar
  @State() showSidebarFilters: boolean = true;
  @Prop() enableFiltering: boolean = true;
  @Prop() showLoading: boolean = false;
  private container: HTMLDivElement;
  @Element() host: HTMLElement;
  originalRowData: any[] = [];


  toggleSidebarFilters() {
    this.showSidebarFilters = !this.showSidebarFilters;
  }


  updateFilterOptions() {
    const options = {};
    for (let col of this.colData) {
      options[col.field] = [...new Set(this.rowData.map(row => row[col.field]))];
    }
    this.filterOptions = options;
  }


  handleFilterChange(event: CustomEvent) {
    const { filterName, filterValues, type } = event.detail;
    const selectedValues = filterValues.map(option => option?.value || option);
    if (selectedValues.length === 0 || (selectedValues.length === 1 && type === 'text' && selectedValues[0] === '')) {
      delete this.currentFilters[filterName];
    } else {
      this.currentFilters = {
        ...this.currentFilters, [filterName]: { filterValues: selectedValues, type: type }
      }
    }

    this.allRowData = [...this.originalRowData];

    this.filterData();

    const startIndex = (this.currentPage - 1) * this.paginationPageSize;
    const endIndex = startIndex + this.paginationPageSize;
    const visibleRowData = this.allRowData.slice(startIndex, endIndex);

    this.rowData = visibleRowData;

    this.gridApi.setGridOption('rowData', this.rowData);
  }


  clearAllFilters() {
    this.currentFilters = {};
    this.allRowData = [...this.originalRowData];
    // If necessary, reset the grid/view to its initial state here
  }



  filterData() {
    let filteredData = [...this.allRowData];

    for (let filterName in this.currentFilters) {
      let selectedValues = this.currentFilters[filterName].filterValues;
      let filterType = this.currentFilters[filterName].type;

      filteredData = this.filterByType(filteredData, filterName, selectedValues, filterType);
    }

    this.allRowData = filteredData;
  }

  filterByType(data, filterName, selectedValues, filterType) {
    return data.filter(row => {
      // Fetch the value from the row and convert it to a string for comparison
      let rowValue = String(row[filterName]).toLowerCase();

      switch (filterType) {
        case 'multi-select':
        case 'single-select':
          // Check if the selectedValues (should be an array) includes the rowValue
          return selectedValues.some(value => String(value).toLowerCase() === rowValue);

        case 'text':
          // Check if any of the selectedValues start with the rowValue
          return selectedValues.some(value => rowValue.startsWith(String(value).toLowerCase()));

        default:
          // Fallback case
          return selectedValues.includes(rowValue);
      }
    });
  }




  @Method()
  async onBtShowLoading() {
    this.gridApi.showLoadingOverlay();
  }

  componentWillLoad() {
    this.rowData = this.getRowData();
    this.colData = this.getColData();
    this.updateFilterOptions();

    this.gridOptions = {

      rowHeight: this.rowHeight === 'default' ? 40 : 32,
      headerHeight: 40,
      defaultColDef: {
        resizable: true,
      },
      suppressDragLeaveHidesColumns: true,
      onFirstDataRendered: this.onFirstDataRendered.bind(this),
      columnDefs: this.colData,
      rowData: this.rowData,
      noRowsOverlayComponent: CustomNoRowsOverlay,
      noRowsOverlayComponentParams: {
        noRowsMessageFunc: () =>
          'No rows found' //at: ' + new Date().toLocaleTimeString(),
      },
      icons: {
        sortAscending: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"/></svg>',
        sortDescending: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z"/></svg>',
        sortUnSort: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M137.4 41.4c12.5-12.5 32.8-12.5 45.3 0l128 128c9.2 9.2 11.9 22.9 6.9 34.9s-16.6 19.8-29.6 19.8H32c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9l128-128zm0 429.3l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128c-12.5 12.5-32.8 12.5-45.3 0z"/></svg>'
      },
      rowDragManaged: this.colData.some(col => col.dndSource === true) ? true : false,
      animateRows: this.colData.some(col => col.dndSource === true) ? true : false,
    };
  }

  componentDidRender() {
    if (this.gridApi) {
      this.gridApi.setGridOption('columnDefs', this.colData);
    }
  }



  componentDidLoad() {
    if (this.container) {
      this.gridApi = createGrid(this.container, this.gridOptions);
      if (this.gridApi) {
        this.gridApi.sizeColumnsToFit({
          defaultMinWidth: 100,
        });
        this.gridApi.setGridOption('columnDefs', this.colData);
        this.gridApi.setGridOption('rowData', this.rowData);


        const setFilterElements = this.host.querySelectorAll('my-set-filter');
        // Add an event listener to each SetFilter component
        setFilterElements.forEach(setFilterElement => {
          setFilterElement.addEventListener('myFilterChange', this.handleFilterChange.bind(this));
        });
      }
    }
  }

  componentWillUnmount() {
    const setFilterElements = this.host.shadowRoot.querySelectorAll('set-filter');
    // Remove the event listener from each SetFilter component
    setFilterElements.forEach(setFilterElement => {
      setFilterElement.removeEventListener('myFilterChange', this.handleFilterChange.bind(this));
    });
  }


  getRowData() {
    let rows: any[] = [];

    // If this.rows is undefined or null, log a warning and return an empty array
    if (this.rows === undefined || this.rows === null) {
      console.warn('rows is undefined or null');
      return rows;
    }

    if (typeof this.rows === 'string') {
      try {
        rows = JSON.parse(this.rows);
      } catch (err) {
        console.error('Failed to parse rows input:', this.rows, err);
      }
    } else if (Array.isArray(this.rows) || typeof this.rows === 'object') {
      rows = this.rows;
    } else {
      console.error('Unexpected value for rows: ', this.rows);
    }

    this.allRowData = rows;
    this.originalRowData = [...rows]; // Deep copy the original data
    return rows.slice(0, this.paginationPageSize);
  }


  getColData() {
    let cols: any[] = [];

    // If this.cols is undefined or null, log a warning and return an empty array
    if (this.cols === undefined || this.cols === null) {
      console.warn('cols is undefined or null');
      return cols;
    }

    if (typeof this.cols === 'string') {
      try {
        cols = JSON.parse(this.cols);
      } catch (err) {
        console.error('Failed to parse cols input:', this.cols, err);
      }
    } else if (Array.isArray(this.cols) || typeof this.cols === 'object') {
      cols = this.cols;
    } else {
      console.error('Unexpected value for cols: ', this.cols);
    }

    let buttonColumn = cols.find(column => column.field === 'button');
    if (buttonColumn) {
      buttonColumn.cellRenderer = ButtonCellRenderer;
    }

    return cols;
  }



  onFirstDataRendered(params: FirstDataRenderedEvent) {
    params.api.sizeColumnsToFit();
  }


  getTableClassNames() {
    return classNames(
      this.tableHeight === 'auto' && 'table-wrapper ag-root-wrapper-body',
      'table-wrapper',
    );
  }


  render() {
    let style = {};
    if (this.tableHeight !== 'auto') {
      style = {
        'height': this.tableHeight
      };
    }
    const filterClass = this.filterOrientation === 'topBar' ? 'topBar-layout' : 'sideBar-layout';

    return (
      <Host >
        <div class="filters-container">
          {this.enableFiltering && this.filterOrientation === 'sideBar' && (
            <button onClick={() => this.toggleSidebarFilters()}>
              {this.showSidebarFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
          )}
          <div class={filterClass}>
            {this.enableFiltering && (
              <div class="set-filter-wrapper">
                {(this.filterOrientation !== 'sideBar' || this.showSidebarFilters) && (
                  <slot name="set-filter"></slot>
                )}
              </div>
            )}

            <div class="table-pagination-wrapper">
              <div id="table-wrapper" class={this.getTableClassNames()}>
                <div class='my-ag-grid' style={style} ref={(el) => this.container = el}>
                </div>
              </div>
             </div>
          </div>
        </div>
      </Host>
    )
  }


  hasButtonCol(): boolean {
    return this.getColData().some(column => column.field === 'button');
  }




  onDragOver(event) {
    var dragSupported = event.dataTransfer.length;

    if (dragSupported) {
      event.dataTransfer.dropEffect = 'move';
    }

    event.preventDefault();
  }

  onDrop(event) {
    var jsonData = event.dataTransfer.getData('application/json');

    var eJsonRow = document.createElement('div');
    eJsonRow.classList.add('json-row');
    eJsonRow.innerText = jsonData;

    var eJsonDisplay = document.querySelector('#eJsonDisplay');

    eJsonDisplay.appendChild(eJsonRow);
    event.preventDefault();
  }

}
