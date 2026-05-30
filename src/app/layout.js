import { ThemeProvider } from './context/ThemeContext';
import './globals.css';

export const metadata = {
  title: 'Barbearia TH',
  description: 'Arte, estilo e precisao em cada corte. Desde 2016 em Campo Grande, Rio de Janeiro.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}