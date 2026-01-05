import { FaStar } from "react-icons/fa";

const StarRating = ({ value = 0, onRate }) => {
  return (
    <div style={{ display: "flex", gap: "6px" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          size={22}
          style={{ cursor: "pointer" }}
          color={star <= value ? "#facc15" : "#d1d5db"}
          onClick={() => onRate(star)}
        />
      ))}
    </div>
  );
};

export default StarRating;
