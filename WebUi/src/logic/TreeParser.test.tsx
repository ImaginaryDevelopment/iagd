import * as React from 'react';
import { flatMap, GetTotalSum } from './TreeParser';


it('Flatmap works', () => {
  const data = {
    label: '',
    value: '123',
    icon: {} as JSX.Element,
    showCheckbox: true,
    children: [
      {
        label: '',
        value: '456',
        icon: {} as JSX.Element,
        showCheckbox: true,
        children: []
      }
    ]
  };


  const mapped = flatMap(data, (d) => d.children);
  expect(mapped.length).toEqual(2);
  expect(mapped.filter(x => x.value === '123')).toHaveLength(1);
  expect(mapped.filter(x => x.value === '456')).toHaveLength(1);
});

it('GetTotalSum can filter out parent nodes when all children are checked', () => {
  const data = {
    label: <span/>,
    value: '-implicitly-checked-',
    icon: {} as JSX.Element,
    showCheckbox: true,
    pureLabel: '',
    missing: 0,
    children: [
      {
        label: <span/>,
        value: '-explicitly-checked-',
        icon: {} as JSX.Element,
        showCheckbox: true,
        pureLabel: '',
        missing: 0,
        children: []
      }
    ]
  };

  expect(GetTotalSum(data, ['-explicitly-checked-'])).toHaveLength(0);
});

it('GetTotalSum will return both parent and child if neither are checked', () => {
  const data = {
    label: <span>a</span>,
    value: '-not-checked-a-',
    icon: {} as JSX.Element,
    showCheckbox: true,
    pureLabel: 'a',
    missing: 1,
    children: [
      {
        label: <span>b</span>,
        value: '-checked-b-',
        icon: {} as JSX.Element,
        showCheckbox: true,
        pureLabel: 'b',
        missing: 1,
        children: []
      },
      {
        label: <span>c</span>,
        value: '-not-checked-c-',
        icon: {} as JSX.Element,
        showCheckbox: true,
        pureLabel: 'c',
        missing: 1,
        children: []
      }
    ]
  };


  const result = GetTotalSum(data, ['-checked-b-']);
  expect(result).toHaveLength(1);
  expect(result[0].label).toBe('c');
});

it('GetTotalSum will return only the child if neither are checked', () => {
  const data = {
    label: <span>a</span>,
    value: '-not-checked-',
    icon: {} as JSX.Element,
    showCheckbox: true,
    pureLabel: 'a',
    missing: 1,
    children: [
      {
        label: <span>b</span>,
        value: '-not-checked-2-',
        icon: {} as JSX.Element,
        showCheckbox: true,
        pureLabel: 'b',
        missing: 1,
        children: []
      }
    ]
  };

  const result = GetTotalSum(data, ['-explicitly-checked-']);
  expect(result).toHaveLength(1);
  expect(result[0].label).toBe('b');
});
/*
it('Flatmap G works', () => {
  const data = {
    label: '',
    value: '123',
    icon: {} as JSX.Element,
    checked: true,
    children: [
      {
        label: '',
        value: '456',
        icon: {} as JSX.Element,
        checked: true,
        children: []
      }
    ]
  };


  const mapped = flatMapG(data, (d) => d.children);
  expect(mapped.length).toEqual(2);
  expect(mapped.filter(x => x.value === '123')).toHaveLength(1);
  expect(mapped.filter(x => x.value === '456')).toHaveLength(1);
});*/