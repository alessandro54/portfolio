import React from 'react';
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Button from '../Button';

describe('Button', () => {
  it('should render correctly', () => {
    const tree = renderer
      .create(<Button type="Home"/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should have correct text', () => {
    const text = 'Home';
    const { getByText } = render(<Button type={text}/>);
    const body = getByText(text);
    expect(body).toBeInTheDocument();
  });
})