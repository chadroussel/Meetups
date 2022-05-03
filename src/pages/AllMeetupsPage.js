import { useState, useEffect } from "react";
import firestore, { useAuthState } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

import MeetupList from "../components/meetups/MeetupList";
import Dashboard from "../components/Dashboard";

// const DUMMY_DATA = [
//   {
//     id: "m1",
//     title: "This is a first meetup",
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7tTr-c8H3A6R0Zg2t9hJtL_DuYNX4SD4dkA&usqp=CAU",
//     address: "Mayfair East, Baton Rouge",
//     description: "First meetup, holla atcha dogg.",
//   },
//   {
//     id: "m2",
//     title: "This is a second meetup",
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2ZeZDmnSnsrW9DS7YfEjwV2A6ylKDhJz4mA&usqp=CAU",
//     address: "South Side Baton Rouge",
//     description: "Second meetup, bring the bag.",
//   },
// ];

function AllMeetupsPage() {
  const { currentUser } = useAuthState();
  const [isLoading, setIsLoading] = useState(true);
  const [loadedMeetups, setLoadedMeetups] = useState([]);

  useEffect(() => {
    // await
    console.log("I'm Here");
    setIsLoading(true);

    getDocs(collection(firestore, "meetups"))
      .then((querySnapshot) => {
        const userId = currentUser.uid;
        querySnapshot.docs
          .filter((doc) => doc.data().user === userId)
          .forEach((doc) => {
            let item = { id: doc.id, data: doc.data() };
            setLoadedMeetups((arr) => [...arr, item]);
          });
      })
      .catch((err) => {
        console.error("Failed to retrieve data", err);
      });
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <section>
        <p>Is Loading...</p>
      </section>
    );
  }

  return (
    <section>
      <h1>All Meetups</h1>
      <MeetupList meetups={loadedMeetups} />
      <Dashboard />
    </section>
  );
}

export default AllMeetupsPage;
