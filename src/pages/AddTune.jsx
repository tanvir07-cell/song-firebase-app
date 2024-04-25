import Nav from "../components/Header/Nav"
import { FaHeadphones } from "react-icons/fa";
import { firebaseInit } from "../firebase";
import { collection, doc, getDoc, onSnapshot, setDoc, snapshotEqual } from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useLogin } from "../context/LoginAuthProvider";
import { useGoogleAuth } from "../context/GoogleAuthProvider";
const {auth,firestore} = firebaseInit()

const userColref = collection(firestore,"users");


function getYouTubeVideoId(url) {
  // Regular expression to match YouTube video ID
  const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})$/;
  
  // Extract video ID using the regular expression
  const match = url.match(regExp);

  if (match && match[1]) {
    return match[1];
  } else {
    // If URL is invalid or doesn't contain a video ID
    return null;
  }
}















const AddTune = () => {

  const {googleUser} = useGoogleAuth()
  const {loginUser} = useLogin()



  



  const [tune, setTune] = useState({
    artist: '',
    song: '',
    videoUrl:'',
    videoId:''
  })
  const handleInputChange = (e)=>{
    const {name,value} = e.target;
    setTune({
      ...tune,
      [name]:value
    })
  }

  const handleTuneSubmit = (e) => {
    e.preventDefault();
    const { artist, song,videoUrl } = tune;
    let specificDocRef;

    // Check if user is logged in with Google
    if (googleUser?.uid) {
      specificDocRef = doc(userColref, googleUser.uid);
    }
    // Check if user is logged in with email
    else if (loginUser?.uid) {
      specificDocRef = doc(userColref, loginUser.uid);
    }



    if (specificDocRef) {
      getDoc(specificDocRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            setDoc(specificDocRef, {
              ...docSnap.data(),
              tunes: [
                ...(docSnap.data().tunes || []),
                {
                  artist,
                  song,
                  videoUrl,
                  videoId:getYouTubeVideoId(videoUrl)
                }
              ]
            }, { merge: true });
          } else {
            setDoc(specificDocRef, {
              tunes: [
                {
                  artist,
                  song,
                  videoUrl,
                  videoId:getYouTubeVideoId(videoUrl)

                }
              ]
            });
          }
          toast.success("Tune Added Successfully");
        })
        .catch((error) => {
          console.error("Error adding tune: ", error);
          toast.error("Failed to add tune");
        });
    }
  };
  return (
    <>
      <Nav/>
      <div className="hero min-h-screen bg-fountain-blue-600">
    
    <div className="card  w-full max-w-sm glass  shrink-0 bg-fountain-blue-700
    backdrop-blur-lg backdrop-filter shadow-sm shadow-fountain-blue-200">
      <form className="card-body" onSubmit={handleTuneSubmit}>
        <div className="form-control">
          <label className="label">
            <span className="label-text text-fountain-blue-50">Artist Name</span>
          </label>
          <input type="text" placeholder="artist name" 
           onChange={handleInputChange}
           id="artist"
           name="artist"
          className="input input-bordered bg-fountain-blue-900 text-fountain-blue-50" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text text-fountain-blue-50">Song Name</span>
          </label>
          <input type="text" 
                     onChange={handleInputChange}
                     id="song"
                      name="song"

          placeholder="song name" className="input input-bordered bg-fountain-blue-900 text-fountain-blue-50" required />
          

        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text text-fountain-blue-50">Video Url</span>
          </label>
          <input type="text" 
                     onChange={handleInputChange}
                     id="videoUrl"
                      name="videoUrl"

          placeholder="Video Url" className="input input-bordered bg-fountain-blue-900 text-fountain-blue-50" required />
          

        </div>

        <div className="form-control mt-6">
          <button className="btn bg-fountain-blue-500 text-fountain-blue-50 backdrop-blur-lg backdrop-filter shadow-sm shadow-fountain-blue-200 border-none"
>          <FaHeadphones className="mr-2"/>
Submit</button>
        </div>
      </form>
    </div>
</div>

    </>
  )
}

export default AddTune