import { h, render } from 'preact';
import { App } from './app';
import './index.css';

if (import.meta.env.DEV) {
  import('preact/debug');
}

render(<App />, document.getElementById('app') as HTMLElement);
