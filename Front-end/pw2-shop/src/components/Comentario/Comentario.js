import { memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

function Comentario({ comentario, setLike }) {
  console.log(comentario);
  return (
    <li className="list-group-item">
      {comentario.texto}
      <span
        className="float-end"
        style={{ cursor: "pointer" }}
        onClick={() => setLike(comentario.id)}
      >
        {comentario.like ? (
          <FontAwesomeIcon
            icon={faHeart}
            style={{ color: "red" }}
          ></FontAwesomeIcon>
        ) : (
          <FontAwesomeIcon
            icon={faHeart}
            style={{ color: "lightgray" }}
          ></FontAwesomeIcon>
        )}
      </span>
    </li>
  );
}

export default memo(Comentario);
