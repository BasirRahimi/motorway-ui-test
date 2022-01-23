import './HexTile.css'

const HexTile = (props) => {
  return (
    <div className="hex-tile" onClick={props.onClick}>
      <img className="picture" src={`${props.img.url}.webp`} alt={props.img.alt_description} />
      <div className="content">
        <img className="avatar" src={`${props.img.user.profile_image}.webp`} alt="avatar" />
        <div className="name">{props.img.user.first_name} {props.img.user.last_name}</div>
        <div className="location">{props.img.user.location}</div>
      </div>
    </div>
  );
}

export default HexTile;
