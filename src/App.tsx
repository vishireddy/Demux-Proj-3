import { AppProvider, useApp } from '@/context/AppContext';
import Landing from '@/pages/Landing';
import FarmerLogin from '@/pages/farmer/FarmerLogin';
import FarmerDashboard from '@/pages/farmer/FarmerDashboard';
import ExpertLogin from '@/pages/expert/ExpertLogin';
import ExpertDashboard from '@/pages/expert/ExpertDashboard';
import GovLogin from '@/pages/gov/GovLogin';
import GovDashboard from '@/pages/gov/GovDashboard';

function Router() {
  const { view } = useApp();
  switch (view) {
    case 'landing':          return <Landing />;
    case 'farmer-login':     return <FarmerLogin />;
    case 'farmer-dashboard': return <FarmerDashboard />;
    case 'expert-login':     return <ExpertLogin />;
    case 'expert-dashboard': return <ExpertDashboard />;
    case 'gov-login':        return <GovLogin />;
    case 'gov-dashboard':    return <GovDashboard />;
    default:                 return <Landing />;
  }
}

export default function App() {
  return (
    <AppProvider>
      <Router />
    </AppProvider>
  );
}
