import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Brain,
  Activity,
  MessageCircle,
  Calendar,
  HeartPulse,
  Home,
} from "lucide-react";

const userData = {
  name: "Saptanshu Roy",
  age: 20,
  severity: "Moderate", // Stable | Moderate | Unstable
  sessionsAttended: 12,
  lastSession: "2 days ago",
  moodScore: 6.8,
};

const severityColor = {
  Stable: "text-green-400 bg-green-400/10",
  Moderate: "text-yellow-400 bg-yellow-400/10",
  Unstable: "text-red-400 bg-red-400/10",
};

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-8 relative">
      
      {/* Home Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 right-6 flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 transition text-sm"
      >
        <Home size={18} />
        Home
      </button>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold">
          Welcome back, {userData.name}
        </h1>
        <p className="text-neutral-400 mt-1">
          Here’s an overview of your mental wellness journey 🌱
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <StatCard
          title="Sessions Attended"
          value={userData.sessionsAttended}
          icon={<MessageCircle />}
        />
        <StatCard
          title="Mood Score"
          value={`${userData.moodScore}/10`}
          icon={<HeartPulse />}
        />
        <StatCard
          title="Last Session"
          value={userData.lastSession}
          icon={<Calendar />}
        />
        <StatCard
          title="Mental State"
          value={userData.severity}
          icon={<Brain />}
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Mental Overview */}
        <div className="lg:col-span-2 bg-neutral-900 rounded-2xl p-6 border border-neutral-800">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Activity size={20} />
            Mental Health Overview
          </h2>

          <div
            className={`inline-flex px-4 py-2 rounded-full text-sm font-medium ${severityColor[userData.severity]}`}
          >
            Current Status: {userData.severity}
          </div>

          <p className="text-neutral-400 mt-4 leading-relaxed">
            Your recent activity indicates a{" "}
            <span className="text-white font-medium">
              {userData.severity}
            </span>{" "}
            mental state. Consistent engagement with Soul Sync helps track
            emotional patterns and encourages self-awareness.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="bg-neutral-900 rounded-2xl p-6 border border-neutral-800">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>

          <div className="flex flex-col gap-4">
            <ActionButton label="Start AI Chat Session" />
            <ActionButton label="View Session History" />
            <ActionButton label="Daily Mood Check-in" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Components ---------- */

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 flex items-center justify-between">
      <div>
        <p className="text-neutral-400 text-sm">{title}</p>
        <h3 className="text-2xl font-semibold mt-1">{value}</h3>
      </div>
      <div className="p-3 rounded-xl bg-neutral-800">
        {icon}
      </div>
    </div>
  );
}

function ActionButton({ label }) {
  return (
    <button className="w-full py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 transition text-sm font-medium">
      {label}
    </button>
  );
}
