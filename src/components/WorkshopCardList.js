// "use client";
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
      }, [cards]);



      // Function to update the status of a card
    const handleStatusUpdate = async (id, newStatus) => {
      try {
        const response = await fetch(`http://localhost:5000/api/workshop-cards/${id}/status`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ status: newStatus })
        });

        if (!response.ok) {
          throw new Error('Failed to update status');
        }

        // Fetch updated data after status change
        const updatedCard = await response.json();
        setCards((prevCards) =>
          prevCards.map((card) => (card._id === id ? updatedCard : card))
        );
      } catch (error) {
        console.error('Error updating status:', error);
      }
    };


    // // Function to delete a card
    // const handleDelete = async (id) => {
    //   try {
    //     const response = await fetch(`http://localhost:5000/api/workshop-cards/${id}`, {
    //       method: 'DELETE',
    //     });

    //     if (!response.ok) {
    //       throw new Error('Failed to delete card');
    //     }

    //     setCards((prevCards) => prevCards.filter((card) => card._id !== id));
    //   } catch (error) {
    //     console.error('Error deleting card:', error);
    //   }
    // };

    // const renderStatusDropdown = (card) => {
    //   if (card.status === 'closed') {
    //     return <button disabled>Closed</button>;
    //   }

    //   return (
    //     <select
    //       value={card.status}
    //       onChange={(e) => handleStatusUpdate(card._id, e.target.value)}
    //     >
    //       <option value="created">Created</option>
    //       <option value="repaired">Repaired</option>
    //       <option value="tested">Tested</option>
    //       <option value="closed">Closed</option>
    //     </select>
    //   );
    // };


    // Function to decide what button to show based on card status
const renderActionButton = (card) => {
  switch (card.status) {
    case 'created':
      return <button style={{ padding: '0.8em',
borderRadius: '5px',
border: 'none',
marginTop: '15px',
background: '#25295D',
color: 'white' }} onClick={(e) => { e.stopPropagation(); handleStatusUpdate(card._id, 'repaired'); }}>Mark as Repaired</button>;
    case 'repaired':
      return <button style={{ padding: '0.8em',
borderRadius: '5px',
border: 'none',
marginTop: '15px',
background: '#25295D',
color: 'white' }} onClick={(e) => { e.stopPropagation(); handleStatusUpdate(card._id, 'tested'); }}>Mark as Tested</button>;
    case 'tested':
      return <button style={{ padding: '0.8em',
borderRadius: '5px',
border: 'none',
marginTop: '15px',
background: '#25295D',
color: 'white' }} onClick={(e) => { e.stopPropagation(); handleStatusUpdate(card._id, 'closed'); }}>Mark as Closed</button>;
    default:
      return null;
  }
};


  return (
    <div  style={{background:'#C9C9E4'}}>
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 className='text-3xl font-bold' style={{color:'#151953'}}>Workshop Cards</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {cards.map((card) => (
          <div>
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
              <Link href={`/cards/${card._id}`} key={card._id} passHref style={{textDecoration: 'none', color: 'black'}}>
              <h2 style={{ padding: "0.2px", color: 'black' }}>{card.plateNumber}</h2>
              <p style={{padding: "0.2px"}}>
                <strong>Status:</strong> {card.status}
              </p>
              <p style={{ margin: '0'}}>
                <strong>Entry Date:</strong> {card.entryDate}

                {/* update */}
                

                  {/* Delete and edit
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={() => handleDelete(card._id)}>Delete</button>
                  <Link href={`/edit/${card._id}`}>
                    <button>Edit</button>
                  </Link>
                </div> */}

              </p>
          </Link>
          <div style={{ padding: '0.2px' }}>
          {renderActionButton(card)}  

          </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default WorkshopCardList;
