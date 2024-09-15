import WorkshopCardForm from '../components/WorkshopCardForm'; // Correct the path based on your actual structure
import Link from 'next/link';
import '../app/globals.css';

export default function Home() {
  return (
    <div className="bg-peri">
      <WorkshopCardForm />
       {/* <div style={{ marginTop: '20px' }}>
        <Link href="/cards" style={{ color: '#0070f3' }}>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">View Workshop Cards</button>
        </Link>
      </div> */}
    </div>
  );
}