import { newE2EPage } from '@stencil/core/testing';

describe('my-multiselect', () => {

  it('should render without errors', async () => {
    const page = await newE2EPage();
    await page.setContent('<my-multiselect></my-multiselect>');

    const element = await page.find('my-multiselect');
    expect(element).toHaveClass('hydrated');
  });

  it('should accept properties and reflect them', async () => {
    const page = await newE2EPage();
    await page.setContent('<my-multiselect label="Test label"></my-multiselect>');

    const component = await page.find('my-multiselect');
    const label = await component.getProperty('label');

    expect(label).toBe('Test label');
  });


  it('should emit myMultiselectIsOpen when dropdown is toggled', async () => {
    const page = await newE2EPage();
    await page.setContent('<my-multiselect></my-multiselect>');

    const select = await page.find('my-multiselect');
    const openEvent = await select.spyOnEvent('myMultiselectIsOpen');

    const multiselectWrapper = await page.find('my-multiselect >>> .my-multiselect-wrapper ');
    await multiselectWrapper.click();

    expect(openEvent).toHaveReceivedEvent();
  });

  it('should toggle dropdown when clicked', async () => {
    const page = await newE2EPage();
    await page.setContent('<my-multiselect></my-multiselect>');

    const component = await page.find('my-multiselect');

    await component.click();
    let dropdown = await page.find('my-multiselect >>> .my-multiselect-dropdown-menu');
    expect(dropdown).not.toBeNull();

    await component.click();
    dropdown = await page.find('my-multiselect >>> .my-multiselect-dropdown-menu');
    expect(dropdown).toBeNull();
  });

  it('should close dropdown when clicked outside', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <div style="height: 1000px; width: 1000px;"></div>
      <my-multiselect></my-multiselect>
    `);

    const component = await page.find('my-multiselect');

    await component.click();
    let dropdown = await page.find('my-multiselect >>> .my-multiselect-dropdown-menu');
    expect(dropdown).not.toBeNull();

    const outsideArea = await page.find('div');
    await outsideArea.click();

    dropdown = await page.find('my-multiselect >>> .my-multiselect-dropdown-menu');
    expect(dropdown).toBeNull();
  });

  // Add more tests for keyboard navigation, clearing selections, error message rendering, dropdown positioning, etc.
});
