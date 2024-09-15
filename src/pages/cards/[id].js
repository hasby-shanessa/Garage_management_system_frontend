import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const CardDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [card, setCard] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchCardDetails = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/workshop-cards/${id}`);
          console.log("The id being fetched", id);
          if (!response.ok) {
            throw new Error('Failed to fetch card details');
          }
          const data = await response.json();
          setCard(data);
        } catch (error) {
          console.error('Error fetching card details:', error);
        }
      };

      fetchCardDetails();
    }
  }, [id]);

  if (!card) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Workshop Card Details</h1>
      <div
        style={{
          border: '1px solid #ddd',
          borderRadius: '8px',
          padding: '15px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h2>{card.plateNumber}</h2>
        <p><strong>Driver:</strong> {card.driver}</p>
        <p><strong>Location:</strong> {card.location}</p>
        <p><strong>Mechanical Issue:</strong> {card.mechanicalIssue}</p>
        <p><strong>Status:</strong> {card.status}</p>
        <p><strong>Entry Date:</strong> {card.entryDate}</p>
      </div>
    </div>
  );
};

export default CardDetails;










