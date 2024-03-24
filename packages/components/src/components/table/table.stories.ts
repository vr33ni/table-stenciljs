//default
const columnDefs = [
  { headerName: 'Make', field: 'make', sortable: true, sort: 'desc', unSortIcon: true },
  { headerName: 'Model', field: 'model', sortable: true, unSortIcon: true },
  { headerName: 'Price', field: 'price' },
  { headerName: 'Age', field: 'age' }

];

const rowData = [
  { make: 'Toyota', model: 'Celica', price: 35000, age: 10 },
  { make: 'Ford', model: 'Mondeo', price: 32000, age: 12 },
  { make: 'Porsche', model: 'Boxster', price: 72000 },
  { make: 'Bmw', model: 'x', price: 72000 },
  { make: 'Mercedes', model: 'y', price: 72000 },
  { make: 'Ferrari', model: 'z', price: 72000 },
  { make: 'Chrysler', model: 'a', price: 72000 },
  { make: 'Range rover', model: 'b', price: 72000 },
  { make: 'Tesla', model: 'x', price: 72000 },
  { make: 'Audi', model: '3', price: 72000 },
  { make: 'Landrover', model: 'x', price: 72000 },


];

//table with button col
const columnDefsWithButtonCol = [
  { headerName: 'Make', field: 'make', sortable: true, sort: 'desc', unSortIcon: true },
  { headerName: 'Model', field: 'model', sortable: true, unSortIcon: true },
  { headerName: 'Price', field: 'price' },
  { headerName: 'Age', field: 'age' },
  { headerName: '', field: 'button' }
];

const rowDataWithButtonCol = [
  {
    make: 'Toyota', model: 'Celica', price: 35000, age: 10, button: 'something about Toyota'
  },
  { make: 'Ford', model: 'Mondeo', price: 32000, age: 12, button: 'something about Ford' },
  {
    make: 'Porsche', model: 'Boxster', price: 72000, button: {
      disabled: false,
      variant: "secondary",
      size: "s",
      target: "_blank",
      color: "secondary",
      text: "Button"
      // ... you can extend this as per the properties of `button`
    }
  }
];


export default {
  title: 'Components/Table',
  // tags: ['autodocs'],
  args: {
    tableHeight: 'auto',
    pagination: false,
    paginationPageSize: 10,
    currentPage: 1,
    rowHeight: 40,
    showLoading: false,
  },
  argTypes: {
    tableHeight: {
      table: {
        type: {
          summary: 'Options',
          detail: 'Default: "auto"\nExample for fixed height: "400px"',
        }
      },
    },
    paginationPageSize: {
      description: "Results per page: minimum 10 - maximum 30",
      control: { type: 'number', min: 10, max: 30, step: 10 }
    },
    showLoading: {
      options: [true, false],
      control: { type: 'radio' },
    },
    rowHeight: {
      options: ['compact', 'default'],
      control: { type: 'radio' },
    },
    enableFiltering: {
      options: [true, false],
      control: { type: 'radio' },
    },
    filterOrientation: {
      options: ['sideBar', 'topBar'],
      control: { type: 'radio' },
    },
    columnDefs: {
      table: {
        type: {
          summary: 'Column header options',
          detail: 'Standard columns:\nheaderName: "Model", \nfield: "model", \nsortable: true (optional),\nsort: "desc" (optional) => descending sort (show icon)\nunSortIcon: true (optional) => unsorted (show icon)\n\nSpecial columns:\nheaderName: "",\nfield: "button"\nheaderName: "",\nfield: "link"',
        },
      },
    },
    rowData: {
      table: {
        type: {
          summary: 'Row data options',
          detail: 'Standard row values:\nmake: "Toyota", \nmodel: "Celica", \nprice: 35000 \n\nSpecial row values (incl buttons):\nmake: "Porsche",\nmodel: "Boxster",\nprice: "72000",\nbutton: { \ndisabled: false (optional),\nvariant: "outline" (optional)\nsize: "s" (optional),\ntext: "Button"\n...other button properties\n}',
        },
      },
    }
  }
};




const DefaultTemplate = (args) => {
  let columnFilters = args.columnDefs.map(column => {
    let uniqueColValues = [...new Set(args.rowData.map(row => row[column.field]))];
    return {
      name: column.field,
      options: uniqueColValues.map(option => {
        return { label: option, value: option, selected: false };
      })
    };
  });

  // Create main table element
  let myTable = document.createElement('my-table');
  myTable.setAttribute('row-height', args.rowHeight);
  myTable.setAttribute('cols', JSON.stringify(args.columnDefs));
  myTable.setAttribute('rows', JSON.stringify(args.rowData));
  myTable.setAttribute('table-height', args.tableHeight);
  myTable.setAttribute('pagination', args.pagination);
  myTable.setAttribute('pagination-page-size', args.paginationPageSize);
  myTable.setAttribute('enable-filtering', args.enableFiltering);
  myTable.setAttribute('filter-orientation', args.filterOrientation);


  // Create set-filter elements and append to main table element
  columnFilters.forEach((columnFilter, index) => {
    let filterType;
    switch (index) {
      case 0:
        filterType = 'single-select';
        break;
      case 1:
        filterType = 'multi-select';
        break;
      default:
        filterType = 'text';
    }
    let mySetFilter = document.createElement('my-set-filter');
    mySetFilter.setAttribute('slot', 'set-filter');
    mySetFilter.setAttribute('filter-name', columnFilter.name);
    mySetFilter.setAttribute('filter-label', `${filterType} filter for: ${columnFilter.name}`);
    mySetFilter.setAttribute('placeholder', 'Placeholder');
    mySetFilter.setAttribute('type', filterType);
    if (['single-select', 'multi-select'].includes(filterType)) {
      mySetFilter.setAttribute('options', JSON.stringify(columnFilter.options));
    }
    myTable.appendChild(mySetFilter);
  });

  return myTable.outerHTML;
}



export const IncludesButtons = DefaultTemplate.bind({});
IncludesButtons.args = {
  rowHeight: 'default',
  columnDefs: columnDefsWithButtonCol,
  rowData: rowDataWithButtonCol,
  enableFiltering: false,
};


export const SetFilter = DefaultTemplate.bind({});
SetFilter.args = {
  rowHeight: 'default',
  columnDefs: columnDefs,
  rowData: rowData,
  enableFiltering: true,
  filterOrientation: 'topBar'
};

