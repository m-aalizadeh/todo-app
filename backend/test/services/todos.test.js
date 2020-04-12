const assert = require('assert');
const app = require('../../src/app');


describe('\'todos\' service', () => {
  it('registered the service', () => {
    const service = app.service('todos');

    assert.ok(service, 'Registered the service');
  });

  it('creates a task', async () => {
    const todo = await app.service('todos').create({
      task: 'task1',
      completed: true
    });

    assert.ok(todo, 'todo is created successfully');
    assert.equal(todo.task , 'task1');
    assert.equal(todo.completed, true);
  });

  it('removes todo', async () => {

    const todo = await app.service('todos').create({
      task: 'task1',
      completed: false
    });
    assert.ok(!todo.completed);
  });

  it('create todos without completed parameter', async () => {
    const todo = await app.service('todos').create({
      task: 'task1'
    });
    assert.ok(todo , 'todo is created successfully');
  });

  
});
