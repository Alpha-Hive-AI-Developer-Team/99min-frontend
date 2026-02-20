
"use client";

import { useEffect } from "react";
import { silentRefresh } from "@/utils/api/client";

export default function SilentRefreshInit() {
  useEffect(() => {
    silentRefresh();
  }, []);

  return null; 
}