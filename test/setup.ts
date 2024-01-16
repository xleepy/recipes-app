import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/preact';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';

afterEach(() => cleanup());
