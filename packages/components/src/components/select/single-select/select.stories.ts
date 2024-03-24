import { action } from "@storybook/addon-actions";


//use string instead of json format here to avoid ugly formatting in the storybook code snippet
// let options = "[{'value': 'a','label': 'option a','selected': 'false'},{'value': 'b','label': 'option b','selected': 'false'},{'value': 'c','label': 'option c','selected': 'false'}]"
const options = [{
  value: "a",
  label: "option a",
  selected: false
},
{
  value: "b",
  label: "option b",
  selected: false
},
{
  value: "c",
  label: "option c",
  selected: false
}];

export default {
  title: 'Components/Select/Single Select',
  // tags: ['autodocs'],
  args: {
    size: "m",
    searchEnabled: true,
    searchPlaceholderValue: 'Search...',
    placeholder: true,
    placeholderValue: 'Placeholder',
    error: false,
    errorMessage: 'Some error',
    label: '',
    disabled: false,
    // type: 'single', //for later implementation
  },

  argTypes: {
    // type: { //for later implementation
    //   // control: { type: 'radio' },
    //   control: false,
    // },
    size: {
      options: {
        'small (36px)': 's',
        'medium (40px)': 'm'
      },
      control: {
        type: 'radio',
      },
    },
    placeholder: {
      options: [true, false],
      control: { type: 'radio' },
    },
    placeholderValue: { control: 'text' },
    // value: { for later implementation
    //   control: 'text',
    //   description: 'Programmatically set the selected value',
    // },
    error: {
      options: [true, false],
      control: { type: 'radio' },
    },
    errorMessage: { control: 'text' },
    label: { control: 'text' },
    disabled: {
      options: [true, false],
      control: { type: 'radio' },
    },
    searchEnabled: {
      options: [true, false],
      control: { type: 'radio' },
    },
    searchPlaceholderValue: { control: { type: 'text' } },

    options: {
      description: 'Takes an array of objects in the following format',
    },
    mySelect: {
      action: 'mySelect',
      description: 'Custom event emitted when item is selected',
    },
  },
};

const DefaultTemplate = (args) => {
  const template = `<my-select 
  size='${args.size}'
  placeholder='${args.placeholder}'
  search-enabled='${args.searchEnabled}'
  search-placeholder-value='${args.searchPlaceholderValue}'
  disabled='${args.disabled}'
  error='${args.error}'
  error-message='${args.errorMessage}'
  label='${args.label}'
  placeholder-value='${args.placeholderValue}'
  my-options='${JSON.stringify(args.options)}' >
 </my-select>`
  setTimeout(() => {
    document.querySelector('my-select')?.addEventListener('mySelect', action('mySelect'));
    document.querySelector('my-select')?.addEventListener('myInput', action('myInput'));

  }, 0);

  return template;
}



export const Single = DefaultTemplate.bind({});
Single.args = {
  // type: 'single',
  options: options,


};

