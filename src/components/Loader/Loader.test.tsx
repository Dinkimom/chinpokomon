import React from 'react';
import { shallow } from 'enzyme';

import { Loader } from './Loader';

describe('<Loader /> : initial', () => {
  it('should render correctly', () => {
    const component = shallow(<Loader />);

    expect(component).toMatchSnapshot();
  });
});
