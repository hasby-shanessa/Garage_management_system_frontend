// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';

// const CardDetails = () => {
//   const router = useRouter();
//   const { id } = router.query;
//   const [card, setCard] = useState(null);

//   useEffect(() => {
//     if (id) {
//       const fetchCardDetails = async () => {
//         try {
//           const response = await fetch(`http://localhost:5000/api/workshop-cards/${id}`);
//           console.log("The id being fetched", id);
//           if (!response.ok) {
//             throw new Error('Failed to fetch card details');
//           }
//           const data = await response.json();
//           setCard(data);
//         } catch (error) {
//           console.error('Error fetching card details:', error);
//         }
//       };

//       fetchCardDetails();
//     }
//   }, [id]);

//   if (!card) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div  style={{background:'#C9C9E4'}}>
//     <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
//       <h1 style={{color:'#151953'}} className='text-3xl font-bold'>Workshop Card Details</h1>
//       <div
        // style={{
        //   border: '1px solid #ddd',
        //   borderRadius: '8px',
        //   padding: '15px',
        //   boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        //   textDecoration: 'none',
        //   background: '#e1e2e9'
        // }}
//       >
//         <h2>{card.plateNumber}</h2>
//         <p><strong>Driver:</strong> {card.driver}</p>
//         <p><strong>Location:</strong> {card.location}</p>
//         <p><strong>Mechanical Issue:</strong> {card.mechanicalIssue}</p>
//         <p><strong>Status:</strong> {card.status}</p>
//         <p><strong>Entry Date:</strong> {card.entryDate}</p>
//       </div>
//     </div>
//     </div>
//   );
// };

// export default CardDetails;



import React from 'react';
import { useRouter } from 'next/router';
import styles from './CardDetails.module.css';

const CardDetails = ({ initialCardData }) => {
  const router = useRouter();
  const { id } = router.query;
  const [card, setCard] = React.useState(initialCardData);
  const [isLoading, setIsLoading] = React.useState(!initialCardData);

  React.useEffect(() => {
    if (!initialCardData) {
      const fetchCardDetails = async () => {
        setIsLoading(true);
        try {
          const response = await fetch(`http://localhost:5000/api/workshop-cards/${id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch card details');
          }
          const data = await response.json();
          setCard(data);
        } catch (error) {
          console.error('Error fetching card details:', error);
        } finally {
          setIsLoading(false);
        }
      };

      if (id) {
        fetchCardDetails();
      }
    }
  }, [id, initialCardData]);

  if (isLoading) {
    return (
      <div className="container">
        <div className="content">
          <h1 className="title">Loading...</h1>
        </div>
      </div>
    );
  }

  if (!card) {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>Card not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Workshop Card Details</h1>
        <div className={styles.card}>
          <h2>{card.plateNumber}</h2>
          <p><strong>Driver:</strong> {card.driver}</p>
          <p><strong>Location:</strong> {card.location}</p>
          <p><strong>Mechanical Issue:</strong> {card.mechanicalIssue}</p>
          <p><strong>Status:</strong> {card.status}</p>
          <p><strong>Entry Date:</strong> {card.entryDate}</p>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.params;
  try {
    const response = await fetch(`http://localhost:5000/api/workshop-cards/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch card details');
    }
    const initialCardData = await response.json();
    return { props: { initialCardData } };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    return { props: { initialCardData: null } };
  }
}

export default CardDetails;