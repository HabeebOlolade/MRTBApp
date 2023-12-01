import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { registrantStoreActions } from "../../redux/slices/registrant";
import { RootState } from "../../redux/store";
import { IRegistrant } from "../../type/type";

export default function RegistrantItem(props: { registrant: IRegistrant }) {
  const {
    id,
    title,
    images,
    price,
    category: { name },
    creationAt,
  } = props.registrant;

  const registrantsState = useSelector((state: RootState) => state.registrants);
  const dispatch = useDispatch();

  return (
    <div className="registrant_item" key={id}>
      <p>{id}</p>

      <img src={images[0]} alt={title} width="100" height="100" />
      <Link to={`/registrants/${id}`}>
        <span>{title}</span>
      </Link>
      <p>{name}</p>
      <p>{price}</p>
      <span>{new Date(creationAt).toDateString()}</span>

      <button
        onClick={() =>
          dispatch(
            registrantStoreActions.updateCart({
              registrant: props.registrant,
              qty: 1,
              id: props.registrant.id,
            })
          )
        }
      ></button>
    </div>
  );
}
