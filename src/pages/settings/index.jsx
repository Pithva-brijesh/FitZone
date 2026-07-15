import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../components/ui/Header";
import { getProfile } from "../../services/profileService";

import SettingsHeader from "./components/SettingsHeader";
import ProfileSettings from "./components/ProfileSettings";
import AccountSettings from "./components/AccountSettings";
import AppearanceSettings from "./components/AppearanceSettings";
import NotificationSettings from "./components/NotificationSettings";
import UnitsSettings from "./components/UnitsSettings";
import PrivacySettings from "./components/PrivacySettings";
import ConnectedDevices from "./components/ConnectedDevices";
import AboutCard from "./components/AboutCard";
import DangerZone from "./components/DangerZone";

export default function Settings() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await getProfile();
        setProfile(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">

      <Header
        user={profile}
        onNavigate={(path) => navigate(path)}
      />

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">

        <SettingsHeader />

        <ProfileSettings profile={profile} />

        <div className="grid xl:grid-cols-2 gap-8">

          <AccountSettings profile={profile} />

          <AppearanceSettings />

        </div>

        <div className="grid xl:grid-cols-2 gap-8">

          <NotificationSettings />

          <UnitsSettings />

        </div>

        <PrivacySettings />

        <ConnectedDevices />

        <AboutCard />

        <DangerZone />

      </main>

    </div>
  );
}