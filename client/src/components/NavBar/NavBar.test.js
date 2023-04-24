import React from 'react'
import enzyme from 'enzyme'
import NavBar from './NavBar'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
const { shallow } = enzyme
enzyme.configure({ adapter: new Adapter() })

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn().mockReturnValue({ pathname: '/reservation' }), 
}));

describe('NavBar component', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<NavBar />);
    const sampleUser = { _id: '123', name: 'John Doe', token: 'testToken' };
    localStorage.setItem('profile', JSON.stringify(sampleUser));
    wrapper.setProps({}); // force re-render
  })

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('renders the logo', () => {
    const logo = wrapper.find('.logo')
    expect(logo.exists()).toBe(true)
  })

  it('should render 3 navigation links if user is authenticated', () => {
    const component = wrapper.find('.navbar-nav').children();
    expect(component.length).toBe(4);
    expect(component.at(1).find('.link-text').text()).toBe('Create');
    expect(component.at(2).find('.link-text').text()).toBe('Reservations');
    expect(component.at(3).find('.link-text').text()).toBe('Customers');
  })

})