import { useNavigate } from "react-router-dom";
import firestore from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useAuthState } from "../firebase";

import NewMeetupForm from "../components/meetups/NewMeetupForm";

function NewMeetupsPage() {
  const { currentUser } = useAuthState();
  const navigate = useNavigate();

  const addMeetupHandler = async (meetupData) => {
    try {
      await addDoc(collection(firestore, "meetups"), {
        user: currentUser.uid,
        title: meetupData.title,
        image: meetupData.image,
        address: meetupData.address,
        description: meetupData.description,
      });
      navigate("/", { replace: true });
    } catch (err) {
      console.log(err);
    }
  };

  console.log(currentUser.uid);

  return (
    <section>
      <h1>Add New Meetup</h1>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </section>
  );
}

export default NewMeetupsPage;
