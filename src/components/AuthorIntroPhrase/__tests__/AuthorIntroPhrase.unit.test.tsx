import { render } from '@testing-library/react';

import AuthorIntroPhrase from '..';

describe('AuthorIntroPhrase', () => {
  it('should render correctly', () => {
    const { container, getByText } = render(<AuthorIntroPhrase />);

    expect(getByText('Front-End Enthusiast')).toBeInTheDocument();
    expect(container.getElementsByClassName('lottie').length).toBe(1);
    expect(container).toMatchSnapshot();
  });
});
