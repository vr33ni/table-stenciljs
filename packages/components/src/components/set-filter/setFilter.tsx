// SetFilter.tsx
import { Component, h, Event, EventEmitter, Prop, State } from '@stencil/core';

@Component({
  tag: 'my-set-filter',
  styleUrl: 'set-filter.scss',
  shadow: true
})
export class SetFilter {
  @Prop() filterName: string;
  @Prop() filterLabel: string;
  @Prop() placeholder: string;
  @Prop() type: 'text' | 'single-select' | 'multi-select' = 'text';
  @Prop() options: any[] | string;
  @State() filterValues: string[] = [];

  @Event() myFilterChange: EventEmitter;


  handleTextInputChange(event: Event) {
    console.log("text change")
    const target = event.target as HTMLInputElement;
    const value = target.value;
    this.myFilterChange.emit({ filterName: this.filterName, filterValues: [value], type: this.type }); // Emit an array for consistency with the multi select component

  }

  handleSingleSelectChange(event: CustomEvent) {
    console.log("single select change")

    const value = event.detail.value;
    this.myFilterChange.emit({ filterName: this.filterName, filterValues: [value], type: this.type }); // Emit an array for consistency with the multi select component
  }


  handleMultiselectOptionChange(event: CustomEvent) {
    console.log("multi select change")

    this.filterValues = event.detail; // Assuming that my-multiselect emits an array of selected options
    this.myFilterChange.emit({ filterName: this.filterName, filterValues: this.filterValues, type: this.type });
  }


  render() {
    switch (this.type) {
      case 'text':
        return (
          <my-text-field error={false} disabled={false} placeholder={this.placeholder}
            onMyInput={event => this.handleTextInputChange(event)}
          >{this.filterLabel}</my-text-field>
        );
      case 'single-select':
        return (
          <my-select
            placeholder="true"
            search-enabled="true"
            search-placeholder-value="Search..."
            onMySelect={event => this.handleSingleSelectChange(event)}
            my-placeholder-value={this.placeholder}
            my-label={this.filterLabel}
            my-options={this.options}
          ></my-select>
        );
      case 'multi-select':
        return (
          <my-multiselect
            label={this.filterLabel}
            placeholder={this.placeholder}
            options={this.options}
            onMySelect={event => this.handleMultiselectOptionChange(event)}
          />
        );
      default:
        return null;
    }
  }
}

