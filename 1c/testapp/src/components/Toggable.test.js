import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import  Toggable from './Toggable'

describe('<Toggable/>', () => {
    let component

    beforeEach(() => {
        component = render(
            <Toggable buttonLabel="show...">
                <div className="testDiv"></div>
            </Toggable>
        )
    })

    test('renders its children', () => {
        const element = component.container.querySelector('.testDiv')

        expect(element).toBeDefined()
    })

    test('at the start children are not visible' , () => {
        const element = component.container.querySelector('.togglableContent')
        expect(element).toHaveStyle('display:none')
    })

    test('when button is clicked, children are displayed ', () => {
        const button = component.getByText('show...')
        fireEvent.click(button)

        const element = component.container.querySelector('.togglableContent')
        expect(element).not.toHaveStyle('display:none')
    })

    test('when cancel button is clicked visible content is hidden', () => {
        const button1 = component.getByText('show...')
        fireEvent.click(button1)

        const button = component.getByText('cancel')
        fireEvent.click(button)

        const element = component.container.querySelector('.togglableContent')
        expect(element).toHaveStyle('display:none')
    })
})