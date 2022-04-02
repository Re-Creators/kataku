import { useEffect, useState } from "react";

export default function useBadge(vocabulary) {
  const [showBadge, setShowBadge] = useState(false);
  const [badgeText, setBadgeText] = useState("");

  useEffect(() => {
    const isToday = () =>
      new Date(vocabulary.createdAt).toDateString() ===
      new Date().toDateString();

    const badgeData = [
      {
        val: vocabulary.isCompleted,
        text: "Hafal",
      },
      {
        val: isToday(),
        text: "Baru",
      },
    ];

    setShowBadge(
      badgeData.some((data) => {
        if (data.val) {
          setBadgeText(data.text);
        }
        return data.val;
      })
    );
  }, [vocabulary]);

  return { showBadge, badgeText };
}
