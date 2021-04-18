import { shallow } from 'enzyme';
import React from 'react';
import { TestId } from '../../utils/testId';
import { IPageWrapperProps, PageWrapper } from './PageWrapper';

const { generateId } = TestId;

const pageWrapperRoot = generateId('page-wrapper-root');
const pageWrapperLoader = generateId('page-wrapper-loader');
const pageWrapperError = generateId('page-wrapper-error');
const pageWrapperLink = generateId('page-wrapper-link');
const pageWrapperTitle = generateId('page-wrapper-title');
const pageWrapperBody = generateId('page-wrapper-body');

describe('<PageWrapper /> : initial', () => {
  const props: IPageWrapperProps = {
    href: 'Some link',
    title: 'Some title',
    children: (
      <>
        <p></p>
        <p></p>
        <p></p>
      </>
    ),
    isFetching: false,
    error: null,
  };

  const component = shallow(<PageWrapper {...props} />);

  it('has correct link', () => {
    expect(component.find(pageWrapperLink).prop('to')).toBe(props.href);
  });

  it('has correct title', () => {
    expect(component.find(pageWrapperTitle).text()).toBe(props.title);
  });

  it('correctly render children item', () => {
    expect(component.find(pageWrapperBody).children().length).toBe(3);
  });

  it('has no loader', () => {
    expect(component.find(pageWrapperLoader)).toHaveLength(0);
  });

  it('has no error', () => {
    expect(component.find(pageWrapperError)).toHaveLength(0);
  });
});

describe('<PageWrapper /> : loading', () => {
  const props: IPageWrapperProps = {
    href: 'Some link',
    title: 'Some title',
    children: [],
    isFetching: true,
    error: null,
  };

  const component = shallow(<PageWrapper {...props} />);

  it("doesn't have wrapper", () => {
    expect(component.find(pageWrapperRoot)).toHaveLength(0);
  });

  it('has loader', () => {
    expect(component.find(pageWrapperLoader)).toHaveLength(1);
  });

  it('has no error', () => {
    expect(component.find(pageWrapperError)).toHaveLength(0);
  });
});

describe('<PageWrapper /> : error', () => {
  const props: IPageWrapperProps = {
    href: 'Some link',
    title: 'Some title',
    children: [],
    isFetching: false,
    error: 'Some error',
  };

  const component = shallow(<PageWrapper {...props} />);

  it("doesn't have wrapper", () => {
    expect(component.find(pageWrapperRoot)).toHaveLength(0);
  });

  it('has no loader', () => {
    expect(component.find(pageWrapperLoader)).toHaveLength(0);
  });

  it('correctly passed error text prop', () => {
    expect(component.find(pageWrapperError).prop('error')).toBe(props.error);
  });
});
