import WorkshopCardForm from '../components/WorkshopCardForm'; // Correct the path based on your actual structure
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <WorkshopCardForm />
       <div style={{ marginTop: '20px' }}>
        <Link href="/cards" style={{ textDecoration: 'none', color: '#0070f3' }}>
          View Workshop Cards
        </Link>
      </div>
    </div>
  );
}