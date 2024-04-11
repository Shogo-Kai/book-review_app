import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

describe('ログイン画面のテスト', () => {
  test('ログイン画面の部品の確認', () => {
    render(<Login />);
    const emailField = screen.getByPlaceholderText('メールアドレス');
    const passwordField = screen.getByPlaceholderText('パスワード');
    expect(emailField).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();
  }),
    test('入力されるメールアドレスの形式チェック', async () => {
      render(<Login />);
      fireEvent.type(screen.getByPlaceholderText('メールアドレス'), 'dummy');
      expect(
        await screen.findByText('正しいメールアドレス形式ではありません。'),
      ).toBeInTheDocument();
    });
});
