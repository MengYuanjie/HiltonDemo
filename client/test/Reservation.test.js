import React from 'react';
import { shallow } from 'enzyme';
import Reservation from '../src/components/Reservation/Reservation';

describe('Reservation Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Reservation />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should initialize the state with the expected properties', () => {
    const expectedInitialState = {
      reservationNumber: '',
      participants: 2,
      arrivalTime: expect.any(Number),
      clientId: null,
      notes: '',
      type: 'Reserved',
      status: '',
    };

    expect(wrapper.find('Reservation').instance().state).toMatchObject(
      expectedInitialState,
    );
  });

  it('should initialize the expected values for the variable in the component', () => {
    expect(wrapper.find('DateFnsUtils').exists).toBeTruthy();
    expect(wrapper.find('Autocomplete').exists).toBeTruthy();
    expect(wrapper.find('TextField').length).toEqual(2);
    expect(wrapper.find('Typography').length).toEqual(2);
  });

  it('should render the form inputs', () => {
    expect(wrapper.find('[label="Reservation Number"]').exists).toBeTruthy();
    expect(wrapper.find('[label="Participants"]').exists).toBeTruthy();
    expect(wrapper.find('[label="Arrival Time"]').exists).toBeTruthy();
    expect(wrapper.find('[label="Client"]').exists).toBeTruthy();
    expect(wrapper.find('[label="Notes"]').exists).toBeTruthy();
  });

  it('should display the save button and trigger the handleSubmit function', () => {
    const handleSubmitSpy = jest.spyOn(
      wrapper.find('Reservation').instance(),
      'handleSubmit',
    );
    wrapper.find('Button').simulate('submit');
    expect(handleSubmitSpy).toHaveBeenCalled();
  });

  it('should get the reservations count when component is mounted', () => {
    const getTotalCountSpy = jest.spyOn(
      wrapper.find('Reservation').instance(),
      'getTotalCount',
    );
    wrapper.find('Reservation').instance().componentDidMount();
    expect(getTotalCountSpy).toHaveBeenCalled();
  });
});