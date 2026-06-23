import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Package, ArrowLeftRight, Clock } from 'lucide-react';

const links = [
  { to: '/', icon: LayoutDashboard, label: 'Início' },
  { to: '/products', icon: Package, label: 'Produtos' },
  { to: '/move', icon: ArrowLeftRight, label: 'Mover' },
  { to: '/history', icon: Clock, label: 'Histórico' },
];

export default function NavBar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-50">
      <div className="flex">
        {links.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex-1 flex flex-col items-center py-2 gap-0.5 text-xs font-medium transition-colors min-h-[56px] justify-center ${
                isActive ? 'text-blue-600' : 'text-slate-400'
              }`
            }
          >
            <Icon size={22} />
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
