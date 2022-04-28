import { useContext } from "react";
import Button from "react-bootstrap/Button";

import { useNavigate } from "react-router-dom";
import firestore from "../../firebase";
import { doc, deleteDoc } from "firebase/firestore";

import Card from "../ui/Card";
import classes from "./MeetupItem.module.css";
import FavoritesContext from "../../store/favorites-context";

function MeetupItem(props) {
  const favoritesCtx = useContext(FavoritesContext);
  console.log(props);

  const itemIsFavorite = favoritesCtx.itemIsFavorite(props.id);

  const navigate = useNavigate();

  const deleteMeetupHandler = async () => {
    console.log(props.id);
    const taskDocRef = doc(firestore, "meetups", props.id);
    try {
      await deleteDoc(taskDocRef);
      window.location.reload(false);
    } catch (err) {
      console.log(err);
    }
  };

  function toggleFavoriteStatusHandler() {
    if (itemIsFavorite) {
      favoritesCtx.removeFavorite(props.id);
    } else {
      favoritesCtx.addFavorite({
        id: props.id,
        data: {
          title: props.title,
          address: props.address,
          image: props.image,
          description: props.description,
        },
      });
    }
  }

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.image} alt={props.title} />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
          <p>{props.description}</p>
        </div>
        <div className={classes.actions}>
          <Button variant="primary" onClick={toggleFavoriteStatusHandler}>
            {itemIsFavorite ? "Remove from Favorites" : "Add To Favorites"}
          </Button>
          <span> </span>
          <Button variant="danger" onClick={deleteMeetupHandler}>
            Delete Meetup
          </Button>
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;
