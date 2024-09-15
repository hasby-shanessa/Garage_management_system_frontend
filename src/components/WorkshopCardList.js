// src/components/WorkshopCardList.js
import React, {useEffect, useState} from 'react';
import Link from 'next/link';


// Sample data for demonstration purposes
// const sampleData = [
//   {
//     id: 1,
//     plateNumber: 'ABC123',
//     status: 'In Maintenance',
//     entryDate: '2024-09-15',
//   },
//   {
//     id: 2,
//     plateNumber: 'XYZ456',
//     status: 'Completed',
//     entryDate: '2024-09-14',
//   },
//   {
//     id: 3,
//     plateNumber: 'LMN789',
//     status: 'Pending',
//     entryDate: '2024-09-13',
//   },
// ];

const WorkshopCardList = () => {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        const fetchCards = async () => {
          try {
            const response = await fetch('http://localhost:5000/api/workshop-cards');
            if (!response.ok) {
              throw new Error('Failed to fetch cards');
            }
            const data = await response.json();
            console.log("Data being fethed", data);
            setCards(data);
          } catch (error) {
            console.error('Error fetching cards:', error);
          }
        };
    
        fetchCards();
      }, []);

  return (
    <div  style={{background:'#C9C9E4'}}>
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 className='text-3xl font-bold' style={{color:'#151953'}}>Workshop Cards</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {cards.map((card) => (
          <Link href={`/cards/${card._id}`} key={card._id} passHref style={{textDecoration: 'none'}}>
            <div
              style={{
                border: '1px solid #C9C9E4',
                borderRadius: '8px',
                padding: '20px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                cursor: 'pointer',
                background: '#e1e2e9',
                margin: '10px',
                color: 'black',
                
              }}
            >
              <h2 style={{ margin: '0 0 10px' }}>{card.plateNumber}</h2>
              <p style={{ margin: '0 0 5px'}}>
                <strong>Status:</strong> {card.status}
              </p>
              <p style={{ margin: '0'}}>
                <strong>Entry Date:</strong> {card.entryDate}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
    </div>
  );
};

export default WorkshopCardList;
