import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

export default function PromoBanner() {
  const [activeBanner, setActiveBanner] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "promotional_banners"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const banners = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const active = banners.find(b => b.isActive === true);
        setActiveBanner(active || null);
      } else {
        setActiveBanner(null);
      }
    }, (err) => {
      console.error("Error fetching promotional banner:", err);
      setActiveBanner(null);
    });
    return unsubscribe;
  }, []);

  if (!activeBanner) return null;

  const content = (
    <div className="w-full h-auto overflow-hidden bg-black flex items-center justify-center relative select-none">
      <img
        src={activeBanner.image}
        alt="Promotional Banner"
        className="w-full h-auto max-h-[160px] md:max-h-[220px] object-cover sm:object-fill"
      />
    </div>
  );

  if (activeBanner.link) {
    if (activeBanner.link.startsWith("http")) {
      return (
        <a href={activeBanner.link} target="_blank" rel="noopener noreferrer" className="block w-full">
          {content}
        </a>
      );
    } else {
      return (
        <a href={activeBanner.link} className="block w-full">
          {content}
        </a>
      );
    }
  }

  return content;
}
