import { render } from '@testing-library/react';
import Button from '../';

describe('Button', () => {
  it('should render correctly', () => {
    const { getByText } = render(<Button>BMW M2</Button>);
    expect(getByText('BMW M2')).toBeInTheDocument();
  });

  it('should render with success variant', () => {
    const { container, getByText, getByTestId } = render(
      <Button success>BMW M3</Button>,
    );
    expect(getByText('BMW M3')).toBeInTheDocument();
    expect(container.getElementsByClassName('bg-green-500').length).toBe(1);
    expect(getByTestId('success')).toBeInTheDocument();
  });

  it('should render with loader variant', () => {
    const { getByText, getByTestId } = render(<Button loading>BMW 1M</Button>);
    expect(getByText('BMW 1M')).toBeInTheDocument();
    expect(getByTestId('loader')).toBeInTheDocument();
  });

  describe('colors', () => {
    it('should render with default color', () => {
      const { container } = render(<Button>BMW M4</Button>);
      expect(container.getElementsByClassName('bg-primary').length).toBe(1);
    });

    it('should render with secondary color', () => {
      const { container } = render(<Button color="secondary">BMW M4</Button>);
      expect(container.getElementsByClassName('bg-secondary').length).toBe(1);
    });

    it('should render with white color', () => {
      const { container } = render(<Button color="white">BMW M4</Button>);
      expect(container.getElementsByClassName('bg-white').length).toBe(1);
    });
  });

  describe('size', () => {
    it('should render with default size', () => {
      const { container } = render(<Button>BMW M4</Button>);
      expect(container.getElementsByClassName('h-10').length).toBe(1);
    });

    it('should render with sm size', () => {
      const { container } = render(<Button size="sm">BMW M4</Button>);
      expect(container.getElementsByClassName('h-8').length).toBe(1);
    });

    it('should render with xs size', () => {
      const { container } = render(<Button size="xs">BMW M4</Button>);
      expect(container.getElementsByClassName('h-6').length).toBe(1);
    });
  });
});
