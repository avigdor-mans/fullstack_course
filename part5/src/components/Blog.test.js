import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: "test43",
    author: "Y. Avi",
    url: "aviYorel.co.il",
    likes: 0
  }

  const component = render(
    <Blog blog={blog} />
  )

  const div = component.container.querySelector('div')
  
  console.log(prettyDOM(div))

  component.debug()

  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
})