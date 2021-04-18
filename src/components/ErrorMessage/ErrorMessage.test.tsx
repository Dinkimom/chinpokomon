import { render, shallow } from 'enzyme';
import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import { TestId } from '../../utils/testId';
import { ErrorMessage, IErrorMessageProps } from './ErrorMessage';

const errorText = new TestId('error-text');
const testLink = new TestId('test-link');

describe('<ErrorMessage /> : initial (without link)', () => {
  const props: IErrorMessageProps = {
    error: 'Some error',
  };

  const component = shallow(<ErrorMessage {...props} />);

  it('error message renders correctly', () => {
    expect(component.find(errorText.id).text()).toBe(props.error);
  });

  it("component doesn't have passed link", () => {
    expect(component.find(testLink.id)).toHaveLength(0);
  });
});

describe('<ErrorMessage /> : initial (with link)', () => {
  const props: IErrorMessageProps = {
    error: 'Some error',
    link: <Link to="/some-path" data-testid={testLink.baseId} />,
  };

  const component = render(
    <BrowserRouter>
      <ErrorMessage {...props} />
    </BrowserRouter>
  );

  it('error message renders correctly', () => {
    expect(component.find(errorText.id).text()).toBe(props.error);
  });

  it('component has passed link', () => {
    expect(component.find(testLink.id)).toHaveLength(1);
  });
});
