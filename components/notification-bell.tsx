"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export function NotificationBell() {
  const { data: session } = useSession();
  const [notifications, setNotifications] = useState([]);
  const [unread, setUnread] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!session?.user) return;

    const fetchNotifications = async () => {
      try {
        const res = await fetch("/api/notifications");
        const data = await res.json();
        if (data.notifications) {
          setNotifications(data.notifications);
          setUnread(data.notifications.filter((n: any) => !n.read).length);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchNotifications();

    // Poll every 30 seconds
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, [session]);

  if (!session?.user) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 hover:bg-bg rounded-lg transition"
      >
        🔔
        {unread > 0 && (
          <span className="absolute top-0 right-0 bg-primary/80 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unread}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 rounded-2xl border border-border bg-panel p-4 shadow-lg z-50">
          <h3 className="font-semibold mb-3">Notifications</h3>
          {notifications.length === 0 ? (
            <p className="text-sm text-muted">No notifications yet</p>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {notifications.map((notif: any, i) => (
                <div key={i} className="p-2 rounded-lg bg-bg text-sm">
                  <div className="font-medium">{notif.title}</div>
                  <div className="text-xs text-muted">{notif.message}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
