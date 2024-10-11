import {fireEvent, render, screen} from '@testing-library/react';
import {Provider} from "./context/tasksContext.tsx";
import Tasks from "./components/Tasks.tsx";

describe('App', () => {
  it('renders correctly', () => {
    render(
      <Provider>
        <Tasks />
      </Provider>
    )

    expect(screen.getByPlaceholderText('What needs to be done?')).toBeInTheDocument();
  })

  it('should add a task', () => {
    render(
      <Provider>
        <Tasks />
      </Provider>
    )

    const input = screen.getByPlaceholderText('What needs to be done?');
    const button = screen.getByText('Add');

    fireEvent.change(input, {target: {value: 'New Task'}});
    fireEvent.click(button);

    expect(screen.getByText('New Task')).toBeInTheDocument();
  })

  it('should filter tasks', () => {
    render(
      <Provider>
        <Tasks />
      </Provider>
    );
    const input = screen.getByPlaceholderText('What needs to be done?');
    const button = screen.getByText('Add');

    fireEvent.change(input, { target: { value: 'Task 1' } });
    fireEvent.click(button);

    fireEvent.change(input, { target: { value: 'Task 2' } });
    fireEvent.click(button);

    fireEvent.click(screen.getByText('Task 1'));

    fireEvent.click(screen.getByText('Completed (1)'));

    expect(screen.queryByText('Task 1')).toBeInTheDocument();
    expect(screen.queryByText('Task 2')).not.toBeInTheDocument();
  });
})
