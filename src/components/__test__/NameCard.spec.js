import React from 'react';
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import NameCard from '../NameCard';

describe('Button', () => {
  it('should render correctly', () => {
    const tree = renderer
      .create(<NameCard/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should have correct name ', () => {
    const { getByText } = render(<NameCard/>);
    const title = getByText('Alessandro Paris Chumpitaz');
    expect(title).toBeInTheDocument();
  });

  it('should have correct role', () => {
    const { getByText } = render(<NameCard/>);
    const title = getByText('Software Engineer');
    expect(title).toBeInTheDocument();
  })

})