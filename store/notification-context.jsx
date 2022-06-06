import { createContext, useState, useEffect } from "react";

const NotificationContext = createContext({
  notification: null,
  showNotification: function (notificationData) {},
  hideNotification: function () {},
});

export function NotificationContextProvider(props) {
  const [activeNotivication, setActiveNtification] = useState();

  useEffect(() => {
    if (
      activeNotivication &&
      ["error", "success"].includes(activeNotivication.status)
    ) {
      const timer = setTimeout(() => hideNotificationHandler(), 3000);

      return () => clearTimeout(timer);
    }
  }, [activeNotivication]);

  function showNotificationHandler(notificationData) {
    setActiveNtification(notificationData);
  }

  function hideNotificationHandler() {
    setActiveNtification(null);
  }

  const context = {
    notification: activeNotivication,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  };

  return (
    <NotificationContext.Provider value={context}>
      {props.children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;
