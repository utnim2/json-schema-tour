// TopBar.jsx
import React from "react";
import { NavLink } from "react-router-dom";

export function TopBar() {
  return (
    <div className="dark:bg-black">
      <nav className="dark:bg-black w-full max-w-3xl mx-auto rounded-lg grid gap-0.5 text-slate-200">
        <div className="p-2.5">
          <div className="flex items-center justify-between px-2.5">
            <div className="flex items-center ">
              <NavLink to="/" className={`flex items-center gap-4`}>
                <img
                  alt="Logo"
                  className="rounded-lg"
                  height="40"
                  src={"static/images/logo.svg"}
                  style={{
                    aspectRatio: "40/40",
                    objectFit: "cover",
                  }}
                  width="40"
                />
                <span className="text-lg font-semibold">JSON Schema</span>
              </NavLink>
            </div>
            <div className="flex items-center gap-6">
              <NavLink
                to="/step-1"
                className={({ isActive }) =>
                  `text-sm font-medium ${
                    isActive ? "text-slate-500" : "text-slate-200"
                  }`}
              >
                validate
              </NavLink>
              <NavLink
                to="/step-2"
                className={({ isActive }) =>
                  `text-sm font-medium ${
                    isActive ? "text-slate-500" : "text-slate-200"
                  }`}
              >
                schema-array
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}