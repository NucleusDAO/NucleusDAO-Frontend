'use client';
import { DASHBOARD_URL } from "@/config/path";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    redirect(DASHBOARD_URL)
  }, [])
}
