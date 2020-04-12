import React from 'react';
import App from './App';
import { create } from 'react-test-renderer';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';


describe("App Component", () => {
    test("Matches the snapshot", () => {
        const app = create(<App/>);
        expect(app.toJSON).toMatchSnapshot();
    });
});

describe('App', () => {
    it('renders without crashing given the required props', () => {
      const props = {
        isFetching: false,
        dispatch: jest.fn(),
        selectedSubreddit: 'reactjs',
        posts: []
      }
      const wrapper = shallow(<App {...props} />)
      expect(toJson(wrapper)).toMatchSnapshot()
    })
  })

  it('renders the Refresh button when the isFetching prop is false', () => {
    const props = {
      isFetching: false,
      dispatch: jest.fn(),
      selectedSubreddit: 'reactjs',
      posts: []
    }
     const wrapper = shallow(<App {...props} />)
     expect(wrapper.find('button').length).toBe(1);
     expect(wrapper.find('input').length).toBe(1);
  })

