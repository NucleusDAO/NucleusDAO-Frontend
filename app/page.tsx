import { DASHBOARD_URL } from '@/config/path';
import { redirect } from 'next/navigation';

export default function Dashboard() {
  redirect(DASHBOARD_URL);
}
