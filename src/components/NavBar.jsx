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
    <>
      {/* ── Sidebar Desktop (≥768px) ─────────────────────────── */}
      <nav className="hidden md:flex fixed top-0 left-0 h-full w-60 flex-col bg-white border-r border-slate-100 shadow-sm z-50 p-4 gap-1">
        {/* Brand */}
        <div className="flex items-center gap-3 px-2 py-3 mb-2 border-b border-slate-100">
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <Package size={18} className="text-white" />
          </div>
          <span className="text-lg font-bold text-slate-800">Estoque</span>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-1 mt-1">
          {links.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 ${
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* ── Bottom Bar Mobile (<768px) ───────────────────────── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-50 safe-area-bottom">
        <div className="flex">
          {links.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex-1 flex flex-col items-center justify-center py-2 gap-0.5 text-[11px] font-semibold transition-colors min-h-[56px] ${
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
    </>
  );
}
