import React from 'react';
import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import App from '../App';

test('renders name', async () => {
  const { getByText, getByRole } = render(
    <React.Fragment>
      <App />
    </React.Fragment>
  );

  await expect.element(getByText('Vite + React')).toBeInTheDocument();

  await expect.element(getByText('count is 0')).toBeInTheDocument();

  await getByRole('button', { name: /count is/i }).click();

  await expect.element(getByText('count is 1')).toBeInTheDocument();
});
