import { action } from "@storybook/addon-actions";

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
  value: "z",
  label: "option z",
  selected: false,
  children: [
    {
      value: "z1",
      label: "option z1",
      selected: false
    },
    {
      value: "z2",
      label: "option z2",
      selected: false
    }
  ]
}];


export default {
  title: 'Components/Select/Multi Select',
  // tags: ['autodocs'],
  args: {
    size: "m",
    batchSize: 10,
    maxItemCount: 10,
    error: false,
    errorMessage: 'Some error',
    label: '',
    disabled: false,
    placeholder: 'Placeholder'


  },
  argTypes: {
    size: {
      name: 'Size',
      options: {
        'small (36px)': 's',
        'medium (40px)': 'm'
      },
      control: {
        type: 'radio',
      },
    },
    batchSize: {
      name: 'Batch size',
      description: 'Batch size used during lazy loading options',
      control: {
        type: 'number',
      },
    },
    maxItemCount: {
      name: 'Maximum selectable items',
      control: { type: 'number' },
      description: 'Number of maximum selectable items',
    },
    disabled: {
      name: 'Disabled',
      options: [true, false],
      control: { type: 'radio' },
    },
    error: {
      name: 'Error',
      options: [true, false],
      control: { type: 'radio' },
    },
    errorMessage: {
      name: 'Error message',
      control: 'text'
    },
    label: {
      name: 'Label',
      control: 'text'
    },
    placeholder: {
      name: 'Placeholder',
      control: 'text'
    },
    options: {
      name: 'Options',
      description: 'Takes an array of objects in the following format',
    },
    select: {
      name: 'Custom event: select',
      action: 'select',
      description: 'Custom event emitted when item is selected or unselected',
      table: {
        type: {
          summary: 'Framework integration',
          detail: 'React: onselect={handleInput}\nVue:@select="handleInput"\nAngular:(select)="handleInput()"\nVanillaJs:.addEventListener("select", (event) => {//handle input});',
        },
      },
    },
  }
};

const DefaultTemplate = (args) => {
  const template = `<my-multiselect 
  options='${JSON.stringify(args.options)}' 
  batch-size='${args.batchSize}'
  size='${args.size}'
  max-item-count='${args.maxItemCount}'
  error='${args.error}'
  error-message='${args.errorMessage}'
  label='${args.label}'
  placeholder='${args.placeholder}'
  disabled='${args.disabled}'>
</my-multiselect>`;

  setTimeout(() => {
    document.querySelector('my-multiselect').addEventListener('mySelect', action('mySelect'));
  }, 0);

  return template;
};


export const Default = DefaultTemplate.bind({});
Default.args = {
  options: options
}







