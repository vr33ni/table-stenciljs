import { newE2EPage } from '@stencil/core/testing';

describe('my-select', () => {

  it('should render without errors', async () => {
    const page = await newE2EPage();
    await page.setContent('<my-select></my-select>');

    const element = await page.find('my-select');
    expect(element).toHaveClass('hydrated');
  });

  it('should accept properties and reflect them', async () => {
    const page = await newE2EPage();
    await page.setContent('<my-select my-label="Test label"></my-select>');

    const component = await page.find('my-select');

    const label = await component.getProperty('myLabel');
    expect(label).toBe('Test label');
  });



  it('should display error message when myError is true', async () => {
    const page = await newE2EPage();
    await page.setContent('<my-select my-error="true" my-error-message="This is an error"></my-select>');
    const component = await page.find('my-select');

    const errorMessage = await component.getProperty('myErrorMessage');
    expect(errorMessage).toBe('This is an error');
  });



});
