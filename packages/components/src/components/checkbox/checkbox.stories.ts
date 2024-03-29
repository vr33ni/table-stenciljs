import { action } from '@storybook/addon-actions';

export default {
  title: "Components/Checkbox",
  tags: ['autodocs'],
  args: {
    error: false,
    disabled: false,
    value: false,
    label: 'Text',
    size: 's',
    indeterminate: false,
  },

  argTypes: {
    size: {
      description: "Size options: s (21px) and m (25px) - default: m",
      options: ['s', 'm'],
      control: { type: 'radio' },
    },
    myChange: {
      action: 'myChange',
      description: 'Custom event emitted when accordion-item is closed',
     
    }
  },

};


const DefaultTemplate = ({
  error,
  disabled,
  value,
  indeterminate,
  size,
  label
}) => {
  const checkbox = document.createElement('my-checkbox');
  checkbox.setAttribute('error', error);
  checkbox.setAttribute('disabled', disabled);
  checkbox.setAttribute('value', value);
  checkbox.setAttribute('size', size);
  checkbox.setAttribute('indeterminate', indeterminate);

  checkbox.addEventListener('myChange', action('myChange'));

  checkbox.innerHTML = `
    ${label}
  `

  return checkbox;
};

export const Default = DefaultTemplate.bind({});


