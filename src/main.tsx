import { h, render } from 'preact';
import { App } from './app';
import './index.css';

if (import.meta.env.DEV) {
  import('preact/debug');
}

console.log('called', import.meta.env.DEV, import.meta.env.SSR);

render(<App />, document.getElementById('app') as HTMLElement);
