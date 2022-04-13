import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

import NewMeetupForm from "../components/meetups/NewMeetupForm";

function NewMeetupsPage() {
  const navigate = useNavigate();

  const addMeetupHandler = async (meetupData) => {
    try {
      await addDoc(collection(db, "meetups"), {
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

  return (
    <section>
      <h1>Add New Meetup</h1>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </section>
  );
}

export default NewMeetupsPage;
