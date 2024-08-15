import {beforeEach, describe, expect, test, vi} from 'vitest';
import {render, waitFor} from '@testing-library/react';
import Login from '@/pages/login/page.tsx';
import {userEvent} from '@testing-library/user-event';
import {saveAuthToken} from '@/utils/auth.ts';

vi.mock('@/api/auth', () => ({
  login: () => ({
    mutate: vi.fn((data, { onSuccess, onError }) => {
      if (data.username === 'testuser' && data.password === 'password') {
        onSuccess({ data: { access_token: 'fake_access_token', refresh_token: 'fake_refresh_token' } });
      } else {
        onError(new Error('Invalid credentials'));
      }
    })
  })
}));

vi.mock('@/utils/auth', () => ({
  saveAuthToken: vi.fn()
}));

describe('Login', () => {
  const { getByPlaceholderText, getByRole } = render(<Login />);
  const usernameInput = getByPlaceholderText(/아이디/i);
  const passwordInput = getByPlaceholderText(/비밀번호/i);
  const loginButton = getByRole('button', { name: /로그인/i });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders login form', () => {
    expect(usernameInput).toBeDefined();
    expect(passwordInput).toBeDefined();
    expect(loginButton).toBeDefined();
  });

  test('login successfully', async () => {
    await userEvent.type(usernameInput, 'testuser');
    await userEvent.type(passwordInput, 'password');
    await userEvent.click(loginButton);

    await waitFor(() => {
      expect(saveAuthToken).toHaveBeenCalledWith('fake_access_token', 'fake_refresh_token');
    });
  });
});
