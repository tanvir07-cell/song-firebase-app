import { collection, doc, onSnapshot } from 'firebase/firestore';
import Nav from '../components/Header/Nav';
import { firebaseInit } from '../firebase';
import { useLogin } from '../context/LoginAuthProvider';
import { useGoogleAuth } from '../context/GoogleAuthProvider';
import { useEffect, useState } from 'react';

const { auth, firestore } = firebaseInit();



const Home = () => {
  const [tune, setTune] = useState([]);
  const { loginUser } = useLogin();
  const { googleUser } = useGoogleAuth();

  const userColref = collection(firestore, 'users');

  let docRef;
  if (googleUser?.uid) {
    docRef = doc(userColref, googleUser.uid);
  } else if (loginUser?.uid) {
    docRef = doc(userColref, loginUser.uid);
  } else {
    docRef = doc(userColref);
  }

  useEffect(() => {
    onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        setTune(doc.data().tunes);
      }
      console.log(doc.data());

    })
  
  }, []);

  console.log(tune)

  return (
    <div className='bg-fountain-blue-600 min-h-screen'>
      <Nav />
      {
        tune.length === 0  && <div className='container mx-auto text-center mt-5'>
          <h1 className='text-4xl font-semibold text-fountain-blue-50 flex items-center justify-center h-[100%]'>No Tunes Added Yet</h1>

          </div>
      }



      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 container mx-auto mt-5 mb-5 text-fountain-blue-50'>
        {tune?.map((tune) => (
          
          <div key={crypto.randomUUID()}>
               <iframe
            width="560"
            height="315"
            src={tune.videoId?`https://www.youtube.com/embed/${tune.videoId}`:tune.videoUrl }
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className='w-full h-56 rounded-t-lg'
          ></iframe>
          <div className='p-4'>
            <h2 className='text-xl font-semibold mb-2'>{tune.song}</h2>
            <p className='text-gray-700 mb-4'>{tune.artistName}</p>
            
          </div>


         
         
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
