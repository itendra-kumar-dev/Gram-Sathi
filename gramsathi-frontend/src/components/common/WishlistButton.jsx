import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useWishlist } from "../../context/WishlistContext";

function WishlistButton({ equipment, className = "", wrapperClassName = "" }) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const active = isWishlisted(equipment?._id);

  const handleClick = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    setPending(true);
    setError("");
    try {
      await toggleWishlist(equipment);
    } catch (requestError) {
      setError(requestError.response?.data?.message || requestError.message || "Unable to update wishlist.");
    } finally {
      setPending(false);
    }
  };

  return (
    <span className={`relative inline-flex ${wrapperClassName}`}>
      <button
        type="button"
        onClick={handleClick}
        disabled={pending || !equipment?._id}
        aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
        aria-pressed={active}
        title={error || (active ? "Remove from wishlist" : "Add to wishlist")}
        className={`${className} ${active ? "text-red-600" : ""} disabled:opacity-60`}
      >
        <FaHeart />
      </button>
      {error && (
        <span role="alert" className="absolute right-0 top-full z-10 mt-2 w-48 rounded bg-white p-2 text-xs text-red-600 shadow">
          {error}
        </span>
      )}
    </span>
  );
}

export default WishlistButton;