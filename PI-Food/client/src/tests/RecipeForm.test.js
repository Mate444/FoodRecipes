import React from 'react';
//import { render } from '@testing-library/react';
import { shallow, mount } from 'enzyme';
import RecipeFormDefault, { RecipeForm } from '../components/RecipeForm/RecipeForm';
import { addRecipe } from '../actions/actions';
import { useDispatch } from 'react-redux';
import configureStore from 'redux-mock-store';

describe('<RecipeForm /> Mounted', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<RecipeForm />);
    });
    it('renders a form', () => {
        expect(wrapper.find('form')).toHaveLength(1);
    });
    it('renders a label that says: Recipe title', () => {
        expect(wrapper.find('label').at(0).text()).toEqual('Recipe title:');
    });
    it('renders a label that says: Recipe description', () => {
        expect(wrapper.find('label').at(1).text()).toEqual('Recipe description:');
    });
    it('renders a label that says: Recipe rating', () => {
        expect(wrapper.find('label').at(2).text()).toEqual('Recipe rating:');
    });
    it('renders a label that says: Health rating', () => {
        expect(wrapper.find('label').at(3).text()).toEqual('Health rating:');
    });
    it('renders a label that says Recipe instructions', () => {
        expect(wrapper.find('label').at(4).text()).toEqual('Recipe instructions:');
    });
    it('renders a label that says Diet name:', () => {
        expect(wrapper.find('label').at(5).text()).toEqual('Add a diet:');
    });
    it('renders a textarea with name: description and type: text', () => {
        expect(wrapper.find('textarea[name="description"]')).toHaveLength(1);
        expect(wrapper.find('input[type="text"]')).toHaveLength(1);
    });
    it('renders a textarea with name: instructions and type: text', () => {
        expect(wrapper.find('textarea[name="instructions"]')).toHaveLength(1);
        expect(wrapper.find('input[type="text"]')).toHaveLength(1);
    });
    it('renders an input with name: title and type: text', () => {
        expect(wrapper.find('input[name="title"]')).toHaveLength(1);
        expect(wrapper.find('input[type="text"]')).toHaveLength(1);
    });
    it('renders an input with name: spoonacularScore and type: text', () => {
        expect(wrapper.find('input[name="spoonacularScore"]')).toHaveLength(1);
        expect(wrapper.find('input[type="text"]')).toHaveLength(1);
    });
    it('renders an input with name: healthScore and type: text', () => {
        expect(wrapper.find('input[name="healthScore"]')).toHaveLength(1);
        expect(wrapper.find('input[type="text"]')).toHaveLength(1);
    });
    it('renders an input with name: diets and type: text', () => {
        expect(wrapper.find('input[name="diets"]')).toHaveLength(1);
        expect(wrapper.find('input[type="text"]')).toHaveLength(1);
    });
    it('renders a button with type: submit', () => {
        expect(wrapper.find('button[type="submit"]')).toHaveLength(1);
    });
    describe('Controlled form', () => {
        let wrapper, useState, useStateSpy;
        beforeEach(() => {
            useState = jest.fn();
            useStateSpy = jest.spyOn(React, 'useState')
            useStateSpy.mockImplementation((init) => [init, useState]);
            wrapper = shallow(<RecipeForm />)
        })
        describe('title input', () => {
            it('should change input state when title input is modified', () => {
                wrapper.find('input[name="title"]').simulate('change', {target: {name: 'title', value: 'Potatos'}})
                expect(useState).toHaveBeenCalledWith({"title": "Potatos", "description": "", "spoonacularScore":"", "healthScore": "", "instructions": "", "diets":""})
            })
        })
        describe('spoonacularScore input', () => {
            it('should change input state when Recipe rating input is modified', () => {
                wrapper.find('input[name="spoonacularScore"]').simulate('change', {target: {name: 'spoonacularScore', value: "5"}})
                expect(useState).toHaveBeenCalledWith({"title": "Potatos", "description": "Potato chips", "spoonacularScore":"23", "healthScore": "", "instructions": "", "diets":""})
            })
        })
        describe('healthScore input', () => {
            it('should change input state when health rating input is modified', () => {
                wrapper.find('input[name="healthScore"]').simulate('change', {target: {name: 'healthScore', value: '34'}})
                expect(useState).toHaveBeenCalledWith({"title": "Potatos", "description": "", "spoonacularScore":"", "healthScore": "31", "instructions": "", "diets":""})
            })
        })
        describe('diets input', () => {
            it('should change input state when diets input is modified', () => {
                wrapper.find('input[name="diets"]').simulate('change', {target: {name: 'diets', value: 'Potatos'}})
                expect(useState).toHaveBeenCalledWith({"title": "Potatos", "description": "", "spoonacularScore":"", "healthScore": "31", "instructions": "", "diets":"gluten free, vegan"})
            })
        })
        describe('description input', () => {
            it('should change input state when description textarea is modified', () => {
                wrapper.find('textarea[name="description"]').simulate('change', {target: {name: 'description', value: 'potato chips'}})
                expect(useState).toHaveBeenCalledWith({"title": "", "description": "potato chips", "spoonacularScore": "", "healthScore": "", "instructions": "", "diets": ""});
            });
        })
        describe('description input', () => {
            it('should change input state when instructions textaerea is modified', () => {
                wrapper.find('textarea[name="instructions"]').simulate('change', {target: {name: 'instructions', value: 'potato chips'}})
                expect(useState).toHaveBeenCalledWith({"title": "", "description": "potato chips", "spoonacularScore": "", "healthScore": "", "instructions": "fry the potatos in a pan", "diets": ""});
            });
        })
    })
    describe('Dispatch to store', () => {
        var wrapper;
        var store;
        beforeEach(() => {
            const mockStore = configureStore();
            store = mockStore({}, addRecipe);
            store.clearActions();
            wrapper = mount(<RecipeFormDefault store={store}/>);
        });
        it('it should dispatch action "AddRecipe" with the input state as payload when submitted', () => {
            wrapper = mount(<RecipeFormDefault store={store} />);
            wrapper.find('[type="submit"]').simulate('submit', { preventDefault () {} });
            const expectedAction = {
                payload: {
                title: '',
                description: '',
                spoonacularScore: '',
                healthScore: '',
                instructions: '',
                diets: '',
                },
                type: 'ADD_RECIPE'
            }
            expect(store.getActions()).toEqual(expectedAction)
        });
        it('it should call event "preventDefault()"', () => {
            wrapper = mount(<RecipeFormDefault store={store} />);
            const event = { preventDefault: () => {} }
            jest.spyOn(event, 'preventDefault');
            wrapper.find('form').simulate('submit', event);
            expect(event.preventDefault).toBeCalled();
        });
    });

})

