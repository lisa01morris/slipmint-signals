import '../globals.css';
import AppShell from './AppShell';

export default function Layout({ children }) {
  return (
    <AppShell>
      {children}
    </AppShell>
  );
}