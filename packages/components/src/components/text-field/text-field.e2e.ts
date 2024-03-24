import { newE2EPage } from '@stencil/core/testing';

describe('text-field', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<text-field></text-field>');
    const element = await page.find('text-field');
    expect(element).toHaveClass('hydrated');
  });

  it('renders placeholder', async () => {
    const page = await newE2EPage();
    await page.setContent('<text-field placeholder="Testing placeholder"></text-field>');
    const input = await page.find('text-field >>> input');
    expect(await input.getProperty('placeholder')).toEqual('Testing placeholder');
  });

  it('renders disabled', async () => {
    const page = await newE2EPage();
    await page.setContent('<text-field disabled></text-field>');
    const input = await page.find('text-field >>> input');
    expect(await input.getProperty('disabled')).toBeTruthy();
  });


  it('handles value change', async () => {
    const page = await newE2EPage();
    await page.setContent('<text-field></text-field>');
    const input = await page.find('text-field >>> input');
    const newValue = 'New value';
    await input.type(newValue);
    expect(await input.getProperty('value')).toBe(newValue);
  });

  it('renders with error', async () => {
    const page = await newE2EPage();
    await page.setContent('<text-field error caption="Invalid input"></text-field>');
    const errorDiv = await page.find('text-field >>> .textInput__bottom-wrapper-caption.error');
    expect(errorDiv.innerText).toBe('Invalid input');
  });

  it('renders with success', async () => {
    const page = await newE2EPage();
    await page.setContent('<text-field success></text-field>');
    const input = await page.find('text-field >>> input');
    expect(input).toHaveClass('success');
  });

  it('renders with icon', async () => {
    const page = await newE2EPage();
    await page.setContent('<text-field icon="chevron-down-16"></text-field>'); // Set the icon attribute with a valid icon name
    await page.waitForChanges(); // Wait for any potential asynchronous updates
    const icon = await page.find('text-field >>> icon');
    expect(icon).not.toBeNull();
  });

});
