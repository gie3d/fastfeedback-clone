import useSWR from 'swr';

import EmptyState from '../components/EmptyState';
import SiteTableSkeleton from '@/components/SiteTableSkeleton';
import SiteTable from '@/components/SiteTable';
import DashboardShell from '@/components/DashboardShell';
import fetcher from '@/utils/fetcher';
import { useAuth } from '@/lib/auth';

const Dashboard = () => {
  const auth = useAuth();
  const { data, error } = useSWR('/api/sites', fetcher);

  console.log('data is: ', data, error);

  if (!data) {
    return (
      <DashboardShell>
        <SiteTableSkeleton />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      {data.sites ? <SiteTable sites={data.sites} /> : <EmptyState />}
    </DashboardShell>
  );
};

export default Dashboard;
