import { newE2EPage } from '@stencil/core/testing';

describe('my-checkbox', () => {
  it('should render', async () => {
    const page = await newE2EPage();
    await page.setContent('<my-checkbox></my-checkbox>');

    const element = await page.find('my-checkbox');
    expect(element).toHaveClass('hydrated');
  });

  it('should display slotted content', async () => {
    const page = await newE2EPage();
    await page.setContent('<my-checkbox>Test content</my-checkbox>');

    const labelContent = await page.evaluate(() => {
      const checkbox = document.querySelector('my-checkbox');
      const slot = checkbox.shadowRoot.querySelector('slot');
      const nodes = slot.assignedNodes();
      return nodes[0].textContent;
    });

    expect(labelContent).toBe('Test content');
  });

  it('should emit myChange event when clicked', async () => {
    const page = await newE2EPage();
    await page.setContent('<my-checkbox></my-checkbox>');

    const checkbox = await page.find('my-checkbox');
    const myChange = await checkbox.spyOnEvent('myChange');

    const checkboxWrapper = await page.find('my-checkbox >>> .checkbox__wrapper');
    await checkboxWrapper.click();

    expect(myChange).toHaveReceivedEvent();
  });

});
