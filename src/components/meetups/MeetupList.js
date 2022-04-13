import MeetupItem from "./MeetupItem";
import classes from "./MeetupList.module.css";

function MeetupList(props) {
  return (
    <ul className={classes.list}>
      {props.meetups.map((meetup) => {
        console.log(meetup);
        return (
          <MeetupItem
            key={meetup.id}
            id={meetup.id}
            image={meetup.data.image}
            title={meetup.data.title}
            address={meetup.data.address}
            description={meetup.data.description}
          />
        );
      })}
    </ul>
  );
}

export default MeetupList;
