import { Container } from 'inversify';
import 'reflect-metadata';
import { TodoClient } from './TodoClient';
import { ApiManager } from './ApiManager';

const container = new Container();
container.bind<TodoClient>(TodoClient).toSelf();
container.bind<ApiManager>(ApiManager).toSelf();
export { container };
