import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import {
  getNotifications,
  markAllNotificationsRead,
  markNotificationRead,
} from "../services/notificationApi";

function Notifications() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadNotifications = useCallback(async () => {
    setError("");
    try {
      const data = await getNotifications();
      setNotifications(data.notifications || []);
    } catch (loadError) {
      setError(loadError.response?.data?.message || "Unable to load notifications.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadNotifications();
    const intervalId = window.setInterval(loadNotifications, 30000);
    return () => window.clearInterval(intervalId);
  }, [loadNotifications]);

  const markAllRead = async () => {
    setError("");
    try {
      await markAllNotificationsRead();
      setNotifications((current) =>
        current.map((notification) => ({
          ...notification,
          readAt: notification.readAt || new Date().toISOString(),
        }))
      );
      window.dispatchEvent(new Event("notifications-updated"));
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to mark notifications as read.");
    }
  };

  const openNotification = async (notification) => {
    if (!notification.readAt) {
      try {
        await markNotificationRead(notification._id);
        setNotifications((current) =>
          current.map((item) =>
            item._id === notification._id ? { ...item, readAt: new Date().toISOString() } : item
          )
        );
        window.dispatchEvent(new Event("notifications-updated"));
      } catch (requestError) {
        setError(requestError.response?.data?.message || "Unable to update notification.");
        return;
      }
    }

    if (notification.link) navigate(notification.link);
  };

  const hasUnread = notifications.some((notification) => !notification.readAt);

  return (
    <MainLayout>
      <main className="min-h-screen bg-gray-50 py-10">
        <section className="mx-auto max-w-4xl px-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
            {hasUnread && (
              <button onClick={markAllRead} className="font-semibold text-green-700 hover:underline">
                Mark all as read
              </button>
            )}
          </div>
          {error && <p role="alert" className="mt-4 text-red-600">{error}</p>}
          {loading ? (
            <p className="mt-6 text-gray-600">Loading notifications...</p>
          ) : notifications.length === 0 ? (
            <p className="mt-6 text-gray-600">You have no notifications yet.</p>
          ) : (
            <div className="mt-6 space-y-3">
              {notifications.map((notification) => (
                <article
                  key={notification._id}
                  className={`rounded-xl border bg-white p-5 shadow-sm ${notification.readAt ? "border-gray-100" : "border-green-200"}`}
                >
                  <button type="button" onClick={() => openNotification(notification)} className="w-full text-left">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h2 className="font-semibold text-gray-900">{notification.title}</h2>
                        <p className="mt-1 text-gray-600">{notification.message}</p>
                        <time className="mt-2 block text-sm text-gray-400" dateTime={notification.createdAt}>
                          {new Date(notification.createdAt).toLocaleString()}
                        </time>
                      </div>
                      {!notification.readAt && (
                        <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-green-700" aria-label="Unread" />
                      )}
                    </div>
                  </button>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </MainLayout>
  );
}

export default Notifications;
