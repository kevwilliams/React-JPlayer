import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import App, { Search, Button } from './App';

describe('Button', () => {
	const div = document.createElement('div');
	ReactDOM.render(<Button>The Button</Button>, div);
	
	test('has a valid snapshot', () => {
		const component = renderer.create(
			<Button>The Button</Button>
		);
		let tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});
});

describe('App', () => {

	it('renders without crashing', () => {
	  const div = document.createElement('div');
	  ReactDOM.render(<App />, div);
	});

	test('has a valid snapshot', () => {
		const component = renderer.create(
			<App />
		);
		let tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});
});

