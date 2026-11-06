import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import MainLayout from "../layouts/MainLayout";
import WishlistButton from "../components/common/WishlistButton";

function Wishlist() {
  const { items, loading, error } = useWishlist();

  return (
    <MainLayout>
      <main className="min-h-screen bg-gray-50 py-10">
        <section className="mx-auto max-w-6xl px-4">
          <h1 className="text-3xl font-bold text-gray-900">My wishlist</h1>
          {error && <p role="alert" className="mt-4 text-red-600">{error}</p>}
          {loading ? (
            <p className="mt-6 text-gray-600">Loading your wishlist...</p>
          ) : items.length === 0 ? (
            <p className="mt-6 text-gray-600">Your wishlist is empty. Save equipment you like to find it here.</p>
          ) : (
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => {
                const equipment = item.equipment;
                if (!equipment) return null;

                return (
                  <article key={item._id} className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                    <Link to={`/equipment/${equipment._id}`}>
                      <img
                        src={equipment.images?.[0]?.url || "https://via.placeholder.com/600x400?text=No+Image"}
                        alt={equipment.title}
                        className="h-52 w-full object-cover"
                      />
                    </Link>
                    <div className="flex items-start justify-between gap-4 p-5">
                      <div>
                        <Link to={`/equipment/${equipment._id}`} className="font-bold text-gray-900 hover:text-green-700">
                          {equipment.title}
                        </Link>
                        <p className="mt-2 text-sm text-gray-600">{equipment.location}</p>
                        <p className="mt-2 font-semibold text-green-700">₹{equipment.pricePerDay}/day</p>
                      </div>
                      <WishlistButton
                        equipment={equipment}
                        wrapperClassName="shrink-0"
                        className="rounded-full border border-gray-200 p-3 text-gray-500 hover:text-red-600"
                      />
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </MainLayout>
  );
}

export default Wishlist;