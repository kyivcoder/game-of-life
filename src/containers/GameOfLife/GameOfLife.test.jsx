import * as React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import GameOfLife from './GameOfLife';

configure({ adapter: new Adapter() });

jest.useFakeTimers();

describe('GameOfLife', () => {
  describe('seed tests', () => {
    function mockMathRandom(val) {
      const mockMath = Object.create(global.Math);
      mockMath.random = () => val;
      global.Math = mockMath;
    }

    it('should fill all cols with true', () => {
      mockMathRandom(0.2537126947957218);

      const wrapper = shallow(<GameOfLife rows={5} cols={5} speed={10000} />);

      const gridData = wrapper.state('gridData');
      gridData.map(cols => cols.map(col => expect(col).toBeTruthy()));
    });

    it('should fill all cols with false', () => {
      mockMathRandom(0.7319876731064889);

      const wrapper = shallow(<GameOfLife rows={5} cols={5} speed={10000} />);

      const gridData = wrapper.state('gridData');
      gridData.map(cols => cols.map(col => expect(col).toBeFalsy()));
    });
  });

  describe('play tests', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<GameOfLife rows={3} cols={3} speed={100} />);
    });

    describe('underpopulation tests', () => {
      it('should die, due to the insufficient amount of neighbors(1)', () => {
        wrapper.setState({
          gridData: [
            [false, false, false],
            [false, true, false],
            [false, true, false]
          ]
        });

        jest.runOnlyPendingTimers();

        const gridData = wrapper.state('gridData');
        expect(gridData[1][1]).toBeFalsy();
      });

      it('should die, due to the insufficient amount of neighbors(0)', () => {
        wrapper.setState({
          gridData: [
            [false, false, false],
            [false, true, false],
            [false, false, false]
          ]
        });

        jest.runOnlyPendingTimers();

        const gridData = wrapper.state('gridData');
        expect(gridData[1][1]).toBeFalsy();
      });
    });

    describe('survivors tests', () => {
      it('should survive, due to the sufficient amount of neighbors(2)', () => {
        wrapper.setState({
          gridData: [
            [false, true, false],
            [false, true, false],
            [false, true, false]
          ]
        });

        jest.runOnlyPendingTimers();

        const gridData = wrapper.state('gridData');
        expect(gridData[1][1]).toBeTruthy();
      });

      it('should survive, due to the sufficient amount of neighbors(3)', () => {
        wrapper.setState({
          gridData: [
            [false, true, false],
            [false, true, true],
            [false, true, false]
          ]
        });

        jest.runOnlyPendingTimers();

        const gridData = wrapper.state('gridData');
        expect(gridData[1][1]).toBeTruthy();
      });
    });

    describe('overcrowding tests', () => {
      it('should die, due to the too many neighbors(4)', () => {
        wrapper.setState({
          gridData: [
            [false, true, false],
            [true, true, true],
            [false, true, false]
          ]
        });

        jest.runOnlyPendingTimers();

        const gridData = wrapper.state('gridData');
        expect(gridData[1][1]).toBeFalsy();
      });

      it('should die, due to the too many neighbors(5)', () => {
        wrapper.setState({
          gridData: [
            [false, true, false],
            [true, true, true],
            [false, true, true]
          ]
        });

        jest.runOnlyPendingTimers();

        const gridData = wrapper.state('gridData');
        expect(gridData[1][1]).toBeFalsy();
      });
    });

    describe('reproducting tests', () => {
      it('should alive, due to the 3 amount of neighbors', () => {
        wrapper.setState({
          gridData: [
            [false, false, false],
            [true, false, true],
            [false, true, false]
          ]
        });

        jest.runOnlyPendingTimers();

        const gridData = wrapper.state('gridData');
        expect(gridData[1][1]).toBeTruthy();
      })
    });
  });
});
