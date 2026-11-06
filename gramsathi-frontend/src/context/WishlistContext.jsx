import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "./AuthContext";
import { addToWishlist, getWishlist, removeFromWishlist } from "../services/wishlistApi";

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const { isAuthenticated, user } = useAuth();
  const userId = user?._id || user?.id;
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    if (!isAuthenticated) {
      setItems([]);
      setError("");
      setLoading(false);
      return () => {
        active = false;
      };
    }

    setItems([]);
    setError("");
    setLoading(true);
    getWishlist()
      .then((data) => {
        if (active) setItems(data.wishlist || []);
      })
      .catch((loadError) => {
        if (active) {
          setError(loadError.response?.data?.message || "Unable to load your wishlist.");
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [isAuthenticated, userId]);

  const isWishlisted = useCallback(
    (equipmentId) =>
      items.some((item) => String(item.equipment?._id || item.equipment) === String(equipmentId)),
    [items]
  );

  const toggleWishlist = useCallback(
    async (equipment) => {
      const equipmentId = equipment?._id || equipment;
      if (!equipmentId) throw new Error("Equipment is required to update your wishlist.");

      setError("");
      if (isWishlisted(equipmentId)) {
        await removeFromWishlist(equipmentId);
        setItems((current) =>
          current.filter((item) => String(item.equipment?._id || item.equipment) !== String(equipmentId))
        );
        return false;
      }

      const data = await addToWishlist(equipmentId);
      setItems((current) =>
        current.some((item) => String(item.equipment?._id || item.equipment) === String(equipmentId))
          ? current
          : [data.wishlistItem, ...current]
      );
      return true;
    },
    [isWishlisted]
  );

  const value = useMemo(
    () => ({ items, loading, error, isWishlisted, toggleWishlist }),
    [items, loading, error, isWishlisted, toggleWishlist]
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlist must be used within a WishlistProvider.");
  return context;
}