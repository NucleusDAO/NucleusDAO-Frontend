import { HOME_URL } from '@/config/path';
import { redirect } from 'next/navigation';

export default function Dashboard() {
  redirect(HOME_URL);
}
